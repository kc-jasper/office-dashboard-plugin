/** 
 * injects components into corresponding DOM elements,
 * retrieves userinfo array from div attribute and 
 * passes it into component as Props
 */

import React from 'react';
import ReactDOM from 'react-dom';
import './css/office-index.css';
import Header from './header.js';
import Overview from './components/overview.js';
import Calendar from './components/calendar.js';
import Patient from './components/patient.js';
import Patients from './components/patients.js';
import Setting from './components/settings.js';
import Profile from './components/profile.js';
import Doctor from './components/doctor.js';
import Notifs from './components/notifs.js';

const rootEl = document.getElementById("office-dashboard");
if (rootEl) {
  const userinfo = JSON.parse(rootEl.getAttribute('userinfo'));
  ReactDOM.render(
    <React.StrictMode>
    <Header userinfo={userinfo}/>
    </React.StrictMode>,
    rootEl
  );
}

// in React Strict Mode we pass userinfo data in as a prop
const overviewEl = document.getElementById("office-overview");
if (overviewEl) {
  const userinfo = JSON.parse(overviewEl.getAttribute('userinfo'));
  console.log(userinfo); // for dev purposes only
  ReactDOM.render(
    <React.StrictMode>
    <Overview userinfo={userinfo}/>
    </React.StrictMode>,
    overviewEl
  );
}

const calendarEl = document.getElementById("office-calendar");
if (calendarEl) {
  const userinfo = JSON.parse(calendarEl.getAttribute('userinfo'));
  ReactDOM.render(
    <React.StrictMode>
    <Calendar userinfo={userinfo}/>
    </React.StrictMode>,
    calendarEl
  );
}

const patientEl = document.getElementById("office-patient");
if (patientEl) {
  const userinfo = JSON.parse(patientEl.getAttribute('userinfo'));
  ReactDOM.render(
    <React.StrictMode>
    <Patient userinfo={userinfo}/>
    </React.StrictMode>,
    patientEl
  );
}

const patientsEl = document.getElementById("office-patients");
if (patientsEl) {
  const userinfo = JSON.parse(patientsEl.getAttribute('userinfo'));
  ReactDOM.render(
    <React.StrictMode>
    <Patients userinfo={userinfo}/>
    </React.StrictMode>,
    patientsEl
  );
}

const settingsEl = document.getElementById("office-settings");
if (settingsEl) {
  const userinfo = JSON.parse(settingsEl.getAttribute('userinfo'));
  ReactDOM.render(
    <React.StrictMode>
    <Setting userinfo={userinfo}/>
    </React.StrictMode>,
    settingsEl
  );
}

const profileEl = document.getElementById("office-profile");
if (profileEl) {
  const userinfo = JSON.parse(profileEl.getAttribute('userinfo'));
  ReactDOM.render(
    <React.StrictMode>
    <Profile userinfo={userinfo}/>
    </React.StrictMode>,
    profileEl
  );
}

const doctorEl = document.getElementById("office-doctor");
if (doctorEl) {
  const userinfo = JSON.parse(doctorEl.getAttribute('userinfo'));
  ReactDOM.render(
    <React.StrictMode>
    <Doctor userinfo={userinfo}/>
    </React.StrictMode>,
    doctorEl
  );
}


const notifsEl = document.getElementById("office-notifs");
if (notifsEl) {
  const userinfo = JSON.parse(notifsEl.getAttribute('userinfo'));
  ReactDOM.render(
    <React.StrictMode>
    <Notifs userinfo={userinfo}/>
    </React.StrictMode>,
    notifsEl
  );
}