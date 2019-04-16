module.exports = class ShowSteps {

	constructor (result, markers, stepDisplay, map){
		let myRoute = result.routes[0].legs[0];
		const attachInstructionText = require('./attach_instruction_text.js');
	}

	renderSteps () {
		for (let i = 0; i < myRoute.steps.length; i++) {
			marker = markers[i] = markers[i] || new google.maps.Marker({
				map:map,
				position: myRoute.steps[i].start_location
			});
			new attachInstructionText(stepDisplay, marker, myRoute.steps[i].instructions, map);
		}
	}
}
	