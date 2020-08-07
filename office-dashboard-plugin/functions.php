<?php
/**
 * uses WordPress functions and Ultimate Member shortcode to 
 * retrieve user information
 * 
 * @return array
 */

function get_office_user_info() {
	// use WordPress built-in function to get user data
	$userdata = wp_get_current_user()->{'data'};
	$user_id = $userdata->{'ID'};

	// here is the information that will be passed into the shortcode
	$userinfo = array(
		// could use $userdata to get display_name but I wanted to get the UM first_name and last_name
		'first_name' => str_replace("\n", '', strip_tags(do_shortcode('[um_loggedin]{first_name}[/um_loggedin]'))), // for some reason it can't see $_SESSION['office_id']
		'last_name' => str_replace("\n", '', strip_tags(do_shortcode('[um_loggedin]{last_name}[/um_loggedin]'))),
		'nickname' => $userdata->{'display_name'},
		'user_id' => $user_id,
		'username' => $userdata->{'user_login'},
		'overview_preferences' => get_user_meta($user_id, 'overview-preferences', true),
		'user_role' => wp_get_current_user()->{'roles'}[0],
		'office_id' => get_user_meta($user_id, 'office_id', true),
		'office_code' => get_user_meta($user_id, 'office_code', true),
	);

	return $userinfo;
}