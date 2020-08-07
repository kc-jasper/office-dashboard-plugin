/**
 * React Component.
 * 
 * Displays list of current user's doctors if user is an office
 */

import React, { Component } from 'react';
import '../css/office-component.css';
import { PieChart } from 'react-minimal-pie-chart';
import backarrow from '../includes/backarrow.png';

class Doctor extends Component {
  constructor(props) {
    super(props)
    this.state = {
      doctors: [{
        doctorID: '',
        doctorName: ''
      }]
    }
  }
  
  componentDidMount() {
    // fetch doctor data from AWS endpoint
  }

  render() {
    return (
      <div className="component">
        <header className="component-header">
          <h1>Doctor X</h1>
          <div className="back-arrow">
            <a href={window.location.origin + "/office-profile"}>
              <img src={backarrow} alt="back arrow" />
            </a>
          </div>
        </header>
        <div className="component-body">
          <div className="section" id="payment-list">
            <h2>All Payments</h2>
            <div className="section-body">all, pending, complete</div>
          </div>
          <div className="section" id="total-revenue">
            <h2>Total Revenue</h2>
            <div className="section-body">this month so far, previous month</div>
          </div>
          <div className="section">
            <h2 style={{display: "none"}}>filler</h2>
            <div className="section-body">
              <PieChart
                style={{height: "100px", width: "100px"}}
                lineWidth={20}
                data={[
                  { title: 'One', value: 10, color: '#C4C4C4' },
                  { title: 'Two', value: 15, color: '#FAF6F6' },
                  { title: 'Three', value: 20, color: '#D7C8C8' },
                ]}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Doctor;