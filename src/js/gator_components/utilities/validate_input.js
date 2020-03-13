import Test from './test';

export default class Validate extends Test {
    constructor() {
        super();
    }

    is_client_id(input) {
        let field = input;
        console.log(input, 'Input value:: ', field.value);
        let filterRegEx = /[^a-z-0-9]{1,25}/gi;
        let matchRegEx = /[a-z]{3}-[a-z0-9]{2,25}/gi;
        let test = {
            result: super.test(field, filterRegEx, matchRegEx)
        };      
        return test.result;
    }

    is_case_number(input) {
        let field = input;
        console.log(field, 'Input value:: ', field.value);
        let filterRegEx = /[^0-9]{1,8}/g;
        let matchRegEx = /[0-9]{6,8}/g;
        let test = {
            result: super.test(field, filterRegEx, matchRegEx)
        };      
        return test.result;
    }

    is_project_number(input) {
        let field = input;
        console.log(field, 'Input value:: ', field.value);
        let filterRegEx = /[^0-9]{1,12}/g;
        let matchRegEx = /[0-9]{8,12}/g;
        let test = {
            result: super.test(field, filterRegEx, matchRegEx)
        };      
        return test.result;
    }

    is_date_from_YYYY_MM_DD(input) {
        let field = input;
        console.log(field, 'Input value:: ', field.value);
        let filterRegEx = /[^-0-9]{1,10}/g;
        let matchRegEx = /[0-9]{4}-[0-9]{2}-[0-9]{2}/g;
        let test = {
            result: super.test(field, filterRegEx, matchRegEx)
        };      
        return test.result;
    }

    is_date_to_YYYY_MM_DD(input) {
        let field = input;
        console.log(field, 'Input value:: ', field.value);
        let filterRegEx = /[^-0-9]{1,10}/g;
        let matchRegEx = /[0-9]{4}-[0-9]{2}-[0-9]{2}/g;
        let test = {
            result: super.test(field, filterRegEx, matchRegEx)
        };      
        return test.result;
    }

    is_search(input){
        let field = input;
        console.log(field, 'Input value:: ', field.value);
        let matchOpenInputRegEx = /[0-9-._,a-z\s]+$/gi;
        let matchPlaceIdRegEx = /[^CHIJ]/gi;
        let matchLatLngRegEx = /(?:-)?\d{1,8}(?:[.]?\d{1,8}\s?),(?:\s?)(?:-)?\d{1,8}(?:[.]?\d{1,8}?)/g;
        // let copy_matchLatLngRegEx = /(?:-)?[0-9]+$(?:[.]?[0-9]+$]\s?),(?:\s-)?[0-9]+$](?:[.]?[0-9]+$]?)/g;
        let filterRegEx = /[^0-9-.,a-z\s]+$/gi;
        /**
         * Does input have what the filter is looking for?
         * if not, treat it as a place id or lat lng
         * 
         */
        let lastCharacter = field.value.length -1;
        if ( lastCharacter == /\s/){
            console.log('whitespace at the end of input');
            field.value[lastCharacter] = '';
        }
        if (field.value.search(matchPlaceIdRegEx) > 1 && matchOpenInputRegEx.test(field.value) && field.value.length >= 27 ){
            console.log('placeIdmatch');
            let filteredField = /\s/;
            field.value = field.value.replace(filteredField, "");  
            let test = {
                result: super.searchTest(field, filterRegEx, matchPlaceIdRegEx, 'placeId')
            };    
            return test.result;
        } else if (field.value.search(matchLatLngRegEx) > -1){
            console.log('latlngmatch');
            field.value = field.value.replace(/\s/, "");
            let _split = field.value.split(',');
            console.log(_split);
            _split[2] = {
                lat: null,
                lng: null,
            };
            if (_split.length >= 2) {
                console.log('comma-delimited coordinate values received!');
                let lat = _split[0];
                let lng = _split[1];
                console.log(lat, lng);
                const latLng = `${lat}, ${lng}`;
                if (Math.abs(lat) <= 90 && Math.abs(lng) <= 180) {
                    field.value = latLng;
                    let test = {
                        result: super.searchTest(field, filterRegEx, matchLatLngRegEx, 'latlng')
                    };    
                    return test.result;
  
                  } else {
                    console.log('not real coordinates...');
                    let test = {
                        result: super.searchTest(field, filterRegEx, matchLatLngRegEx, 'latlng')
                    };    
                    return test.result;
                }
            } else {
                console.log('split less than 2! Please ensure you pass-in comma-delimited coordinates...');
                // let test = {
                //     result: super.searchTest(field, filterRegEx, matchLatLngRegEx, 'latlng')
                // };    
                // return test.result;
            }
        } else {
            console.log('search query');
            if(field.value.search(filterRegEx)){
                console.log('elsematch');   
                let test = {
                    result: super.searchTest(field, filterRegEx, matchOpenInputRegEx, 'text')
                };   
                return test.result;
            }
        }
    }
}

    // isNumberField (minLimit, maxLimit, input) {
    //     let min = minLimit;
    //     let max = maxLimit;
    //     let limit = `{${min}},${max}}`;
    //     let filterRegEx = `/[^0-9]${limit}+$/g;`
    //     let matchRegEx = `/[0-9]${limit}+$/g`;
    //     console.log(input, field.value);
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
    //     console.log(input, field.value);
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
    //     let ip_regex = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/
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