/* This file contains javascript relating to the events page.
 */
function startEvents() {
    console.log("Ere")
  $('#events').on('pageinit', function() {
    console.log('pageinit fired on events page');
  });
  $('#events').on('pageshow', function() {
    console.log('pageshow fired on events page');

	function resizeMap() {
	     $('#map_area').css("height",$(window).height()-44);
	}
	// $(document).ready(function() {
	resizeMap();
	// });
	// $(window).resize(function() {
	// resizeMap();
	// });
	//<![CDATA[ 
	/*
	 * jQuery Mobile Slide Menu 1.0.0, jQuery Mobile plugin
	 * https://github.com/donwalter/jquery-mobile-slide-menu
	 *
	 * Copyright(c) 2013, Don Walter
	 * http://www.don-walter.com/
	 *
	 * A side aligned sliding menu for jQuery Mobile
	 * Licensed under the MIT License
	 */
	// (function ($) {
	//     $.fn.slideMenu = function (options) {
	//         // If options exist, merge them with the default settings
	//         options = $.extend({
	//             duration: 500,
	//             easing: 'swing'
	//         }, options);
	//         return this.each(function () {
	//             var obj = $(this);
	//             var menuStatus = false;
	//             $(document).on('click', 'a.showMenu', function (e) {
	//                 if (!menuStatus) {
	//                     $('#side-menu').css('visibility', 'visible');
	//                     $('.ui-page-active').animate({
	//                         marginLeft: '50%',
	//                     }, options.duration, options.easing, function () {
	//                         menuStatus = true
	//                     });
	//                     return false;
	//                 } else {
	//                     $('.ui-page-active').animate({
	//                         marginLeft: '0px',
	//                     }, options.duration, options.easing, function () {
	//                         menuStatus = false
	//                     });
	//                     return false;
	//                 }
	//             });
	//             // $(document).on('swipeleft', '.pages', function (e) {
	//             //     if (menuStatus) {
	//             //         $('.ui-page-active').animate({
	//             //             marginLeft: '0px',
	//             //         }, options.duration, options.easing, function () {
	//             //             menuStatus = false;
	//             //             $('#side-menu').css('marginTop', $(window).scrollTop());
	//             //         });
	//             //     }
	//             // });
	//             // $(document).on('swiperight', '.pages', function (e) {
	//             //     if (!menuStatus) {
	//             //         //alert($(window).scrollTop() + ' - ' + $('#side-menu').offset().top);
	//             //         $('#side-menu').css('marginTop', $(window).scrollTop());
	//             //         $('#side-menu').css('visibility', 'visible');
	//             //         $('.ui-page-active').animate({
	//             //             marginLeft: '165px',
	//             //         }, options.duration, options.easing, function () {
	//             //             menuStatus = true
	//             //         });
	//             //     }
	//             // });
	//             $('#side-menu li a').click(function () {
	//                 var p = $(this).parent();
	//                 if ($(p).hasClass('active')) {
	//                     $('#side-menu li').removeClass('active');
	//                 } else {
	//                     $('#side-menu li').removeClass('active');
	//                     $(p).addClass('active');
	//                 }
	//                 menuStatus = false;
	//             });
	//         });
	//     };
	// })(jQuery);

	// $(function () {
	//         $('#side-menu').slideMenu();
	//     });

	var map;
	var infowindow;

	function parse_events(event_str) {
	  var events = [];
	  arr = event_str.split("}, {");
	  for (var i=0;i<arr.length;i++) {
	    var cat_re = /category&#34;: &#34;(.+?(?=&#34;))/;
	    var link_re = /link&#34;: &#34;(.+?(?=&#34;))/;
	    var name_re = /name&#34;: &#34;(.+?(?=&#34;))/;
	    var desc_re = /description&#34;: &#34;(.+?(?=&#34;))/
	    var lat_re = /lat&#34;: (\d+.\d+)/;
	    var lon_re = /lon&#34;: (-?\d+.\d+)/;

	    var cat_match = cat_re.exec(arr[i]);
	    var link_match = link_re.exec(arr[i]);
	    var name_match = name_re.exec(arr[i]);
	    var desc_match = desc_re.exec(arr[i]);
	    var lat_match = lat_re.exec(arr[i]);
	    var lon_match = lon_re.exec(arr[i]);
	    
	    var obj = Object.create(null);
	    obj.cat = cat_match[1];
	    obj.link = link_match[1];
	    obj.name = name_match[1];

	    if (desc_match) {
	        obj.desc = desc_match[1];
	    }
	    else {
	        obj.desc = ""
	    }
	    obj.lat = lat_match[1];
	    obj.lon = lon_match[1];

	    events.push(obj);
	  }

	  return events
	}

	function initialize() {

	  var styles_array = 
	  [ 
	    { 
	      "featureType": "poi.school",
	      "stylers": [ 
	        { "hue": "#91ff00" }, 
	        { "saturation": 43 }, 
	        { "lightness": -5 }, 
	        { "gamma": 0.99 }, 
	        { "visibility": "on" } 
	        ] 
	      },{ "featureType": "poi.park", 
	      "elementType": "geometry", 
	      "stylers": [
	         { "hue": "#3bff00" }, 
	         { "saturation": 30 } ] 
	       },{ "featureType": "water", 
	       "elementType": "geometry.fill", 
	       "stylers": [ 
	        { "hue": "#00bbff" },
	        { "gamma": 0.85 }, 
	        { "saturation": -31 }, 
	        { "lightness": -43 } ] 
	      },{ "featureType": "landscape.man_made", 
	      "elementType": "geometry.fill", 
	      "stylers": [ 
	        { "color": "#808080" }, 
	        { "saturation": -56 }, 
	        { "lightness": 78 },
	        { "gamma":1} ] 
	      },{ "featureType": "poi.sports_complex", 
	      "elementType": "geometry.fill", 
	      "stylers": [
	        { "visibility": "on" }, 
	        { "weight": 0.7 }, 
	        { "gamma": 0.64 }, 
	        { "hue": "#e6ff00" }, 
	        { "saturation": -39 }, 
	        { "lightness": -5 } ] 
	      },{ "featureType": "road.local", 
	      "elementType": "geometry.fill", 
	      "stylers": [ 
	        { "color": "#E2FFF3" }, 
	        { "gamma": 0.72 }, 
	        { "lightness": 89 }, 
	        { "saturation": -100 } ] 
	       },{ "featureType": "road.local", 
	       "elementType": "geometry.stroke", 
	       "stylers": [
	        { "saturation": -49 },
	        { "lightness": -50 },
	        { "visibility": "on" }, 
	        { "color": "#ab8080" }, 
	        { "weight": 0.2 } ] 
	      },{ "featureType": "road.arterial",
	      "elementType": "geometry.fill", 
	      "stylers": [ 
	        { "color": "#E2FFF3" }, 
	        { "gamma": 0.72 }, 
	        { "lightness": 89 }, 
	        { "saturation": -100 } ] 
	      }
	      ];

	  //Geolocation
    console.log("HERE")
	 if(navigator.geolocation) {
	    browserSupportFlag = true;
	    navigator.geolocation.getCurrentPosition(function(position) {
	      initialLocation = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
	      // map.setCenter(initialLocation);
	    });
	    var initialLocation = initialLocation
	  }
	  else {
	    var geo_flag = false;
	    console.log("Geo loco not supported")
	  }


	  var mapOptions = {
	    center: new google.maps.LatLng(41.5526833,-72.6612454),
	    zoom: 15,
	    mapTypeId: google.maps.MapTypeId.ROADMAP,
	    minZoom: 13,
	  };
	  var map = new google.maps.Map(document.getElementById("map-canvas"),
	       mapOptions);
	  map.setOptions({styles: styles_array});

	  if (geo_flag = true) {
	    var curr_pos = new google.maps.Marker({
	      position: initialLocation,
	      map: map,
	      title:"You are here!"
	   })
	  };
	    
	  /* spreads out markers that are close */
	  var oms = new OverlappingMarkerSpiderfier(map, 
	        {
	            markersWontHide: true,
	            keepSpiderfied: true
	        });

	  /*a Adds markers for all events in 'events' to the map
	   */
	  var markers = [];
	  var currentIW = null;
	  var infoWindow = new google.maps.InfoWindow();
	  var icons = {'Auditions':'iconV1.png','Sports':'iconV1BLUE.png',
	            'Admissions':'iconV1GREEN.png',
	               'Theater':'iconV1PURPLE.png','Other':'iconV1RED.png'}
	  // var icon = { 
	  //   url: 'iconV1.png'};
	  function markerize(pos, name, str, cat) {
	    var marker = new google.maps.Marker({
	        position: pos,
	        map: map,
	        icon: {url: icons[cat]},
	    });

	    marker.id = name;

	    var infowindow = new google.maps.InfoWindow({
	      content: content_str,
	    });

	    google.maps.event.addListener(marker,'click',function() {
	      if (currentIW != null) {
	        currentIW.close();
	      }
	      infowindow.open(map,marker);
	      currentIW = infowindow
	    });

	    google.maps.event.addListener(map,'click',function() {
	      infowindow.close();
	    });

	    oms.addMarker(marker);

	    return marker;
	  }

	  /* Adds events to map
	   */
	  for (var i=0;i<events.length;i++) {
	    if ((events[i].lat) != 0.0 && (events[i].lon) != 0.0) {

	      var content_str = '<div id="content">'+
	        '<a href="' + events[i].link + '" id="firstHeading" class="firstHeading" target="_blank">' + 
	        events[i].name + '</a>'+
	        '<div id="bodyContent">'+
	        '<p>' + events[i].desc + '</p>' +
	        '</div>'+
	        '</div>';

	      var pos = new google.maps.LatLng(events[i].lat,events[i].lon);
	      var name = events[i].name;
	      var cat = events[i].cat;
	      console.log(cat)

	      var m = markerize(pos, name, content_str,cat);

	      markers.push(m);
	    }
	  }

	  var colors = {'Auditions':'rgba(255, 255, 255, 0.6)','Sports':'rgba(203, 251, 255, 0.78)',
	            'Admissions':'rgba(108, 228, 108, 0.85)',
	               'Theater':'rgba(214, 119, 214, 0.86)','Other':'red'};

	  //Adds events to side-menu
	  var event_list = document.getElementById("event_list")
	  for (var i=0;i<events.length;i++) {
	    var content_str = '<li>'+
	      '<a href="' + events[i].link + '" id="firstHeading" class="event_name">' +
	       + events[i].name + '</a>'+'</li>';
	    var newli = document.createElement('li')
	    newli.setAttribute('style','background:'+colors[events[i].cat]) //set color style of list here if desired
	    var newa = document.createElement('a')
	    newa.setAttribute('id',events[i].name)
	    newa.setAttribute('class',"event_name")
	    newa.setAttribute('href','#')
	    newa.innerHTML = events[i].name
	    newli.appendChild(newa)
	    event_list.appendChild(newli);
	  };


	  // Adds a click listener to all the rows in the event table
	  $(".event_name").each(function() {
	    var m;
	    var name = this.id;
	    $(this).click(function(){
	      for (var i=0;i<markers.length;i++) {
	        if (name == markers[i].id) {
	          m = markers[i];
	        }
	      }
	      if (m != undefined && m != null) {
	        google.maps.event.trigger(m,"click");
	      }
	    });
	  });

	  google.maps.event.addListener(map,'center_changed',function() { 

	    var sw = new google.maps.LatLng(41.54, -72.69);
	    var ne = new google.maps.LatLng(41.565, -72.63);
	    var allowedBounds = new google.maps.LatLngBounds(sw, ne);
	    if(! allowedBounds.contains(map.getCenter())) {
	      var C = map.getCenter();
	      var X = C.lng();
	      var Y = C.lat();

	      var AmaxX = allowedBounds.getNorthEast().lng();
	      var AmaxY = allowedBounds.getNorthEast().lat();
	      var AminX = allowedBounds.getSouthWest().lng();
	      var AminY = allowedBounds.getSouthWest().lat();

	      if (X < AminX) {X = AminX;}
	      if (X > AmaxX) {X = AmaxX;}
	      if (Y < AminY) {Y = AminY;}
	      if (Y > AmaxY) {Y = AmaxY;}

	      map.setCenter(new google.maps.LatLng(Y,X));
	    }
	  });

	  /* Logic for instant search of events list. It removes events
	   * that do not match the search bar from the DOM and keeps
	   * them in an array. It adds them back into the DOM when the
	   * do match the text in the search bar.
	   */
	  var removed = [];
	  $("#search_input").keyup(function(event) {
	    var search_re = new RegExp(this.value,"i");
	    $("#event_list").children("li").each(function(index) {
	      var event_name = $(this).children("a").first().attr("id");
	      if (!search_re.test(event_name)) {
	        $(this).hide();
	      }
	      else {
	        $(this).show();
	      }
	    });
	  });
	}

    // google.maps.event.addDomListener(window, 'load', initialize);

	// }
    initialize()
  });

  $('#events').on('pagecreate', function() {
    console.log('pagecreate fired on events page');
  });
}
