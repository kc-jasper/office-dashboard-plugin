/** 
 * makes fetch POST requests to AWS endpoint for appointment utilities
 * used in React components
 */

var appointmentUtilities = (function() {
    var addPatientAppointment = function() {
      return fetch("https://kuza36g6eb.execute-api.us-east-1.amazonaws.com/dev/user-appointment-utilities-methods", {
        method: "POST",
        body: JSON.stringify({
          "body": {
            "task": "add_patient_appointment",
            "patient_id": 1,
            "dependent_id": null,
            "office_id": 101,
            "doctor_id": null,
            "booked_datetime": "2020-08-02 19:49",
            "appointment_date": "2020-08-01",
            "start_time": "19:48",
            "end_time": "20:20",
            "timezone": "est",
            "booking_status": null,
            "check_in_status": null,
            "check_out_status": null,
            "billing_status": null,
            "purpose": null,
            "appointment_details": null,
            "booking_meta": null
          }
        }),
      })
      .then(res => res.json())
      .then(res => {
        console.log(JSON.stringify(res, null, 2));
      })
      .catch((error) => {
        console.log("This is the error:")
        console.error(error);
      });
    };

    var getPatientAppointment = function() {
      return fetch("https://kuza36g6eb.execute-api.us-east-1.amazonaws.com/dev/user-appointment-utilities-methods", {
        method: "POST",
        body: JSON.stringify({
          "body": {
            "task": "get_patient_appointment",
            "patient_id": "1",
          }
        }),
      })
        .then(res => res.json())
        .then(res => {
          this.setState({
            data: res["body"]
          })
          console.log(res["body"]);
        })
        .then(res => {
          this.setState({
            dataLoaded: true
          })
          console.log("appointmentUtilities task just set dataLoaded to true!");
        })
        .catch((error) => {
          console.log("This is the error:")
          console.error(error);
        });
    };

    var getPatient = function(patient_id) {
      fetch("https://kuza36g6eb.execute-api.us-east-1.amazonaws.com/dev/user-appointment-utilities-methods", {
        method: "POST",
        body: JSON.stringify({
          "body": {
            "task": "get_patient",
            "patient_id": patient_id
          }
        }),
      })
        .then(res => res.json())
        .then(res => {
          this.setState({
            patientInfo: res["body"]["0"]
          })
          console.log(res["body"]["0"])
        })
        .catch((error) => {
          console.log("This is the error:")
          console.error(error);
        });
    };

    var getPatientInsurance = function(patient_id) {
      fetch("https://kuza36g6eb.execute-api.us-east-1.amazonaws.com/dev/user-appointment-utilities-methods", {
        method: "POST",
        body: JSON.stringify({
          "body": {
            "task": "get_patient_insurance",
            "patient_id": patient_id
          }
        }),
      })
        .then(res => res.json())
        .then(res => {
          this.setState({
            insuranceInfo: res["body"]["0"]
          })
          console.log(res["body"]["0"])
        })
        .catch((error) => {
          console.log("This is the error:")
          console.error(error);
        });
    };

    var addOffice = function() {
      fetch("https://kuza36g6eb.execute-api.us-east-1.amazonaws.com/dev/user-appointment-utilities-methods", {
        method: "POST",
        body: JSON.stringify({
          "task": "add_office",
          "office_id":"101",
          "zipcode": "11201",
          "state": "NY",
          "country": "US",
          "address_line_1": "1121 Dekal Ave",
          "address_line_2": null,
          "industry_vertical": "dentistry",
          "office_name": "The Brooklyn Hospital Center",
          "phone": "2131231231",
          "email": "admin@tbh.org",
          "website": "http://w.adasd",
          "office_hours": {
              "Monday": [
                  "11-12pm",
                  "14-16pm"
              ],
              "Tuesday": [
                  "1-2pm"
              ],
              "Wednesday": null
          },
          "accpets_insurance": null,
          "accepts_purposes": null,
          "estimated_cost": null,
          "status": null,
          "accepts_payment_plans": null,
          "accepts_jasper_payment_plan": null,
          "employee_num": 12,
          "sic_code": null
        }),
      })
        .then(res => res.json())
        .then(res => {
          this.setState({
            paymentInfo: res
          })
          document.getElementById("paymentinfo").innerHTML = JSON.stringify(this.state.paymentInfo, null, 2);
        })
        .catch((error) => {
          console.log("This is the error:")
          console.error(error);
        });
    };

    var getOffice = function() {
      fetch("https://kuza36g6eb.execute-api.us-east-1.amazonaws.com/dev/user-appointment-utilities-methods", {
        method: "POST",
        body: JSON.stringify({
          "task": "get_office",
          "office_id": "1"
        }),
      })
        .then(res => res.json())
        .then(res => {
          this.setState({
            paymentInfo: res
          })
          document.getElementById("paymentinfo").innerHTML = JSON.stringify(this.state.paymentInfo, null, 2);
        })
        .catch((error) => {
          console.log("This is the error:")
          console.error(error);
        });
    };

    return {
      addPatientAppointment: addPatientAppointment,
      getPatientAppointment: getPatientAppointment,
      getPatient: getPatient,
      getPatientInsurance: getPatientInsurance,
      addOffice: addOffice,
      getOffice: getOffice
    }
  
  })();
  
  export default appointmentUtilities;