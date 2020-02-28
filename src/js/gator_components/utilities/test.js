export default class Test {
    constructor(){

    }

    test(field, filter, match) {
        if ( field.value || field.value && field.value.search(filterRegEx) > -1) {
            field.value = field.value.replace(filter, "");
            let result = {
                matchesFilter: match.test(field.value),
                input: field,
            };
            return result;
        }
    }

    searchTest(field, filter, match, inputType){
        if ( field.value || field.value && field.value.search(filterRegEx) > -1) {
            field.value = field.value.replace(filter, "");
            let result = {
                matchesTest: match.test(field.value),
                input: field,
                dataType: inputType,
            };
            if (inputType === 'latlng'){
                Object.defineProperty(result, 'latLng', {value: field.value, writable: true });
                return result;
            } else if (inputType === 'placeId'){
                Object.defineProperty(result, 'placeId', {value: field.value, writable: true });
                return result;
            } else {
                Object.defineProperty(result, 'address', {value: field.value, writable: true });
                return result;
            }
        }
    }
}