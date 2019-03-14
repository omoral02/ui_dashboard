const apiKey = 'AIzaSyAVUjC3CiwXLDElAq0AwWEntiVIfNadpW8';

export default function InsertMapsBootstrap () {

		this.api_key = apiKey;
		const mapsJS = document.createElement('script');
		mapsJS.src =
		`https://maps.googleapis.com/maps/api/js?&key=` + `${this.api_key}`;
		document.getElementsByTagName('head')[0].appendChild(mapsJS);
		window.addEventListener('insert', function(){
			if (!this.styled_map){
				const StyledMap = require('./styled_map.js');
				this.styled_map = new StyledMap();
				this.styled_map.init();
			}
		});
}