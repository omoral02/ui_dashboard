'use strict';

export default function insert_maps_bootstrap () {
	const mapsJS = document.createElement('script');
	mapsJS.src =
	    'https://maps.googleapis.com/maps/api/js?callback=google_maps_init&key=${api_key}';
	document.getElementsByTagName('head')[0].appendChild(mapsJS);
	window.addEventListener('insert' function (){
		if (!styled_map_js){
			const styled_maps_js = require('./styled_map.js');
		}
	});
}