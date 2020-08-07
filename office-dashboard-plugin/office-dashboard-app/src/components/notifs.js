/**
 * React Component.
 * 
 * Displays a list (table) of user's patients
 */

import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, NavLink, Redirect } from 'react-router-dom';
import '../css/office-component.css';
import '../css/office-table.css';
import Popup from './popup.js';
import back from '../includes/backarrow.png';
import forward from '../includes/forwardarrow.png';

class appointmentNotifs extends Component {
  render() {
      return(
        <div className="notif-component">
          <ul id="appointment-notifs">
            <table className="item-table">
              <tr>
                <td id="notif-btn" className="new-notif"></td>
                <td><div className="bold-medium">Josh Jackson</div>
                  <span>General Cleaning, Oral Examination</span>
                </td>
                <td className="align-right-column">Today 10:20 a.m.</td>
              </tr>
              <tr>
                <td id="notif-btn" className="new-notif"></td>
                <td><div className="bold-medium">Josh Jackson</div>
                  <span>General Cleaning, Oral Examination</span>
                </td>
                <td className="align-right-column">Today 10:20 a.m.</td>
              </tr>
              <tr>
                <td id="notif-btn"></td>
                <td><div className="bold-medium">Josh Jackson</div>
                  <span>General Cleaning, Oral Examination</span>
                </td>
                <td className="align-right-column">Today 10:20 a.m.</td>
              </tr>
              <tr>
                <td id="notif-btn"></td>
                <td><div className="bold-medium">Josh Jackson</div>
                  <span>General Cleaning, Oral Examination</span>
                </td>
                <td className="align-right-column">Today 10:20 a.m.</td>
              </tr>
              <tr>
                <td id="notif-btn"></td>
                <td><div className="bold-medium">Josh Jackson</div>
                  <span>General Cleaning, Oral Examination</span>
                </td>
                <td className="align-right-column">Today 10:20 a.m.</td>
              </tr>
              <tr>
                <td id="notif-btn"></td>
                <td><div className="bold-medium">Josh Jackson</div>
                  <span>General Cleaning, Oral Examination</span>
                </td>
                <td className="align-right-column">Today 10:20 a.m.</td>
              </tr>
              <tr>
                <td id="notif-btn"></td>
                <td><div className="bold-medium">Josh Jackson</div>
                  <span>General Cleaning, Oral Examination</span>
                </td>
                <td className="align-right-column">Today 10:20 a.m.</td>
              </tr>
              <tr>
                <td id="notif-btn"></td>
                <td><div className="bold-medium">Josh Jackson</div>
                  <span>General Cleaning, Oral Examination</span>
                </td>
                <td className="align-right-column">Today 10:20 a.m.</td>
              </tr>
            </table>
          </ul>
        </div>
      );
  }
}

class paymentNotifs extends Component {
  render() {
      return(
        <div className="notif-component">
          <div>
              payment notifs
          </div>
        </div>
      );
  }
}

class directNotifs extends Component {
  render() {
      return(
        <div className="notif-component">
          <div>
              direct notifs
          </div>
        </div>
      );
  }
}

class insuranceNotifs extends Component {
  render() {
      return(
        <div className="notif-component">
            <table className="item-table">
              <tr>
                <td id="notif-btn"></td>
                <td>Josh Jackson
                  <span>General Cleaning</span>
                </td>
                <td>$500.00</td>
                <td>xxxxx</td>
                <td>Insurance Company</td>
                <td>7/11</td>
                <td><button>Bill details</button></td>
              </tr>
              <tr>
                <td id="notif-btn"></td>
                <td>Josh Jackson
                  <span>General Cleaning</span>
                </td>
                <td>$500.00</td>
                <td>xxxxx</td>
                <td>Insurance Company</td>
                <td>7/11</td>
                <td><button>Bill details</button></td>
              </tr>
              <tr>
                <td id="notif-btn"></td>
                <td>Josh Jackson
                  <span>General Cleaning</span>
                </td>
                <td>$500.00</td>
                <td>xxxxx</td>
                <td>Insurance Company</td>
                <td>7/11</td>
                <td><button>Bill details</button></td>
              </tr>
              <tr>
                <td id="notif-btn"></td>
                <td>Josh Jackson
                  <span>General Cleaning</span>
                </td>
                <td>$500.00</td>
                <td>xxxxx</td>
                <td>Insurance Company</td>
                <td>7/11</td>
                <td><button>Bill details</button></td>
              </tr>
              <tr>
                <td id="notif-btn"></td>
                <td>Josh Jackson
                  <span>General Cleaning</span>
                </td>
                <td>$500.00</td>
                <td>xxxxx</td>
                <td>Insurance Company</td>
                <td>7/11</td>
                <td><button>Bill details</button></td>
              </tr>
            </table>
        </div>
      );
  }
}

class Notifs extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
    /* function that toggles "Add event" popup */
    this.togglePopup = () => {
      this.setState({
        showPopup: !this.state.showPopup // if it's false, set to true, and vice versa
      })
    };
  }

  render() {
    return (
      <Router>
        <div className="component">
          <header className="component-header">
            <h1>Notifications</h1>
            <input className="search-bar"
              placeholder="Search notifications"
              type="text"
            />
          </header>
          <div className="component-body" id="notif-container">
            {this.state.showPopup ? 
                <Popup
                  closePopup={this.togglePopup.bind(this)}
                  type='new-appointment-notif'/>
                : null}
            <div id="notif-nav">
              <ul>
                <NavLink activeStyle={{background: "#a9ccca"}} to="/office-notifications/appointment"><li className="new-notif-nav">Appointment</li></NavLink>
                <NavLink activeStyle={{background: "#a9ccca"}} to="/office-notifications/payment"><li>Payment</li></NavLink>
                <NavLink activeStyle={{background: "#a9ccca"}} to="/office-notifications/direct"><li>Direct message</li></NavLink>
                <NavLink activeStyle={{background: "#a9ccca"}} to="/office-notifications/insurance"><li>Insurance</li></NavLink>
              </ul>
            </div>
            <div id="notif-body">
              <Switch>
                <Route exact path="/office-notifications/">
                  <Redirect to="/office-notifications/appointment"/>
                </Route>  
                <Route exact path="/office-notifications/appointment" component={appointmentNotifs} />
                <Route exact path="/office-notifications/payment" component={paymentNotifs} />
                <Route exact path="/office-notifications/direct" component={directNotifs} />
                <Route exact path="/office-notifications/insurance" component={insuranceNotifs} />
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

export default Notifs;