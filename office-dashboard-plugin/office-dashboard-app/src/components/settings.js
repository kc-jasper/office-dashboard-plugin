/** 
 * React Component.
 * 
 * Creates logout button on settings page that unsets intercomponent data
 */
import React, { Component } from 'react';
import '../css/office-component.css';
import intercomponentData from '../scripts/intercomponentData.js';

class Setting extends Component {
  logout() {
    intercomponentData.unsetPatients();
    console.log("Unset the patients!");
    console.log(intercomponentData.getPatients());
    window.location.href = window.location.origin + "/logout";
  }

  render() {
    return (
      <div className="component">
        <header className="component-header">
          <h1>Settings</h1>
          <button id="logout-btn" className="component-top-btn" onClick={this.logout}>LOGOUT</button>
        </header>
      </div>
    );
  }
}

export default Setting;