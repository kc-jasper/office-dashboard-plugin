/**
 * React Component.
 * 
 * Multi-purpose popup component
 * used in Calendar component (calendar.js)
 * used in App component (App.js)
 */

import React, { Component } from 'react';
import '../css/office-popup.css';
import tasklist from '../includes/tasklist.png';
import x from '../includes/x.png';

class Popup extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      appointmentData: {
        fn: '',
        ln: '',
        purpose: '',
        time: '',
        appointment_details: '',
        email: '',
        phone: ''
      },
      newPatient: 'yes' 
    };
  }

  changeHandler = (event) => {
    const name = event.target.name;
    var partialState = {};
    partialState = this.state.appointmentData;
    partialState[name] = event.target.value;
    this.setState(prevState => ({
      ...prevState,
      appointmentData: partialState
    }));
  }

  submitHandler = (event) => {
    event.preventDefault();
    alert("You are submitting this object: " + JSON.stringify(this.state.appointmentData));
    this.props.submitIntakeForm();
  }

  optionChangeHandler = (changeEvent) => {
    this.setState({
      newPatient: changeEvent.target.value
    });
  }

  render() {
    if (this.props.type === "add-appointment") {
      return (
        <div className="popup-background">
          <div className="popup-content">
            <h1>Add an appointment</h1>
            <button style={{position: "absolute", top: "10px", right: "10px", background: "none", outline: "none"}} onClick={this.props.closePopup}>
              <img src={x} alt="X" style={{width: "15px", height: "15px"}}/>
            </button>
            <form>
              <label style={{width: "50%"}}>
                Patient first name
                <input
                  type="text"
                  name="fn"
                  onChange={this.changeHandler}
                />
              </label>
              <label style={{width: "50%"}}>
                Last name
                <input
                type="text"
                name="ln"
                onChange={this.changeHandler}
                />
              </label>
              <label>
                Select appointment purpose
                <select name="purpose">
                  <option value="1" selected></option>
                  <option value="2">Checkup</option>
                  <option value="3">Consultation</option>
                  <option value="">Other..</option>
                </select>
              </label>
              <label>
                Set appointment time
                <input
                type="text"
                name="time"
                onChange={this.changeHandler}
                />
              </label>
              <label>
                New patient or not?
              </label>
              <label style={{width: "20%"}}>
                <input type="radio" value="yes" checked={this.state.newPatient === 'yes'} onChange={this.optionChangeHandler} />
                Yes
              </label>
              <label style={{width: "20%"}}>
                <input type="radio" value="no" checked={this.state.newPatient === 'no'} onChange={this.optionChangeHandler} />
                No
              </label>
              <label>
                Appointment details
                <input
                style={{height: "50px"}}
                type="text"
                name="appointment_details"
                onChange={this.changeHandler}
                />
              </label>
              <label>
                Email
                <input
                type="text"
                name="email"
                onChange={this.changeHandler}
                />
              </label>
              <label>
                Phone number
                <input
                type="text"
                name="phone"
                onChange={this.changeHandler}
                />
              </label>
              <button onClick={this.submitHandler}>Save and send intake form</button>
            </form>
          </div>
        </div>
      );
    } else if (this.props.type === "submit-intake-form") {
      return (
        <div className="popup-background">
          <div className="popup-content">
            <h1>Intake form was sent!</h1>
            <div>
              <img src={tasklist} alt="task list" style={{margin: "55px 5px", float: "left", position: "relative", left: "10vh"}}/>
              <div style={{float: "right", width: "40%", position: "relative", top: "70", right: "10%"}}>You will be notified when patients complete the form.</div>
            </div>
            <button style={{position: "absolute", top: "10px", right: "10px", background: "none", outline: "none"}} onClick={this.props.closePopup}>
              <img src={x} alt="X" style={{width: "15px", height: "15px"}}/>
            </button>
          </div>
        </div>
      );
    } else if (this.props.type === "new-appointment-notif") {
      return (
        <div className="popup-background">
          <div className="popup-content">
            <div className="bold-large" style={{margin: "0"}}>You have a new appointment!</div>
            <p style={{margin: "0"}}>You will be notified when patients complete the form.</p>
            <button style={{position: "absolute", top: "10px", right: "10px", background: "none", outline: "none"}} onClick={this.props.closePopup}>
              <img src={x} alt="X" style={{width: "15px", height: "15px"}}/>
            </button>
          </div>
        </div>
      );
    }
    
  }
}

export default Popup;