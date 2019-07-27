export default class Validate {
    constructor() {
    }

    test_(field, filter, match) {
        if ( field.value || field.value && field.value.search(filterRegEx) > -1) {
            field.value = field.value.replace(filter, "");
            let result = {
                isTested: match.test(field.value),
                input: field,
            };
            return result;
        }
    }

    is_client_id(input, validation) {
        console.log(input, 'Input value:: ', input.value);
        let field = input;
        let filterRegEx = /[^a-z-0-9]{1,25}/gi;
        let matchRegEx = /[a-z-0-9]{6,25}/gi;
        let test = {
            result: validation(field, filterRegEx, matchRegEx)
        };      
        return test.result;
    }

    is_case_number(input, validation) {
        console.log(input, 'Input value:: ', input.value);
        let field = input;
        let filterRegEx = /[^0-9]{1,8}/gi;
        let matchRegEx = /[0-9]{6,8}/gi;
        let test = {
            result: validation(field, filterRegEx, matchRegEx)
        };      
        return test.result;
    }

    is_project_number(input, validation) {
        console.log(input, 'Input value:: ', input.value);
        let field = input;
        let filterRegEx = /[^0-9]{1,12}/g;
        let matchRegEx = /[0-9]{8,12}/g;
        let test = {
            result: validation(field, filterRegEx, matchRegEx)
        };      
        return test.result;
    }

    is_date_from_YYYY_MM_DD(input, validation) {
        console.log(input, 'Input value:: ', input.value);
        let field = input;
        let filterRegEx = /[^-0-9]{1,10}/g;
        let matchRegEx = /[-0-9]{10,10}/g;
        let test = {
            result: validation(field, filterRegEx, matchRegEx)
        };      
        return test.result;
    }

    is_date_to_YYYY_MM_DD(input, validation) {
        console.log(input, 'Input value:: ', input.value);
        let field = input;
        let filterRegEx = /[^-0-9]{1,10}/g;
        let matchRegEx = /[-0-9]{10,10}/g;
        let test = {
            result: validation(field, filterRegEx, matchRegEx)
        };      
        return test.result;
    }
}

    // isNumberField (minLimit, maxLimit, input) {
    //     let min = minLimit;
    //     let max = maxLimit;
    //     let limit = `{${min}},${max}}`;
    //     let filterRegEx = `/[^0-9]${limit}+$/g;`
    //     let matchRegEx = `/[0-9]${limit}+$/g`;
    //     console.log(input, input.value);
    //     let field = input;
    //     let result = {
    //         isFiltered: matchRegEx.test(field.value),
    //         input: field,
    //     };
    //     if ( field.value.search(filterRegEx) > -1 ) {
    //         field.value = field.value.replace(filterRegEx, "");
    //         let result = {
    //             isFiltered: matchRegEx.test(field.value),
    //             input: field,
    //         };
    //     return result;
    //     }
    //     return result;
    // }

    // isMixedField (minLimit, maxLimit, input) {
    //     let min = minLimit;
    //     let max = maxLimit;
    //     let limit = `{${min}},${max}}`;
    //     let filterRegEx = `/[^a-z0-9]${limit}/gi`;
    //     console.log(input, input.value);
    //     let field = input;
    //     let result = {
    //         isFiltered: matchRegEx.test(field.value),
    //         input: field,
    //     };
    //     if ( field.value.search(filterRegEx) > -1 ) {
    //         field.value = field.value.replace(regEx, "");
    //         let result = {
    //             isFiltered: matchRegEx.test(field.value),
    //             input: field,
    //         };
    //     return result;
    //     }
    //     return result;
    // }

    // is_api_key (input) {
    //     let field = input;
    //     if (field) {
    //         return this.isMixedField(15, field);
    //     }
    // }

    // is_domain (input) {
    //     let field = input;
    //     if (field) {
    //         return this.isTextField(16, field);
    //     }
    // }

    // is_ip_range (input) {
    //     let field = input;
    //     if (field) {
    //         return this.isNumberField(6, field);
    //     }
    // }

    // is_place_Id (input) {
    //     let field = input;
    //     if (field) {
    //         return this.isMixedField(6, field);
    //     }
    // }


    // is_lat_lng (input) {
    //     let regEx = /[^0-9.,]/g;
    //     let field = input;
    //     let result = {
    //         isFiltered: true,
    //         input: field,
    //     };
    //     if ( field.value.search(regEx) > -1 ) {
    //             field.value = field.value.replace(regEx, "");
    //             let result = {
    //                 isFiltered: true,
    //                 input: field,
    //             };
    //         let split = field.split(',');
    //         split[2] = {
    //             lat: null,
    //             lng: null,
    //         };
    //         if (split.length >= 2) {
    //             const lat = split[0];
    //             const lng = split[1];
    //             split[2].lat = this.isNumberField(4, 9, lat);
    //             split[2].lng = this.isNumberField(4, 9, lng);
    //             if ( Math.abs(lat) <= 90 && Math.abs(lng) <= 180 && split[2].lat == true && split[2].lng == true ) {
    //                 const latLng = lat + ',' + lng;
    //                 result.latLng = latLng;
    //                 return result;
    //             }

    //         }

    //     }
    //     return result;      
    // }