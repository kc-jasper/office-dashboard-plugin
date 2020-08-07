/**
 * React Component.
 * 
 * Displays user's payment page
 */

import React, { Component } from 'react';
import '../css/office-component.css';
import { PieChart } from 'react-minimal-pie-chart';

class Profile extends Component {
    constructor(props){
      super(props)
      this.state = { 
        showPopup: false,
        doctors: [
          {
            id: '1',
            name: 'Dr. John Smith',
            profile: require('../includes/user.png')
          },
          {
            id: '1',
            name: 'Dr. John Smith',
            profile: require('../includes/user.png')
          },
          {
            id: '1',
            name: 'Dr. John Smith',
            profile: require('../includes/user.png')
          }
        ]
      };
    }

    togglePopup() {
      this.setState({
        showPopup: !this.state.showPopup // if it's false, set to true, and vice versa
      })
    }

    renderDoctorList() {
      return this.state.doctors.map((doctor, index) => {
        const { id, name, profile } = doctor;
        return(
          <td>
            <div className="user-icon"><img src={profile} alt="user" style={{width: "50px", height: "50px"}} /></div>
            <div className="bold">{name}</div>
            <button className="view-more"><a href={window.location.origin + "/office-profile/doctor?id=" + id}>VIEW PROFILE</a></button>
          </td>
        )
      })
    }

    render() {
      return (
        <div className="component">
          <header className="component-header">
            <h1 style={{opacity: "0"}}>placeholder</h1>
          </header>
          <div className="component-body">
            <div className="section" id="payment-stats">
              <h2 style={{opacity: "0"}}>placeholder</h2>
              <div className="section-body">
                <div className="section-div">
                  <div className="figure">
                    <PieChart
                      style={{height: "50px", width: "50px"}}
                      lineWidth={10}
                      data={[
                        { title: 'One', value: 10, color: '#C4C4C4' },
                        { title: 'Two', value: 15, color: '#FAF6F6' },
                        { title: 'Three', value: 20, color: '#D7C8C8' },
                      ]}
                    />
                  </div>
                  <div className="figure-description">Payments completed
                  <div className="bold-large">16</div>
                  <div className="bold-large" style={{color: "rgb(163, 163, 163)"}}>Today</div></div>
                </div>
                <div className="section-div">
                  <div className="figure">line chart</div>
                  <div className="figure-description">Total revenue 
                  <div className="bold-large">$5,300</div>
                  <div className="bold-large" style={{color: "rgb(163, 163, 163)"}}>Today</div></div>
                </div>
                <div className="section-div">
                  <div className="figure">
                    <PieChart
                      style={{height: "50px", width: "50px"}}
                      data={[
                        { title: 'One', value: 10, color: '#C4C4C4' },
                        { title: 'Two', value: 15, color: '#FAF6F6' },
                        { title: 'Three', value: 20, color: '#D7C8C8' },
                      ]}
                    />
                  </div>
                  <div className="figure-description">Paid by Jasper
                  <div className="bold-large">$3,200</div>
                  <div className="bold-large" style={{color: "rgb(163, 163, 163)"}}>Today</div></div>
                </div>
              </div>
            </div>
            <div className="section" id="doctor-list">
              <h2>Dentist Profiles</h2>
              <table className="item-table">
                <tr>
                  {this.renderDoctorList()}
                </tr>
              </table>
            </div>
          </div>
        </div>
      );
    }
}

export default Profile;