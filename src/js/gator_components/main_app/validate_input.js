export default class Validate {

    constructor () {

    }

    is_api_key (value) {
        
        if (value) {
            let result = {
                valid: true,
                value: value
            }
            return result;
        }
    }

    is_case_number (value) {
        
        if (value) {
            let result = {
                valid: true,
                value: value
            }
            return result;
        }
    } 

    is_client_id (value) {

        if (value) {
            let result = {
                valid: true,
                value: value
            }
            return result;
        }
    }

    is_date_from (value) {

        if (value) {
            let result = {
                valid: true,
                value: value
            }
            return result;
        }
    }

    is_date_to (value) {

        if (value) {
            let result = {
                valid: true,
                value: value
            }
            return result;
        }
    }

    is_domain (value) {

        if (value) {
            let result = {
                valid: true,
                value: value
            }
            return result;
        }
    }

    is_ip_range (value) {

        if (value) {
            let result = {
                valid: true,
                value: value
            }
            return result;
        }
    }

    is_place_Id (value) {
        
        if (value) {
            let result = {
                valid: true,
                value: value
            }
            return result;
        }
    }

    is_project_number (value) {

        if (value) {
            let result = {
                valid: true,
                value: value
            }
            return result;
        }
    }

    //   /**
//  * Parse a LatLng value from a string.
//  * @param {string} value A string that may contain a LatLng.
//  * @return {google.maps.LatLng} The latlng parsed from the input string.
//  */
//   parseLatLng (value) {
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
//   parsePlaceId(value) {
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