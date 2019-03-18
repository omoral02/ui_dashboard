const apiKey = 'AIzaSyAVUjC3CiwXLDElAq0AwWEntiVIfNadpW8';

export default class InsertMapsBootstrap {

	constructor () {
		this.api_key = apiKey;
		this.mapsJS = document.createElement('script');
		this.head = document.getElementsByTagName('head');
	}

	insert (key) {
		this.mapsJS.src = `https://maps.googleapis.com/maps/api/js?&key=` + `${key}`;
		this.head[0].appendChild(this.mapsJS);
	}	
}
