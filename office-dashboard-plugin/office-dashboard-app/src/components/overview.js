/**
 * React Component.
 * 
 * Landing page for provider portal login
 */

import React, { Component } from 'react';
import '../css/office-component.css';
import '../css/office-table.css';
import BarChart from 'react-bar-chart';
import downarrow from '../includes/dropdown-arrow.png';
import uparrow from '../includes/pullup-arrow.png';
import check from '../includes/check-circle.png';
import circle from '../includes/circle.png';
import forwardarrow from '../includes/forwardarrow.png';
import user from '../includes/user.png';

class Overview extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showList: false,
      showSections: {
        'apptStats': this.props.userinfo.overview_preferences.split('-')[0] === "1",
        'tasks': this.props.userinfo.overview_preferences.split('-')[1] === "1",
        'appts': this.props.userinfo.overview_preferences.split('-')[2] === "1",
        'payments': this.props.userinfo.overview_preferences.split('-')[3] === "1"
      },
      apptStats: [
        {text: 'June', value: 5000},
        {text: 'July', value: 2000}
      ],
      margin: {top: 20, right: 20, bottom: 30, left: 40},
      tasks: [
        {'id': 1,
        'status': false,
        'action': 'Refund',
        'dependent_name': 'John Smith'},
        {'id': 2,
        'status': false,
        'action': 'Refund',
        'dependent_name': 'John Smith'},
        {'id': 3,
        'status': false,
        'action': 'Refund',
        'dependent_name': 'John Smith'},
        {'id': 4,
        'status': false,
        'action': 'Refund',
        'dependent_name': 'John Smith'}
      ],
      appts: {
        'number_of_appointments': 6,
        'appointments': [
          {'dependent_name': "Jane Doe",
          "appointment_detail": "Consultation",
          'a_start_time': '10:00 AM'},
          {'dependent_name': "John Taylor",
          "appointment_detail": "Cleaning",
          'a_start_time': '10:30 AM'}
        ]
      },
      payments: [
        {'dependent_name': "Jane Doe",
        "appointment_detail": "Consultation",
        'amount': '$500.00',
        'status': 'Processing'},
        {'dependent_name': "John Taylor",
        "appointment_detail": "Cleaning",
        'amount': '$500.00',
        'status': 'Processing'}
      ]
    };
    console.log(this.state)

    /* function to toggle the Edit View dropdown menu */
    this.toggleList = () => {
      this.setState({
        showList: !this.state.showList // if it's false, set to true, and vice versa
      })
    };

    /* function to check off one of "Today's Tasks" */
    this.checkTask = (id) => {
    };

    /* function to toggle the sections */
    this.toggleSection = (section) => {
      var partialState = {};
      partialState = this.state.showSections;
      partialState[section] = !this.state.showSections[section];
      this.setState(prevState => ({
        ...prevState,
        showSections: partialState
      }))
      fetch(window.location.origin + '/wp-json/office-dashboard/v1/overview?section=' + section + '&user_id=' + this.props.userinfo.user_id)
        .then(res => res.json())
        .then(res => {
          console.log(res);
        })
        .catch((error) => {
          console.log("This is the error:")
          console.error(error);
        });
      console.log(this.state)
    };
  }

  renderToggleList() {
    return (
      <table id="toggle-list">
        <tr>
          <td>Appointment Stats</td>
          <td>
            <button onClick={this.toggleSection.bind(this, "apptStats")}>
              {this.state.showSections.apptStats ? 
                <img src={check} style={{width: "20", height: "20"}} alt="check" />
                : <img src={circle} style={{width: "20", height: "20"}} alt="circle" />}
            </button>
          </td>
        </tr>
        <tr>
          <td>Today's Tasks</td>
          <td>
            <button onClick={this.toggleSection.bind(this, "tasks")}>
              {this.state.showSections.tasks ? 
                <img src={check} style={{width: "20", height: "20"}} alt="check" />
                : <img src={circle} style={{width: "20", height: "20"}} alt="circle" />}
            </button>
          </td>
        </tr>
        <tr>
          <td>Today's Appointments</td>
          <td>
            <button onClick={this.toggleSection.bind(this, "appts")}>
              {this.state.showSections.appts ? 
                <img src={check} style={{width: "20", height: "20"}} alt="check" />
                : <img src={circle} style={{width: "20", height: "20"}} alt="circle" />}
            </button>
          </td>
        </tr>
        <tr>
          <td>Payments</td>
          <td>
            <button onClick={this.toggleSection.bind(this, "payments")}>
              {this.state.showSections.payments ? 
                <img src={check} style={{width: "20", height: "20"}} alt="check" />
                : <img src={circle} style={{width: "20", height: "20"}} alt="circle" />}
            </button>
          </td>
        </tr>
      </table>
    );
  }

  renderTaskList() {
    return this.state.tasks.map((task, index) => {
      const { id, status, action, dependent_name } = task;
      return(
        <tr style={{background: "#F5F5F6"}}>
          <td>
            {status ?
              <button className="task-check" onClick={this.checkTask.bind(this, id)}><img src={check} alt="check" style={{width: "20", height: "20", marginRight: "10px"}} /></button>
            : <button className="task-check" onClick={this.checkTask.bind(this, id)}><img src={circle} alt="circle" style={{width: "20", height: "20", marginRight: "10px"}} /></button> }
            {action} {dependent_name}
          </td>
        </tr>
      )
    })
  }

  renderAppts() {
    return this.state.appts.appointments.map((appt, index) => {
      const { dependent_name, appointment_detail, a_start_time } = appt;
      return(
        <tr style={{background: "#F5F5F6"}}>
          <td><div className="user-icon"><img src={user} alt="user" style={{width: "20px", height: "20px"}} /></div></td>
          <td><div className="bold">{dependent_name}</div>
            <span>{appointment_detail}</span>
          </td>
          <td className="align-right-column"><div className="bold">{a_start_time}</div></td>
        </tr>
      )
    })
  }

  renderPayments() {
    return this.state.payments.map((payment, index) => {
      const { dependent_name, appointment_detail, amount } = payment;
      return(
        <tr style={{background: "#F5F5F6"}}>
          <td><div className="user-icon"><img src={user} alt="user" style={{width: "20px", height: "20px"}} /></div></td>
          <td><div className="bold">{dependent_name}</div>
            <span>{appointment_detail}</span>
          </td>
          <td className="align-right-column"><div className="bold">{amount}</div></td>
        </tr>
      )
    })
  }

  render() {
    // retrieve user's name for greeting message
    if (this.props.userinfo.first_name.length) { // if there's no first_name value, use nickname value
      var greeting = "Dr. " + this.props.userinfo.last_name;
    } else {
      greeting = this.props.userinfo.nickname;
    }
    return (
      <div className="component">
        <header className="component-header">
          <h1>Overview</h1>
          <div id="toggle-container" onClick={this.toggleList.bind(this)}>
            <button id="toggle-view">
              <div id="edit-text">Edit View</div>
              {this.state.showList ? 
              <img id="uparrow" src={uparrow} alt="uparrow" />
              : <img id="downarrow" src={downarrow} alt="downarrow" />}
            </button>
          </div>
          {this.state.showList ? 
          this.renderToggleList()
          : null}
        </header>
        <div className="component-body" id="overview-container">
          {this.state.showSections["apptStats"] ? 
            <div className="section" id="appointment-overview">
              <h2>Good morning, {greeting}.</h2>
              <div className="section-body" ref="root">
                <BarChart ylabel='# of appointments'
                width={400}
                height={200}
                margin={this.state.margin}
                data={this.state.apptStats}/>
              </div>
            </div>
            : null}
          {this.state.showSections["tasks"] ? 
            <div className="section" id="tasks">
              <h2>Today's Tasks</h2>
              <div className="section-body">
                <table id="task-list" className="item-table">{this.renderTaskList()}</table>
                <button className="view-more bottom-right">VIEW MORE<img src={forwardarrow}/></button>
              </div>
            </div>
            : null}
          {this.state.showSections["appts"] ? 
            <div className="section" id="todays-appointments">
              <h2>Today's Appointments</h2>
              <div className="section-body">
                <div style={{textAlign: "left", width: "22vw", lineHeight: "30px", marginTop: "5px"}}><span><div className="bold-large">{this.state.appts.number_of_appointments}</div></span> appointments</div>
                <table id="appt-list" className="item-table">{this.renderAppts()}</table>
                <button className="view-more bottom-right">VIEW MORE<img src={forwardarrow}/></button>
              </div>
            </div>
            : null}
          {this.state.showSections["payments"] ? 
            <div className="section" id="payments">
              <h2>Payments</h2>
              <div className="section-body">
                <table id="payment-overview-list" className="item-table">{this.renderPayments()}</table>
                <button className="view-more bottom-right">VIEW MORE<img src={forwardarrow}/></button>
              </div>
            </div>
            : null}
        </div>
      </div>
    );
  }
}

export default Overview;