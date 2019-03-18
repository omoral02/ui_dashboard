export default class ShowSteps {

	constructor (result, stepDisplay, map, markers){
		this.map = map;
		this.stepDisplay = stepDisplay;
		this.myRoute = result.routes[0].legs[0];
		this.markers = markers;
	}

	renderSteps () {
		for (let i = 0; i < this.myRoute.steps.length; i++) {
			this.marker = this.markers[i] = this.markers[i] || new google.maps.Marker({
				map: this.map,
				position: this.myRoute.steps[i].start_location
			});
			this.attachInstructionText(this.marker, this.myRoute.steps[i].instructions);
		}
	}

	attachInstructionText(marker, text) {
        google.maps.event.addListener(marker, 'click', function() {
          let navigationContent = text;
          this.stepDisplay.setContent(navigationContent);
          this.stepDisplay.open(this.map, marker);
        });
	}
}	