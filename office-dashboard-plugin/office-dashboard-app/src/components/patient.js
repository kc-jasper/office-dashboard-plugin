/**
 * React Component.
 * 
 * Displays selected patient's profile
 */

import React, { Component } from 'react';
import '../css/office-component.css';
import intercomponentData from '../scripts/intercomponentData.js';
import appointmentUtilities from '../scripts/appointmentUtilities.js';
import backarrow from '../includes/backarrow.png';

class Patient extends Component {
    constructor(props) {
        super(props)
        this.state = {
          loaded: false,
          patient_id: '',
          patientInfo: [],
          insuranceInfo: []
        }
    }

    componentDidMount() {
      // determine which patient's information to display from URL parameters
      var query = window.location.search.split('?');
      var id = query[1];

      // fetch information from AWS databases endpoint
      // first, bind function to component, then call
      this.getPatient = appointmentUtilities.getPatient.bind(this);
      this.getPatient(id);
      this.getPatientInsurance = appointmentUtilities.getPatientInsurance.bind(this);
      this.getPatientInsurance(id);
      this.setState({
        patient_id: id,
        loaded: true
      })
    }
    
    /** returns true if the patient whose info will be displayed is one of current user's patients, false otherwise */ 
    permissionCheck() {
      var patients = intercomponentData.getPatients(); // get current user's array of patients
      if (patients.filter(includesPat => includesPat.patient_id === this.state.patient_id).length) {
        return true;
      } else {
        return false;
      }
    }
    
    render() {
      if (this.permissionCheck()) {
        this.first_name = this.state.patientInfo.first_name;
        this.last_name = this.state.patientInfo.last_name
        return (
          <div className="component">
            <header className="component-header">
              <h1>{this.first_name} {this.last_name}</h1>
              <div className="back-arrow">
                <a href={window.location.origin + "/office-patients"}>
                  <img src={backarrow} alt="back arrow" />
                </a>
              </div>
              <h2>Patient Info</h2>
              <pre id="patientInfo">{JSON.stringify(this.state.patientInfo, null, 2)}</pre>
              <h2>Insurance Info</h2>
              <pre id="insuranceInfo">{JSON.stringify(this.state.insuranceInfo, null, 2)}</pre>
            </header>
          </div>
        );
      } else {
        return(
          <div className="component">
            <header className="component-header">
              <div style={{position: "fixed", width: "100%", height: "100%", margin: "0", padding: "0", background: "rgba(0, 0, 0, 0.6)", top: "0", bottom: "0", right: "0", left: "0", zIndex: "400"}}></div>
              <h1 style={{margin: "auto", marginRight: "25vw", position: "relative", top: "30vh", width: "50%", color: "rgb(255, 255, 255)", zIndex: "401"}}>Error: Invalid link.</h1>
            </header>
          </div>
        );
      }
    }
}

export default Patient;