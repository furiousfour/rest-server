import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

Meteor.startup(function() {
    GoogleMaps.load({ v: '3', key: 'AIzaSyCMcgsuQXkzqL-d1AwCmFwGGtXN1FnhFKU', libraries: 'geometry,places' });
    Session.set("markerLocation", {latitude: 13.08262, longitude: 80.27071 });
});



Template.Home.onCreated(function() {
  // We can use the `ready` callback to interact with the map API once the map is ready.
  GoogleMaps.ready('exampleMap', function(map) {
    // Add a marker to the map once it's ready
    
  });
});
var marker;
Template.Home.events({
	'click .searchButton': function(event){
		event.preventDefault();
		console.log("Button Pressed");

		var markerLocation = Session.get("markerLocation");
		console.log(markerLocation);
    	marker = new google.maps.Marker({
                position: new google.maps.LatLng(markerLocation.latitude, markerLocation.longitude),
                map: GoogleMaps.maps.exampleMap.instance,
                visible: true,
                draggable: true,
                animation: google.maps.Animation.DROP
    	});
    	GoogleMaps.maps.exampleMap.instance.setCenter(marker.position);
	}
});

Template.Home.helpers({
  exampleMapOptions: function() {
  	console.log("exampleMapOptions called");
    // Make sure the maps API has loaded
    if (GoogleMaps.loaded()) {
      // Map initialization exampleMapOptions
      var markerLocation = Session.get("markerLocation");
      return {
        center: new google.maps.LatLng(
        	markerLocation.latitude, 
        	markerLocation.longitude),
        zoom: 13,
        mapTypeId: google.maps.MapTypeId.ROADMAP

      };
    }
  }
});

Template.searchBox.rendered = function () { 
    window.onload = function() { 
    	var latitude,longitude;
        input = document.getElementById('autocomplete'); 
        autocomplete = new google.maps.places.Autocomplete(input); 
        // When the user selects an address from the dropdown, 
        google.maps.event.addListener(autocomplete, 'place_changed', function() { 

             // Get the place details from the autocomplete object. 
             var place = autocomplete.getPlace();
             var targetCoordinates = {
             	latitude : place.geometry.location.lat(),
             	longitude : place.geometry.location.lng()} ;

			 Session.set("markerLocation", targetCoordinates);
        }); 
    }; 
};