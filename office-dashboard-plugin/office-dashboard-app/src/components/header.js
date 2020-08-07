/** 
 * React Component.
 * 
 * renders the side and top navigation bars for provider portal, 
 * is injected into the page whenever [office-dashboard] is used
 */

import React, { Component } from 'react';
import './css/office-header.css';

class Header extends Component {
  constructor(props){
    super(props)
  }

  /** makes the current page appear "selected" in side navbar */
  componentDidMount() {
    const pathname = window.location.pathname;
    if (pathname === "/office/" + this.props.userinfo.username + "/") {
      document.getElementById("overview-btn").style.color = "black";
    } else if (pathname === "/office-calendar/") {
      document.getElementById("cal-btn").style.color = "black";
    } else if (pathname === "/office-view-payments/") {
      document.getElementById("pay-btn").style.color = "black";
    } else if (pathname === "/office-patients/") {
      document.getElementById("patient-btn").style.color = "black";
    }
  }

  render() {
    const origin = window.location.origin;
    return (
      <div className="App">
        <div className="App-header">
          <nav id="react-app-nav">
            <ul>
              <li><a href={origin + "/office"} className="nav-btn" id="overview-btn">Overview</a></li>
              <li><a href={origin + "/office-calendar"} className="nav-btn" id="cal-btn">Calendar</a></li>
              <li><a href={origin + "/office-patients"} className="nav-btn" id="patient-btn">Patient Profiles</a></li>
              <li><a href={origin + "/office-profile"} className="nav-btn" id="pay-btn">Practice Profile</a></li>
            </ul>
          </nav>
        </div>
        <div id="top-buttons">
            <a href={origin + "/office-notifications"} className="nav-btn" id="go-notifs-btn">
              <button className="new"></button>
              <p>Notifications</p>
            </a>
            <a href={origin + "/office-settings"}>
              <button></button>
              <p>My Account</p>
            </a>
        </div>
      </div>
    );
  }
}

export default Header;