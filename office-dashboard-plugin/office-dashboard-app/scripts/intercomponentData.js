/** 
 * stores and retrieves information between components
 * userinfo (functions.php) also gets passed between components but is read-only
 */

var intercomponentData = (function() {
    var patients = [];
  
    var getPatients = function() {
      return JSON.parse(localStorage.getItem("patients"));
    };
  
    var pushPatient = function(currentPatient) {
      patients.push(currentPatient);
      localStorage.setItem("patients", JSON.stringify(patients));
    };

    var unsetPatients = function() {
      patients = [];
      localStorage.setItem("patients", JSON.stringify(patients));
    };
  
    return {
      getPatients: getPatients,
      pushPatient: pushPatient,
      unsetPatients: unsetPatients,
    }
  
  })();
  
  export default intercomponentData;