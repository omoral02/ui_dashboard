(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{13:
/*!***************************************************************************************!*\
  !*** ./src/js/gator_components/dynamic_map_modules/modules/content_clicked_marker.js ***!
  \***************************************************************************************/
/*! exports provided: default */
/*! all exports used */
/*! ModuleConcatenation bailout: Module is referenced from these modules with unsupported syntax: ./src/js/gator_components/dynamic_map_modules/modules/clicked_marker.js (referenced with cjs require) */function(module,__webpack_exports__,__webpack_require__){"use strict";eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return contentClickedMarker; });\nfunction contentClickedMarker(marker, map, infoWindow, util) {\n  let contentString = '<div id = \"contentTestString\">' + '<div id=\"sideNotice\">' + '<h1 id=\"heading\" class=\"heading\">' + 'Click the button below to completely remove this marker.</h1>' + '<br>' + '<p id = \"text\" >You may close this window by simply cliking the X on the top right corner!.</p>' + '<br>' + '<p id=\"text\">Marker Location:' + marker.getPosition() + '<br>' + 'Marker\\'s ID is :' + marker.id + '<br>' + '</p>' + '<form action = \"\">' + '<fieldset>' + '<input type = \"button\" id=\"buttonRemover\" value=\"Remove This Marker\" onclick =\"deleteMarkers(' + marker.id + ')\"/>' + '</div>' + '</div>' + '';\n  infoWindow.setContent(contentString);\n  infoWindow.open(map, marker);\n  util.log('Marker ' + marker.id + ' was opened!');\n}//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMTMuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvZ2F0b3JfY29tcG9uZW50cy9keW5hbWljX21hcF9tb2R1bGVzL21vZHVsZXMvY29udGVudF9jbGlja2VkX21hcmtlci5qcz9kMmEyIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnRlbnRDbGlja2VkTWFya2VyKG1hcmtlciwgbWFwLCBpbmZvV2luZG93LCB1dGlsKSB7XG5cdGxldCBjb250ZW50U3RyaW5nID0gJzxkaXYgaWQgPSBcImNvbnRlbnRUZXN0U3RyaW5nXCI+JyArICc8ZGl2IGlkPVwic2lkZU5vdGljZVwiPicgKyAnPGgxIGlkPVwiaGVhZGluZ1wiIGNsYXNzPVwiaGVhZGluZ1wiPicgK1xuXHRcdCdDbGljayB0aGUgYnV0dG9uIGJlbG93IHRvIGNvbXBsZXRlbHkgcmVtb3ZlIHRoaXMgbWFya2VyLjwvaDE+JyArICc8YnI+JyArXG5cdFx0JzxwIGlkID0gXCJ0ZXh0XCIgPllvdSBtYXkgY2xvc2UgdGhpcyB3aW5kb3cgYnkgc2ltcGx5IGNsaWtpbmcgdGhlIFggb24gdGhlIHRvcCByaWdodCBjb3JuZXIhLjwvcD4nICtcblx0XHQnPGJyPicgK1xuXHRcdCc8cCBpZD1cInRleHRcIj5NYXJrZXIgTG9jYXRpb246JyArIG1hcmtlci5nZXRQb3NpdGlvbigpICtcblx0XHQnPGJyPicgK1xuXHRcdCdNYXJrZXJcXCdzIElEIGlzIDonICsgbWFya2VyLmlkICtcblx0XHQnPGJyPicgK1xuXHRcdCc8L3A+JyArXG5cdFx0Jzxmb3JtIGFjdGlvbiA9IFwiXCI+JyArICc8ZmllbGRzZXQ+JyArXG5cdFx0JzxpbnB1dCB0eXBlID0gXCJidXR0b25cIiBpZD1cImJ1dHRvblJlbW92ZXJcIiB2YWx1ZT1cIlJlbW92ZSBUaGlzIE1hcmtlclwiIG9uY2xpY2sgPVwiZGVsZXRlTWFya2VycygnICsgbWFya2VyLmlkICsgJylcIi8+JyArXG5cdFx0JzwvZGl2PicgK1xuXHRcdCc8L2Rpdj4nICsgJyc7XG5cdGluZm9XaW5kb3cuc2V0Q29udGVudChjb250ZW50U3RyaW5nKTtcblx0aW5mb1dpbmRvdy5vcGVuKG1hcCwgbWFya2VyKTtcblx0dXRpbC5sb2coJ01hcmtlciAnICsgbWFya2VyLmlkICsgJyB3YXMgb3BlbmVkIScpO1xufSJdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQTtBQUFBO0FBQ0E7QUFhQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///13\n")},17:
/*!*******************************************************************************!*\
  !*** ./src/js/gator_components/dynamic_map_modules/modules/clicked_marker.js ***!
  \*******************************************************************************/
/*! exports provided: default */
/*! all exports used */
/*! ModuleConcatenation bailout: Module is referenced from these modules with unsupported syntax: ./src/js/gator_components/dynamic_map_modules/map/dynamic/initialize_dynamic_map.js (referenced with import()) */function(module,__webpack_exports__,__webpack_require__){"use strict";eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return clickedMarker; });\nfunction clickedMarker(clickedLocation, map, util, ids, infoWindow, markers, uniqueId) {\n  util.clearConsole();\n  let labels = 'Nice click!';\n  let marker = new google.maps.Marker({\n    position: clickedLocation,\n    label: labels,\n    map: map,\n    animation: google.maps.Animation.DROP,\n    title: 'Nice Tap!'\n  });\n  marker.id = uniqueId;\n  uniqueId++;\n  markers.push(marker);\n  ids.push(uniqueId);\n  util.log('Marker\\'s ID in the array is ' + marker.id + '.' + '\\n' + 'Marker(s) pushed to \\'Markers\\' array within addMarker function. These are the following IDs:');\n\n  for (let i = 0; i < markers.length; i++) {\n    util.log(markers[i].id);\n  }\n\n  google.maps.event.addListener(marker, 'click', function () {\n    const contentClickedMarker = __webpack_require__(/*! ./content_clicked_marker.js */ 13);\n\n    contentClickedMarker(marker, map, util, infoWindow, uniqueId);\n    util.log('dropped marker, first contentLoad function listener on standby' + 'InfoWindow was opened by contentLoad function for clicked-on marker: ' + marker.id);\n  });\n}//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMTcuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvZ2F0b3JfY29tcG9uZW50cy9keW5hbWljX21hcF9tb2R1bGVzL21vZHVsZXMvY2xpY2tlZF9tYXJrZXIuanM/MmI0MiJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjbGlja2VkTWFya2VyKGNsaWNrZWRMb2NhdGlvbiwgbWFwLCB1dGlsLCBpZHMsIGluZm9XaW5kb3csIG1hcmtlcnMsIHVuaXF1ZUlkKSB7XG4gIHV0aWwuY2xlYXJDb25zb2xlKCk7XG4gIGxldCBsYWJlbHMgPSAnTmljZSBjbGljayEnO1xuICBsZXQgbWFya2VyID0gbmV3IGdvb2dsZS5tYXBzLk1hcmtlcih7XG4gICAgcG9zaXRpb246IGNsaWNrZWRMb2NhdGlvbixcbiAgICBsYWJlbDogbGFiZWxzLFxuICAgIG1hcDogbWFwLFxuICAgIGFuaW1hdGlvbjogZ29vZ2xlLm1hcHMuQW5pbWF0aW9uLkRST1AsXG4gICAgdGl0bGU6ICdOaWNlIFRhcCEnXG4gIH0pO1xuICBtYXJrZXIuaWQgPSB1bmlxdWVJZDtcbiAgdW5pcXVlSWQrKztcbiAgbWFya2Vycy5wdXNoKG1hcmtlcik7XG4gIGlkcy5wdXNoKHVuaXF1ZUlkKTtcbiAgdXRpbC5sb2coJ01hcmtlclxcJ3MgSUQgaW4gdGhlIGFycmF5IGlzICcgKyBtYXJrZXIuaWQgKyAnLicgKyAoJ1xcbicpICsgXG4gIFx0J01hcmtlcihzKSBwdXNoZWQgdG8gXFwnTWFya2Vyc1xcJyBhcnJheSB3aXRoaW4gYWRkTWFya2VyIGZ1bmN0aW9uLiBUaGVzZSBhcmUgdGhlIGZvbGxvd2luZyBJRHM6Jyk7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbWFya2Vycy5sZW5ndGg7IGkrKykge1xuICAgIHV0aWwubG9nKG1hcmtlcnNbaV0uaWQpO1xuICB9XG5cbiAgZ29vZ2xlLm1hcHMuZXZlbnQuYWRkTGlzdGVuZXIobWFya2VyLCAnY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgXHRjb25zdCBjb250ZW50Q2xpY2tlZE1hcmtlciA9IHJlcXVpcmUoJy4vY29udGVudF9jbGlja2VkX21hcmtlci5qcycpO1xuICAgIGNvbnRlbnRDbGlja2VkTWFya2VyKG1hcmtlciwgbWFwLCB1dGlsLCBpbmZvV2luZG93LCB1bmlxdWVJZCk7XG4gICAgdXRpbC5sb2coJ2Ryb3BwZWQgbWFya2VyLCBmaXJzdCBjb250ZW50TG9hZCBmdW5jdGlvbiBsaXN0ZW5lciBvbiBzdGFuZGJ5JyArICdJbmZvV2luZG93IHdhcyBvcGVuZWQgYnkgY29udGVudExvYWQgZnVuY3Rpb24gZm9yIGNsaWNrZWQtb24gbWFya2VyOiAnICsgbWFya2VyLmlkKTtcbiAgfSlcbn0iXSwibWFwcGluZ3MiOiJBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFMQTtBQU9BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///17\n")}}]);