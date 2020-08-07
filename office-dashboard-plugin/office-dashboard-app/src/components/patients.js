/**
 * React Component.
 * 
 * Displays a list (table) of user's patients
 */

import React, { Component } from 'react';
import '../css/office-table.css';
import '../css/office-component.css';
import { BrowserRouter as Router, Switch, Route, NavLink, Redirect } from 'react-router-dom';
import intercomponentData from '../scripts/intercomponentData.js';
import appointmentUtilities from '../scripts/appointmentUtilities.js';
import back from '../includes/backarrow.png';
import forward from '../includes/forwardarrow.png';
import uparrow from '../includes/pullup-arrow.png';
import downarrow from '../includes/dropdown-arrow.png';
import check from '../includes/check-circle.png';
import circle from '../includes/circle.png';


class newPatients extends Component {
  render() {
    return(
      <div className="notif-component">
        <div>
            newPatients
        </div>
      </div>
    );
}
}

class pendingPayments extends Component {
  render() {
    return(
      <div className="notif-component">
        <div>
            pending payments
        </div>
      </div>
    );
}
}

class Patients extends Component {
  constructor(props) {
    super(props) // use super to override Component class constructor
    this.state = {
      data: [],
      currentFilter: '',
      showSortBy: false,
      patients: [],
      patientInfo: {}, // to store patient info later
      dataLoaded: false,
      patientsLoaded: false
    }
    // Binding event handler methods to instances
    this.getBookings = appointmentUtilities.getPatientAppointment.bind(this);
    this.getPatient = appointmentUtilities.getPatient.bind(this);

    /* function to toggle the Edit View dropdown menu */
    this.toggleSortBy = () => {
      this.setState({
        showSortBy: !this.state.showSortBy // if it's false, set to true, and vice versa
      })
    };

    /* function to toggle the sections */
    this.toggleFilter = (filter) => {
      if (this.state.currentFilter === filter) {
        this.setState({
          currentFilter: null
        })
      } else {
        this.setState({
          currentFilter: filter
        })
      }
    };
  }
  

  componentDidMount() {
    // fetch booking data from WP REST API endpoint
    this.getBookings();
    console.log("componentDidMount just called an appointmentUtilities function and loaded data to state!");
    console.log(this.state);
  }


  componentDidUpdate() {
    if (this.state.dataLoaded && !this.state.patientsLoaded) {

      // fill array of office's patients from the bookings in this.state.data
      var patients = [];
      const len = this.state.data.length;
      var i;
      console.log("Starting data mapping..");
      for (i = 0; i < len; i++) {
        const { office_id, patient_id, doctor_id } = this.state.data[i];
        var myIncludes = patients.filter(includesPat => includesPat.patient_id === patient_id).length; // is this patient already in patients array
        console.log("Patient is already in my array? " + myIncludes);
        if (this.props.userinfo.user_role === "um_office") {
          if (office_id === this.props.userinfo.office_id && !myIncludes) {
            this.getPatient(patient_id);
            console.log("Index: " + i + ", componentDidUpdate just got a patientInfo for patient " + patient_id + "!");
            console.log(this.state);
            if (Object.keys(this.state.patientInfo).length) { // if state actually does have a patientInfo
              var newPatient = {
                dependent_name: this.state.patientInfo.first_name + ' ' + this.state.patientInfo.last_name,
                patient_id: patient_id,
                date_of_birth: this.state.patientInfo.DOB ? this.state.patientInfo.DOB.split('T')[0] : this.state.patientInfo.DOB
              };
              patients.push(newPatient);
              console.log("componentDidUpdate just pushed to patients array!");
              console.log(patients);
              intercomponentData.pushPatient(newPatient); // also add to intercomponentData so it can be accessed later on patient's finance info page
            } else {
              console.log("Sike, componentDidUpdate did NOT get a patientInfo successfully.");
              break;
            }
          }
        } else if (this.props.userinfo.user_role === "um_doctor") {
          if (office_id === this.props.userinfo.office_id && 
            doctor_id === this.props.userinfo.user_id && !myIncludes) {
              this.getPatient(patient_id);
              if (Object.keys(this.state.patientInfo).length) {
                var newPatient = {
                  dependent_name: this.state.patientInfo.first_name + ' ' + this.state.patientInfo.last_name,
                  patient_id: patient_id,
                  date_of_birth: this.state.patientInfo.DOB ? this.state.patientInfo.DOB.split('T')[0] : this.state.patientInfo.DOB
                };
                patients.push(newPatient);
                intercomponentData.pushPatient(newPatient);
              } else {
                break;
              }
          }
        }
      }

      if (patients.length && !this.state.patientsLoaded) { // if patients were loaded, push to state
        this.setState({
          patients: patients,
          patientsLoaded: true
        });
        console.log("componentDidUpdate just loaded patients to state and set patientsLoaded to true!");
        console.log(this.state);
      }
    }
  }


  renderTableData() {
    if (this.state.patientsLoaded) {
      return this.state.patients.map((patient, index) => {
        console.log("Index " + index + ", renderTableData is mapping this.state.patients");
        console.log(this.state.patients);
        return (
          <tr>
            <td><a href={window.location.origin + "/office-patients/patient?" + patient.patient_id}>{patient.dependent_name}</a></td>
            <td>{patient.date_of_birth}</td>
            <td>MM/DD/YYYY</td>
            <td>MM/DD/YYYY</td>
            <td>MM/DD/YYYY</td>
          </tr>
        )
      })
    }
  }

  renderToggleSortBy() {
    return (
      <table id="toggle-list" style={{left: "18vw", top: "22vh"}}>
        <tr>
          <td>A-Z</td>
          <td>
            <button onClick={this.toggleFilter.bind(this, "AZ")}>
              {this.state.currentFilter === 'AZ' ? 
                <img src={check} style={{width: "20", height: "20"}} alt="check" />
                : <img src={circle} style={{width: "20", height: "20"}} alt="circle" />}
            </button>
          </td>
        </tr>
        <tr>
          <td>Z-A</td>
          <td>
            <button onClick={this.toggleFilter.bind(this, "ZA")}>
              {this.state.currentFilter === 'ZA' ? 
                <img src={check} style={{width: "20", height: "20"}} alt="check" />
                : <img src={circle} style={{width: "20", height: "20"}} alt="circle" />}
            </button>
          </td>
        </tr>
        <tr>
          <td>Most recent updates</td>
          <td>
            <button onClick={this.toggleFilter.bind(this, "mostRecent")}>
              {this.state.currentFilter === 'mostRecent' ? 
                <img src={check} style={{width: "20", height: "20"}} alt="check" />
                : <img src={circle} style={{width: "20", height: "20"}} alt="circle" />}
            </button>
          </td>
        </tr>
      </table>
    );
  }


  render() {
    const allPatients =
      <div className="notif-component">
        <table id="all-patients-table" className="item-table">
          <tbody>
              <th>Name</th>
              <th>Date of Birth</th>
              <th>Next Appointment</th>
              <th>Last Appointment</th>
              <th>Status</th>
              {this.renderTableData()}
          </tbody>
        </table>
      </div>;


    return (
      <Router>
        <div className="component">
          <header className="component-header">
            <h1>Patient Profiles</h1>
            <div style={{width: "300px", position: "absolute", left: "0", top: "13vh", margin: "0"}}>
              <div className="bold-large">{this.state.patients.length}</div>
              <div className="bold-large" style={{fontWeight: "400", marginLeft: "10px"}}>Patients</div>
            </div>
            <div id="toggle-container" style={{left: "18vw"}} onClick={this.toggleSortBy.bind(this)}>
              <button id="toggle-view">
                <div id="edit-text">Sort By</div>
                {this.state.showSortBy ? 
                <img id="uparrow" src={uparrow} alt="uparrow" />
                : <img id="downarrow" src={downarrow} alt="downarrow" />}
              </button>
            </div>
            {this.state.showSortBy ? 
            this.renderToggleSortBy()
            : null}
          </header>
          <div className="component-body" style={{marginTop: "50px"}}>
            <div id="notif-nav">
              <ul>
                <NavLink activeStyle={{background: "#a9ccca"}} to="/office-patients/all-patients"><li>All Patients</li></NavLink>
                <NavLink activeStyle={{background: "#a9ccca"}} to="/office-patients/new-patients"><li>New Patients</li></NavLink>
                <NavLink activeStyle={{background: "#a9ccca"}} to="/office-patients/pending-payments"><li>Pending Payments</li></NavLink>
              </ul>
            </div>
            <div id="notif-body">
              <Switch>
                <Route exact path="/office-patients/">
                  <Redirect to="/office-patients/all-patients"/>
                </Route>  
                <Route exact path="/office-patients/all-patients" render={() => allPatients} />
                <Route exact path="/office-patients/new-patients" component={newPatients} />
                <Route exact path="/office-patients/pending-payments" component={pendingPayments} />
              </Switch>
              <div id="page-select">
                <button className="unfilled-button"><img src={back} alt="back" style={{width: "15", height: "15", display: "block"}}/></button>
                <div id="page-enumeration">1 2 3 ... 15</div>
                <button className="unfilled-button"><img src={forward} alt="forward" style={{width: "15", height: "15", display: "block"}}/></button>
              </div>
            </div>
          </div>
        </div>
      </Router>
    );
  }
}

export default Patients;