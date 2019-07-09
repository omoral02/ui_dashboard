export default class Validate {

    constructor () {
    }

    is_api_key (input) {
        let field = input;
        if (field) {
            return this.isMixedField(15, field);
        }
    }

    is_case_number (input) {
            // this.isNumberField(input);
            let regEx = /[^0-9]/g;
            console.log(input, input.value);
            let field = input;
            let result = {
                isFiltered: false,
                input: field,
            };
            if ( field.value.search(regEx) > -1 ) {
                field.value = field.value.replace(regEx, "");
                let result = {
                    isFiltered: true,
                    input: field,
                };
            return result;
            }
            return result;
    } 

    is_client_id (input) {
            // this.isNumberField(input);
            let regEx = /[^a-z-]+$/gi;
            console.log(input, input.value);
            let field = input;
            let result = {
                isFiltered: false,
                input: field,
            };
            if ( field.value.search(regEx) > -1 ) {
                field.value = field.value.replace(regEx, "");
                let result = {
                    isFiltered: true,
                    input: field,
                };
            return result;
            }
            return result;
    }

    is_date_from_YYYY_MM_DD (input) {
            // this.isNumberField(input);
            let regEx = /[^0-9-]/g;
            console.log(input, input.value);
            let field = input;
            let result = {
                isFiltered: false,
                input: field,
            };
            if ( field.value.search(regEx) > -1 ) {
                field.value = field.value.replace(regEx, "");
                let result = {
                    isFiltered: true,
                    input: field,
                };
            return result;
            }
            return result;   return this.isNumberField(6, field);
        // }
    }

    is_date_to_YYYY_MM_DD (input) {
           // this.isNumberField(input);
           let regEx = /[^0-9-]/g;
           console.log(input, input.value);
           let field = input;
           let result = {
               isFiltered: false,
               input: field,
           };
           if ( field.value.search(regEx) > -1 ) {
               field.value = field.value.replace(regEx, "");
               let result = {
                   isFiltered: true,
                   input: field,
               };
           return result;
           }
           return result;
    }

    is_domain (input) {
        let field = input;
        if (field) {
            return this.isTextField(16, field);
        }
    }

    is_ip_range (input) {
        let field = input;
        if (field) {
            return this.isNumberField(6, field);
        }
    }

    is_place_Id (input) {
        let field = input;
        if (field) {
            return this.isMixedField(6, field);
        }
    }

    is_project_number (input) {
        let filterRegex = new RegExp(/[^0-9]+$/g);
        let matchRegex = new RegExp(/[0-9]+$/g);
        let field = input;
        let result = {
            matchesFilter: matchRegex.test(field.value),
            input: field,
        };
        if ( field.value.search(filterRegex) > -1 ) {
            field.value = field.value.replace(filterRegex, "");
            let result = {
                matchesFilter: matchRegex.test(field.value),
                input: field,
            };
        return result;
        }
        return result;
    }

    is_lat_lng (input) {
        let regEx = /[^0-9.,]/g;
        let field = input;
        let result = {
            isFiltered: true,
            input: field,
        };
        if ( field.value.search(regEx) > -1 ) {
                field.value = field.value.replace(regEx, "");
                let result = {
                    isFiltered: true,
                    input: field,
                };
            let split = field.split(',');
            split[2] = {
                lat: null,
                lng: null,
            };
            if (split.length >= 2) {
                const lat = split[0];
                const lng = split[1];
                split[2].lat = this.isNumberField(4, 9, lat);
                split[2].lng = this.isNumberField(4, 9, lng);
                if ( Math.abs(lat) <= 90 && Math.abs(lng) <= 180 && split[2].lat == true && split[2].lng == true ) {
                    const latLng = lat + ',' + lng;
                    result.latLng = latLng;
                    return result;
                }
            
            }
        
        }
        return result;      
    }

    isNumberField (minLimit, maxLimit, input) {
        let min = minLimit;
        let max = maxLimit;
        let regEx = /[^0-9]/g;
        console.log(input, input.value);
        let field = input;
        let result = {
            isFiltered: true,
            input: input,
        };
        if ( field.value.search(regEx) > -1 ) {
            field.value = field.value.replace(regEx, "");
            let result = {
                isFiltered: true,
                input: field,
            };
        return result;
        }
        return result;
    }

    isTextField (minLimit, maxLimit, input) {
        let min = minLimit;
        let max = maxLimit;
        let regEx = /[^a-z]/gi;
        console.log(input, input.value);
        let field = input;
        let result = {
            isFiltered: true,
            input: input,
        };
        if ( field.value.search(regEx) > -1 ) {
            field.value = field.value.replace(regEx, "");
            let result = {
                isFiltered: true,
                input: field,
            };
        return result;
        }
        return result;
    }

    isMixedField (minLmit, maxLimit, input) {
        let min = minLmit;
        let max = maxLimit;
        let regEx = /[^a-z0-9]+$/gi;
        console.log(input, input.value);
        let field = input;
        let result = {
            isFiltered: true,
            input: input,
        };
        if ( field.value.search(regEx) > -1 ) {
            field.value = field.value.replace(regEx, "");
            let result = {
                isFiltered: true,
                input: field,
            };
        return result;
        }
        return result;
    }

//   /**
//  * Parse a LatLng value from a string.
//  * @param {string} value A string that may contain a LatLng.
//  * @return {google.maps.LatLng} The latlng parsed from the input string.
//  */
//   parseLatLng (input) {
//   // Attempt to parse a latlng in this string.
//   var split = value.split(',');
//   if (split.length == 2) {
//     // Remove whitespaces from start and end, but nowhere else.
//     // Use Number() instead of parseFloat() to parse strictly only numbers.
//     // These avoid things like "7 High St, 2GB UK" => (7,2)
//     var lat = +split[0];
//     var lng = +split[1];
//     if (Math.abs(lat) <= 90 && Math.abs(lng) <= 180) {
//       return new google.maps.LatLng(lat, lng);
//     }
//   }
//   return null;
//   }

// /**
//  * Parse a place ID value from a string.
//  * @param {string} value A string that may contain a place ID.
//  * @return {string} The place ID parsed from the input string.
//  */
//   parsePlaceId (input) {
//   // Place IDs are web-safe strings, so they match [a-zA-Z0-9_-]+
//   // To distinguish them from valid, one-word geographical names, we check for
//   // - Short place IDs always start with "ChIJ" and are at least 27 characters.
//   // - Long place ID always start with "E" and are at least 30 characters.
//   if (!value.match(/^[a-zA-Z0-9_-]+$/)) {
//     return null;
//   }
//   if (value[0] == 'E' && value.length >= 30) {
//     return value;
//   }
//   if (value.substring(0, 4) == 'ChIJ' && value.length >= 27) {
//     return value;
//   }
//   return null;
//   }
   
}