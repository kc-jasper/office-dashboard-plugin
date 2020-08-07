<?php
/**
 * Plugin.
 *
 * @wordpress-plugin
 *
 * Plugin Name:     Office Dashboard (current)
 * Description:     A React app for Office Dashboard to embed in any page
 * Author:          Kailey Chew
 * Version:         0.1
 */


require 'db.php';
require_once 'functions.php';

/**
 * Shortcode which renders Root element for your React App.
 *
 * @return string
 */

function office_dashboard_shortcode( $atts = array() ) {
	// set up default parameter for shortcode attribute
	extract(shortcode_atts(array(
	 'office_component' => ''
	), $atts));

	// everytime shortcode is used, it will bring up the App.js component as well as another selected component
	return '<div id="container" style="margin-top: -115px;">
				<div id="office-dashboard" userinfo="'.esc_attr(wp_json_encode(get_office_user_info())).'"></div>
				<div id="'.$office_component.'" userinfo="'.esc_attr(wp_json_encode(get_office_user_info())).'"></div>
			</div>';
}
add_shortcode('office-dashboard', 'office_dashboard_shortcode');

/**
 * Enqueues styles and js compiled for plugin.
 */
function office_dashboard_enqueue_assets() {

	$ver         = ( get_plugin_data( __FILE__ ) )['Version'];
	$js_to_load  = plugin_dir_url( __FILE__ ) . 'office-dashboard-app/build/static/js/main.js';
	$css_to_load = plugin_dir_url( __FILE__ ) . 'office-dashboard-app/build/static/css/main.css';

	if ( defined( 'ENV_DEV' ) && ENV_DEV ) {
		// DEV React dynamic loading.
		$ver         = gmdate( 'Y-m-d-h-i-s' );
		$js_to_load  = 'http://localhost:3000/static/js/main.js';
		$css_to_load = 'http://localhost:3000/static/css/main.css';
	}

	/* `wp-element` as dependency will load React and ReactDom for our app from `wp-includes` */
	wp_enqueue_script( 'office-dashboard', $js_to_load, array( 'wp-element' ), $ver, true );

	wp_enqueue_style( 'office-dashboard', $css_to_load, array(), $ver );

}

add_action( 'wp_enqueue_scripts', 'office_dashboard_enqueue_assets' );