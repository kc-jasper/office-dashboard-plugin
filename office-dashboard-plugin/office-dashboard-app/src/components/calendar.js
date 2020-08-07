/**
 * React Component.
 * 
 * Calendar page that displays bookings and allows user to add new bookings
 */

import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import Popup from './popup.js';
import '../css/office-component.css';
import { 
  ViewState,
 } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  DayView,
  WeekView,
  MonthView,
  Appointments,
  TodayButton,
  DateNavigator,
  Toolbar,
  ViewSwitcher,
  CurrentTimeIndicator,
  AppointmentForm,
  AppointmentTooltip,
} from '@devexpress/dx-react-scheduler-material-ui';
import appointmentUtilities from '../scripts/appointmentUtilities.js';

/* React Scheduler calendar style */
const styles = theme => ({
  appointment: {
    backgroundColor: '#D7C8C8',
    borderRadius: '0px',
    '&:hover': {
      opacity: 0.6,
    },
  },
  apptContent: {
    '&>div>div': {
      color: '#000000',
    },
  },
});

/** custom styling for Appointments (the event block) in React Scheduler */
const Appointment = withStyles(styles, { name: 'Appointment' })(({ classes, ...restProps }) => (
  <Appointments.Appointment
    {...restProps}
    className={classes.appointment}
  />
));


/** custom styling for AppointmentContent (the text of the event block) in React Scheduler */
const AppointmentContent = withStyles(styles, { name: 'AppointmentContent' })(({ classes, ...restProps }) => (
  <Appointments.AppointmentContent {...restProps} className={classes.apptContent} />
));

const SearchAppointments = (props) => {
  return(
    <div>
    <input className="search-bar"
              placeholder="Search appointments by patient name"
              type="text"
              value={props.inputValue}
              onChange={props.apptFilterOnChange}
            />
    {props.isApptViewOn ? <div>{props.appt}</div> : null}
    </div>
  );
}

class Calendar extends Component {
  constructor(props){
    super(props)

    this.state = { 
      showPopup: false,
      showSubmittedPopup: false,
      currentViewName: 'day',
      data: [],
      isApptViewOn: false,
      appt: {},
      sortValue: '',
      inputValue: ''
    };
  
    /* function that changes currentViewName in state so user can toggle views */
    this.currentViewNameChange = (currentViewName) => {
      this.setState({ currentViewName });
    };

    /* function that changes currentDate in state so user can view different dates (not just today) */
    this.currentDateChange = (currentDate) => { 
      this.setState({ currentDate }); 
    };

    /* function that toggles "Add event" popup */
    this.togglePopup = () => {
      this.setState({
        showPopup: !this.state.showPopup // if it's false, set to true, and vice versa
      })
    };

    /* function that closes "Add event" popup, opens submitted message popup, and submits form */
    this.submitIntakeForm = () => {
      this.setState({
        showSubmittedPopup: !this.state.showSubmittedPopup,
        showPopup: false
      })

      // addPatientAppointment: submit form data to AWS endpoint
      this.addPatientAppointment = appointmentUtilities.addPatientAppointment.bind(this);
      this.addPatientAppointment();
    };

    /* function that toggles submitted message popup */
    this.toggleMsgPopup = () => {
      this.setState({
        showSubmittedPopup: !this.state.showSubmittedPopup
      })
    };

    /* event handler for search bar input */
    this.apptFilterOnChange = (event) => {
      console.log("onChange: ", event.target.value);
      this.setState({
        inputValue: event.target.value
      })
    };

    /* event handler for search bar submit */
    this.apptOnSubmit = (event) => {
      console.log("submit search");
      this.setState({
        isApptViewOn: true
      })
    };
  }

  componentDidMount() {
    // fetch live booking data from AWS endpoint
   this.getPatientAppointment = appointmentUtilities.getPatientAppointment.bind(this);
   this.getPatientAppointment();
  }

  /* this function maps the data from AWS endpoint to data format for third-party calendar */
  mapData() {
    const data = [];
    var startDate, endDate, title;
    this.state.data.map((booking, index) => {
      const { patient_id, dependent_id, doctor_id, booked_datetime, 
        appointment_date, start_time, end_time, timezone, booking_status, 
        check_in_status, check_out_status, billing_status, purpose, 
        appointment_details, booking_meta } = booking;
      
      // split appointment_date into just the date
      var awsDate = appointment_date.split('T');
      var date = awsDate[0];

      // split start and end time to exclude seconds
      var awsStartTime = start_time.split(':');
      var startTime = awsStartTime[0] + ':' + awsStartTime[1];
      var awsEndTime = end_time.split(':');
      var endTime = awsEndTime[0] + ':' + awsEndTime[1];
      
      startDate = date + 'T' + startTime;
      endDate = date + 'T' + endTime;
      title = patient_id + '\'s Appointment';
      data.push({
        startDate: startDate,
        endDate: endDate,
        title: title
      })
    })
    return data;
  }

  render() {
    // array of appointments filtered by search input value
    const filteredAppts =
      this.state.data.filter(appt => {
        return appt.patient_id === this.state.inputValue
      })
    const today = new Date(); // gets current date
    const currentDate = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate(); // formats current date for React Scheduler
    const { currentViewName } = this.state; // deconstruct state
    const data = this.mapData();
    return (
        <div className="component">
          <header className="component-header">
            <h1>Calendar</h1>
            <button id="add-appointment-btn" className="component-top-btn" onClick={this.togglePopup.bind(this)}>
              + Add appointment
            </button>
            {this.state.showPopup ? 
              <Popup
                closePopup={this.togglePopup.bind(this)}
                submitIntakeForm={this.submitIntakeForm.bind(this)}
                type='add-appointment'/>
              : null}
            {this.state.showSubmittedPopup ? 
              <Popup
                closePopup={this.toggleMsgPopup.bind(this)}
                type='submit-intake-form'/>
              : null}
            <SearchAppointments appts={filteredAppts}
                                apptFilterOnChange={this.apptFilterOnChange}
                                onSubmit={this.apptOnSubmit}
                                inputValue={this.state.inputValue}/>
          </header>
          <div id="calendar-container">
            <Paper>
              <Scheduler
                data={data}
                height={600}
              >
                <ViewState
                  defaultCurrentDate={currentDate}
                  currentViewName={currentViewName}
                  onCurrentViewNameChange={this.currentViewNameChange}
                  onCurrentDateChange={this.currentDateChange}
                />
                <DayView
                  name="day"
                  displayName="Day"
                  startDayHour={8}
                  endDayHour={19}
                />
                <WeekView
                  name="week"
                  displayName="Week"
                  startDayHour={8}
                  endDayHour={19}
                />
                <MonthView
                  name="month"
                  displayName="Month"
                />
                <Toolbar />
                <TodayButton />
                <DateNavigator />
                <ViewSwitcher />
                <Appointments 
                  appointmentComponent={Appointment}
                  appointmentContentComponent={AppointmentContent}
                />
                <CurrentTimeIndicator 
                  shadePreviousAppointments={true}
                />
                <AppointmentTooltip
                  showOpenButton
                  showCloseButton
                />
                <AppointmentForm readOnly />
              </Scheduler>
            </Paper>
          </div>
        </div>
    );
  }
}

export default Calendar;