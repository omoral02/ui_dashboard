(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["clicked_marker_function"],{

/***/ "./src/js/gator_components/dynamic_map_modules/modules/clicked_marker.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return clickedMarker; });\nfunction clickedMarker(clickedLocation, map, util, ids, infoWindow, markers, uniqueId) {\n  // util.clearConsole();\n  let labels = 'Nice click!';\n  let marker = new google.maps.Marker({\n    position: clickedLocation,\n    label: labels,\n    map: map,\n    animation: google.maps.Animation.DROP,\n    title: 'Nice Tap!',\n  });\n  marker.id = uniqueId;\n  uniqueId++;\n  markers.push(marker);\n  ids.push(uniqueId);\n  util.log('Marker\\'s ID in the array is ' + marker.id + '.' + ('\\n') + \n  \t'Marker(s) pushed to \\'Markers\\' array within addMarker function. These are the following IDs:');\n  for (let i = 0; i < markers.length; i++) {\n    util.log(markers[i].id);\n  }\n\n  google.maps.event.addListener(marker, 'click', function() {\n  \tconst contentClickedMarker = __webpack_require__(\"./src/js/gator_components/dynamic_map_modules/modules/content_clicked_marker.js\");\n    contentClickedMarker(marker, map, util, infoWindow, uniqueId);\n    util.log('dropped marker, first contentLoad function listener on standby' + 'InfoWindow was opened by contentLoad function for clicked-on marker: ' + marker.id);\n  })\n}//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvanMvZ2F0b3JfY29tcG9uZW50cy9keW5hbWljX21hcF9tb2R1bGVzL21vZHVsZXMvY2xpY2tlZF9tYXJrZXIuanMuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9qcy9nYXRvcl9jb21wb25lbnRzL2R5bmFtaWNfbWFwX21vZHVsZXMvbW9kdWxlcy9jbGlja2VkX21hcmtlci5qcz8iXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY2xpY2tlZE1hcmtlcihjbGlja2VkTG9jYXRpb24sIG1hcCwgdXRpbCwgaWRzLCBpbmZvV2luZG93LCBtYXJrZXJzLCB1bmlxdWVJZCkge1xuICAvLyB1dGlsLmNsZWFyQ29uc29sZSgpO1xuICBsZXQgbGFiZWxzID0gJ05pY2UgY2xpY2shJztcbiAgbGV0IG1hcmtlciA9IG5ldyBnb29nbGUubWFwcy5NYXJrZXIoe1xuICAgIHBvc2l0aW9uOiBjbGlja2VkTG9jYXRpb24sXG4gICAgbGFiZWw6IGxhYmVscyxcbiAgICBtYXA6IG1hcCxcbiAgICBhbmltYXRpb246IGdvb2dsZS5tYXBzLkFuaW1hdGlvbi5EUk9QLFxuICAgIHRpdGxlOiAnTmljZSBUYXAhJyxcbiAgfSk7XG4gIG1hcmtlci5pZCA9IHVuaXF1ZUlkO1xuICB1bmlxdWVJZCsrO1xuICBtYXJrZXJzLnB1c2gobWFya2VyKTtcbiAgaWRzLnB1c2godW5pcXVlSWQpO1xuICB1dGlsLmxvZygnTWFya2VyXFwncyBJRCBpbiB0aGUgYXJyYXkgaXMgJyArIG1hcmtlci5pZCArICcuJyArICgnXFxuJykgKyBcbiAgXHQnTWFya2VyKHMpIHB1c2hlZCB0byBcXCdNYXJrZXJzXFwnIGFycmF5IHdpdGhpbiBhZGRNYXJrZXIgZnVuY3Rpb24uIFRoZXNlIGFyZSB0aGUgZm9sbG93aW5nIElEczonKTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBtYXJrZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgdXRpbC5sb2cobWFya2Vyc1tpXS5pZCk7XG4gIH1cblxuICBnb29nbGUubWFwcy5ldmVudC5hZGRMaXN0ZW5lcihtYXJrZXIsICdjbGljaycsIGZ1bmN0aW9uKCkge1xuICBcdGNvbnN0IGNvbnRlbnRDbGlja2VkTWFya2VyID0gcmVxdWlyZSgnLi9jb250ZW50X2NsaWNrZWRfbWFya2VyLmpzJyk7XG4gICAgY29udGVudENsaWNrZWRNYXJrZXIobWFya2VyLCBtYXAsIHV0aWwsIGluZm9XaW5kb3csIHVuaXF1ZUlkKTtcbiAgICB1dGlsLmxvZygnZHJvcHBlZCBtYXJrZXIsIGZpcnN0IGNvbnRlbnRMb2FkIGZ1bmN0aW9uIGxpc3RlbmVyIG9uIHN0YW5kYnknICsgJ0luZm9XaW5kb3cgd2FzIG9wZW5lZCBieSBjb250ZW50TG9hZCBmdW5jdGlvbiBmb3IgY2xpY2tlZC1vbiBtYXJrZXI6ICcgKyBtYXJrZXIuaWQpO1xuICB9KVxufSJdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/js/gator_components/dynamic_map_modules/modules/clicked_marker.js\n");

/***/ }),

/***/ "./src/js/gator_components/dynamic_map_modules/modules/content_clicked_marker.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return contentClickedMarker; });\nfunction contentClickedMarker(marker, map, infoWindow, util) {\n\tlet contentString = '<div id = \"contentTestString\">' + '<div id=\"sideNotice\">' + '<h1 id=\"heading\" class=\"heading\">' +\n\t\t'Click the button below to completely remove this marker.</h1>' + '<br>' +\n\t\t'<p id = \"text\" >You may close this window by simply cliking the X on the top right corner!.</p>' +\n\t\t'<br>' +\n\t\t'<p id=\"text\">Marker Location:' + marker.getPosition() +\n\t\t'<br>' +\n\t\t'Marker\\'s ID is :' + marker.id +\n\t\t'<br>' +\n\t\t'</p>' +\n\t\t'<form action = \"\">' + '<fieldset>' +\n\t\t'<input type = \"button\" id=\"buttonRemover\" value=\"Remove This Marker\" onclick =\"deleteMarkers(' + marker.id + ')\"/>' +\n\t\t'</div>' +\n\t\t'</div>' + '';\n\tinfoWindow.setContent(contentString);\n\tinfoWindow.open(map, marker);\n\tutil.log('Marker ' + marker.id + ' was opened!');\n}//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvanMvZ2F0b3JfY29tcG9uZW50cy9keW5hbWljX21hcF9tb2R1bGVzL21vZHVsZXMvY29udGVudF9jbGlja2VkX21hcmtlci5qcy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy4vc3JjL2pzL2dhdG9yX2NvbXBvbmVudHMvZHluYW1pY19tYXBfbW9kdWxlcy9tb2R1bGVzL2NvbnRlbnRfY2xpY2tlZF9tYXJrZXIuanM/Il0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnRlbnRDbGlja2VkTWFya2VyKG1hcmtlciwgbWFwLCBpbmZvV2luZG93LCB1dGlsKSB7XG5cdGxldCBjb250ZW50U3RyaW5nID0gJzxkaXYgaWQgPSBcImNvbnRlbnRUZXN0U3RyaW5nXCI+JyArICc8ZGl2IGlkPVwic2lkZU5vdGljZVwiPicgKyAnPGgxIGlkPVwiaGVhZGluZ1wiIGNsYXNzPVwiaGVhZGluZ1wiPicgK1xuXHRcdCdDbGljayB0aGUgYnV0dG9uIGJlbG93IHRvIGNvbXBsZXRlbHkgcmVtb3ZlIHRoaXMgbWFya2VyLjwvaDE+JyArICc8YnI+JyArXG5cdFx0JzxwIGlkID0gXCJ0ZXh0XCIgPllvdSBtYXkgY2xvc2UgdGhpcyB3aW5kb3cgYnkgc2ltcGx5IGNsaWtpbmcgdGhlIFggb24gdGhlIHRvcCByaWdodCBjb3JuZXIhLjwvcD4nICtcblx0XHQnPGJyPicgK1xuXHRcdCc8cCBpZD1cInRleHRcIj5NYXJrZXIgTG9jYXRpb246JyArIG1hcmtlci5nZXRQb3NpdGlvbigpICtcblx0XHQnPGJyPicgK1xuXHRcdCdNYXJrZXJcXCdzIElEIGlzIDonICsgbWFya2VyLmlkICtcblx0XHQnPGJyPicgK1xuXHRcdCc8L3A+JyArXG5cdFx0Jzxmb3JtIGFjdGlvbiA9IFwiXCI+JyArICc8ZmllbGRzZXQ+JyArXG5cdFx0JzxpbnB1dCB0eXBlID0gXCJidXR0b25cIiBpZD1cImJ1dHRvblJlbW92ZXJcIiB2YWx1ZT1cIlJlbW92ZSBUaGlzIE1hcmtlclwiIG9uY2xpY2sgPVwiZGVsZXRlTWFya2VycygnICsgbWFya2VyLmlkICsgJylcIi8+JyArXG5cdFx0JzwvZGl2PicgK1xuXHRcdCc8L2Rpdj4nICsgJyc7XG5cdGluZm9XaW5kb3cuc2V0Q29udGVudChjb250ZW50U3RyaW5nKTtcblx0aW5mb1dpbmRvdy5vcGVuKG1hcCwgbWFya2VyKTtcblx0dXRpbC5sb2coJ01hcmtlciAnICsgbWFya2VyLmlkICsgJyB3YXMgb3BlbmVkIScpO1xufSJdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/js/gator_components/dynamic_map_modules/modules/content_clicked_marker.js\n");

/***/ })

}]);