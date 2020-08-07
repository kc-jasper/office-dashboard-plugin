<?php
/** 
 * sets up custom REST API endpoints to interact with WP databases (Adminer)
 * one that allows GET requests for booking and doctor data
 * one that allows GET requests to change usermeta (overview-preferences)
 */ 

    /** permission callback function: can make GET request with office_id parameter
     * only if they are a doctor/office with corresponding office_id
     */
    function office_dashboard_permission( $request ) {
      $auth = $request->get_headers()['authorization'][0];
      if ($request->get_param('office_id') == $auth) {
        return true;
      }
      return new WP_Error( 'rest_forbidden', esc_html__( 'You do no thave permission to view this information', 'my-text-domain' ), array( 'status' => 401 ) );
    }
    
    /** makes SQL queries for office data and formats returned data into JSON */
    function get_office_dashboard_data( $request ) {
        global $wpdb;
        $booking_table = $wpdb->prefix.'booking';
        $user_table = $wpdb->prefix.'users';
        $usermeta_table = $wpdb->prefix.'usermeta';

        $office_id = $request->get_param('office_id');
        $data = [];

        // get booking data
        $booking_results = $wpdb->get_results("SELECT * FROM $booking_table WHERE office_id = $office_id");
        $bookings = [];
        foreach ( $booking_results as $booking) {
            $patient = $wpdb->get_results("SELECT display_name FROM $user_table WHERE ID = $booking->patient_id");
            $doctor = $wpdb->get_results("SELECT display_name FROM $user_table WHERE ID = $booking->doctor_id");
            $bookings[] = array(
              'patient' => $patient[0]->{'display_name'},
              'patient_id' => $booking->patient_id,
              'verified' => (bool) $booking->verified,
              'datetime_booked' => $booking->datetime_booked,
              'date' => $booking->date,
              'start_time' => $booking->start_time,
              'end_time' => $booking->end_time,
              'doctor' => $doctor[0]->{'display_name'},
              'doctor_id' => $booking->doctor_id,
              'status' => $booking->status,
              'booking_meta' => $booking->booking_meta
            );
        }
        $data["bookings"] = $bookings;

        // get doctor data
        $user_results = $wpdb->get_results("SELECT * FROM $usermeta_table WHERE meta_value = $office_id AND meta_key = 'office_id'");
        $doctors = [];
        foreach ( $user_results as $user ) {
          if ( get_userdata($user->user_id)->{'roles'}[0] == "um_doctor" ) {
            $doctors[] = array (
              'doctor_id' => $user->user_id,
              'doctor_name' => get_userdata($user->user_id)->{'display_name'}
            );
          }
        }
        $data["doctors"] = $doctors;
        
        return $data;
    }
    
    function toggle_overview( $request ) {
      $user_id = $request->get_param('user_id');
      $section_name = $request->get_param('section');
      if ($section_name === 'apptStats') $section = 0;
      if ($section_name === 'tasks') $section = 1;
      if ($section_name === 'appts') $section = 2;
      if ($section_name === 'payments') $section = 3;
      $pref_array = explode("-", get_user_meta($user_id, 'overview-preferences', true)); // split string

      function convert_to_bool( $p ) { // convert "1" and "0" to true and false
        return( $p == "1" );
      }
      $pref_array = array_map("convert_to_bool", $pref_array);
      $pref_array[$section] = !$pref_array[$section];

      function convert_to_string( $b ) { // convert back to "1" and "0" separated by "-"
        return $b ? '1' : '0';
      }
      $pref_array = array_map("convert_to_string", $pref_array);
      $updated_pref = $pref_array[0] . "-" . $pref_array[1] . "-" . $pref_array[2] . "-" . $pref_array[3];
      update_user_meta( $user_id, 'overview-preferences', $updated_pref );
      return "Success! Changed overview-preferences to " . $updated_pref;
    }

    // set up WP REST API routes
    add_action( 'rest_api_init', function () {
        register_rest_route( 'office-dashboard/v1', '/db/', array(
          'methods' => 'GET',
          'callback' => 'get_office_dashboard_data',
          'permission_callback' => 'office_dashboard_permission',
          'args' => array(
            'office_id' => array (
              'required' => true,
              'type' => 'integer'
            )
          )
        ) );
    } );

    add_action( 'rest_api_init', function () {
      register_rest_route( 'office-dashboard/v1', '/overview/', array(
        'methods' => 'GET',
        'callback' => 'toggle_overview',
        'args' => array(
          'section' => array (
            'required' => true,
            'type' => 'string'
          ),
          'user_id' => array (
            'required' => true,
            'type' => 'integer'
          )
        )
      ) );
  } );