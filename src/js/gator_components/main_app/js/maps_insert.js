export default class InsertMapsBootstrap {
	constructor (apiKey) {
		this.api_key = apiKey;
	}

	insert () {
		const mapsJS = document.createElement('script');
		mapsJS.src =
		`https://maps.googleapis.com/maps/api/js?callback=google_maps_init&key=${this.api_key}`;
		document.getElementsByTagName('head')[0].appendChild(mapsJS);
		window.addEventListener('insert', function(){
			if (!styled_map){
				const StyledMap = require('./styled_map.js');
				const styled_map = new StyledMap();
				styled_map.init();
			}
		});
	}
}