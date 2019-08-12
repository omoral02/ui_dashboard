export default class Test {
    constructor(){

    }

    test(field, filter, match) {
        if ( field.value || field.value && field.value.search(filterRegEx) > -1) {
            field.value = field.value.replace(filter, "");
            let result = {
                isTested: match.test(field.value),
                input: field,
            };
            return result;
        }
    }
}