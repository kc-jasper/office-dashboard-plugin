/** 
 * React Component.
 * 
 * Shows individual booking appointment
 * Accessed through Calendar component (calendar.js)
 * (NOT IN USE AT THE MOMENT)
 */
import React, { Component } from 'react';
import '../css/office-component.css';
import intercomponentData from '../scripts/intercomponentData.js';
import zIndex from '@material-ui/core/styles/zIndex';
import backarrow from '../includes/backarrow.png';

class Event extends Component {
  render() {
    return (
      <div className="component">
        <header className="component-header">
            <h1>Calendar</h1>
            <div className="back-arrow" style={{width: "50px"}}>
                <a>
                    <img src={backarrow} alt="back arrow" />
                </a>
            </div>
        </header>
      </div>
    );
  }
}

export default Event;