export default function attachInstructionText(stepDisplay, marker, text, map) {
        google.maps.event.addListener(marker, 'click', function() {
          let navigationContent = text;
          stepDisplay.setContent(navigationContent);
          stepDisplay.open(map, marker);
        });
}