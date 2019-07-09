import Validate from './validate_input';

export default class Util extends Validate {
	constructor () {
		super();
	}

	clearConsole () {
		console.clear();
	}

	log (data) {
		console.log(data);
	}
}