'use strict';

const mapsJS = document.createElement('script');
mapsJS.src =
    'https://maps.googleapis.com/maps/api/js?callback=google_maps_init&key=${api_key}';
document.getElementsByTagName('head')[0].appendChild(mapsJS);

window.addEventListener('insert' mapsJS);
