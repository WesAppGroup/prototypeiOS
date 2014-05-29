function get_events_main(callback) {
	var event_data_url = "http://stumobile0.wesleyan.edu/events/all";
  var eHttpRequest;
  var event_data;

	console.log("attempting to fetch event data from server");

  eHttpRequest = new XMLHttpRequest();
  if (!eHttpRequest) {
    alert("Events request failed");
    return false;
  }
  eHttpRequest.onreadystatechange = alertEvents;
  eHttpRequest.open("GET", event_data_url, true);
  eHttpRequest.send();

  function alertEvents() {
    if (eHttpRequest.readyState === 4) {
      if (eHttpRequest.status === 200) {
        event_data = eHttpRequest.responseText;
        console.log("events request succesful");
        return callback($.parseJSON(event_data));
      }
      else {
        alert("Events request failed");
      }
    }
  }/*
	var get = $.get(
		event_data_url, function(data) {
			console.log("here");
			var event_data = data;
			console.log(event_data, " = event data");
			if (event_data === undefined) {
				console.log("undf");
				throw "no_data";
			} else {
				console.log("got event data");
				return callback(event_data);
			}
		});
	console.log("get event data attempt failed");
	alert("Unable to fetch events data, reverting to backup data")
  if (!event_data) {
    //backup dummy data
    event_data =
      [{
      "value": {
        "eventLatitude": 41.5516004,
        "eventCategory": "Auditions",
        "eventLink": "http://www.wesleyan.edu/athletics/adultfitness",
        "eventDescription": "12/03/2013 06:45 am - 07:30 am Strength, cardio or any combination for a fun and effective workout. We'll do a variety of cardio drills and resistance training exercises designed to challenge and improve cardio and muscular strength while maintaining a strong core. All levels welcome. Please bring hand weights, mat and water bottle. Let's get strong together!",
        "eventLocation": "Fitness Center",
        "eventTime": 1386071100,
        "eventLongitude": -72.6619722,
        "eventName": "Adult Fitness - Circuit Training 101"
      },
      "key": 1
    }, {
      "value": {
        "eventLatitude": 41.5569732,
        "eventCategory": "Auditions",
        "eventLink": "http://admission.wesleyan.edu/visit/",
        "eventDescription": "12/03/2013 09:00 am - 10:15 am Get the official Wesleyan tour from current Wesleyan students who will tell you everything you want to know.",
        "eventLocation": "Office of Admission",
        "eventTime": 1386079200,
        "eventLongitude": -72.658159,
        "eventName": "Campus Tour (Offered again at noon and 3 p.m.)"
      },
      "key": 2
    }, {
      "value": {
        "eventLatitude": 41.5623209,
        "eventCategory": "Auditions",
        "eventLink": "N/A",
        "eventDescription": "12/03/2013 09:00 am - 07:00 pm Chuck features sport team apparel, and sport memorabilia.  You may find that million dollar Honus Wagner card in his collection.  Grab it before he sees it!",
        "eventLocation": "Usdan Vendor F1",
        "eventTime": 1386079200,
        "eventLongitude": -72.6506488,
        "eventName": "Chuck Blue"
      },
      "key": 3
    }, {
      "value": {
        "eventLatitude": 41.5569732,
        "eventCategory": "Sports",
        "eventLink": "http://admission.wesleyan.edu/visit/",
        "eventDescription": "12/03/2013 10:30 am - 11:30 am An hour long detailed presentation on the Wesleyan admission process by a dean with the chance to ask questions.",
        "eventLocation": "Office of Admission",
        "eventTime": 1386084600,
        "eventLongitude": -72.658159,
        "eventName": "Information Session (Offered again at 2 p.m.)"
      },
      "key": 4
    }, {
      "value": {
        "eventLatitude": 41.5623209,
        "eventCategory": "Student Groups",
        "eventLink": "http://www.wesleyan.edu/athletics/adultfitness",
        "eventDescription": "12/03/2013 12:00 pm - 12:50 pm Learn sun salutation and basic yoga postures with a focus on strengthening your core (stomach and back).  Beginners and all levels welcome.  Please bring your own mat, strap and blocks.",
        "eventLocation": "Multi Use Rm 2",
        "eventTime": 1386090000,
        "eventLongitude": -72.6506488,
        "eventName": "Adult Fitness - Yoga Basic Fundamentals"
      },
      "key": 5
    }, {
      "value": {
        "eventLatitude": 41.5623209,
        "eventCategory": "Sports",
        "eventLink": "http://www.wesleyan.edu/athletics/adultfitness",
        "eventDescription": "12/03/2013 12:00 pm - 12:50 pm Water provides a superior environment for exercise, comfortably toning and strengthening muscles with greater balance and efficiency. In addition, this class will enhance your flexibility and range of motion.",
        "eventLocation": "Pool",
        "eventTime": 1386090000,
        "eventLongitude": -72.6506488,
        "eventName": "Adult Fitness - Pool Tools"
      },
      "key": 6
    }, {
      "value": {
        "eventLatitude": 41.5516004,
        "eventCategory": "Admissions",
        "eventLink": "http://www.wesleyan.edu/athletics/adultfitness",
        "eventDescription": "12/03/2013 12:00 pm - 12:50 pm Full body blast - 15 minutes cardio intervals (using gym machines), 15 minutes of intense strength (using dumbells and own body weight) and 15 minutes of core work (using stability balls, planks, weighted balls, etc.) Come in, work hard and get results!!! All levels are welcome!",
        "eventLocation": "Fitness Center",
        "eventTime": 1386090000,
        "eventLongitude": -72.6619722,
        "eventName": "Adult Fitness - 15/15/15"
      },
      "key": 7
    }, {
      "value": {
        "eventLatitude": 41.5623209,
        "eventCategory": "Admissions",
        "eventLink": "http://www.wesleyan.edu/athletics/adultfitness",
        "eventDescription": "12/03/2013 12:00 pm - 01:00 pm Presented by Carol Tyler, MA, RD, CDN. Mindfulness training can help you live life more fully, peacefully and rescoucefully. Mindfulness is a way of learning to pay attention to whatever is happening in the present moment with an attitude of curiosity and acceptance. Join us for mindfulness meditation and gentle movement practices.",
        "eventLocation": "Woodhead Lounge, ESC184",
        "eventTime": 1386090000,
        "eventLongitude": -72.6506488,
        "eventName": "Wesleyan Adult Fitness Wellness Series-The Benefits of Mindfulness Training"
      },
      "key": 8
    }, {
      "value": {
        "eventLatitude": 41.5575372,
        "eventCategory": "Admissions",
        "eventLink": "http://www.wesleyan.edu/cfa",
        "eventDescription": "12/03/2013 12:00 pm - 01:30 pm Wesleyan chamber music students perform works by various composers.  ",
        "eventLocation": "Crowell Concert Hall",
        "eventTime": 1386090000,
        "eventLongitude": -72.6571089,
        "eventName": "Wesleyan Chamber Music Concert"
      },
      "key": 9
    }, {
      "value": {
        "eventLatitude": 41.5623209,
        "eventCategory": "Other",
        "eventLink": "N/A",
        "eventDescription": "12/03/2013 03:15 pm - 06:15 pm ",
        "eventLocation": "Wasch Center Butterfield Room",
        "eventTime": 1386101700,
        "eventLongitude": -72.6506488,
        "eventName": "Wasch Center Fall Film Series - The Court Jester, 1956, produced and directed by Norman Panama and Melvin Frank, starring Danny Kaye"
      },
      "key": 10
    }, {
      "value": {
        "eventLatitude": 41.5623209,
        "eventCategory": "Theater",
        "eventLink": "N/A",
        "eventDescription": "12/03/2013 04:15 pm - 06:00 pm \"An Intellectual History of the Eclectic Society\", presented by Rachel Unger. ",
        "eventLocation": "PAC 136 (Heller Classroom)",
        "eventTime": 1386105300,
        "eventLongitude": -72.6506488,
        "eventName": "History Department Thesis Presentation"
      },
      "key": 11
    }, {
      "value": {
        "eventLatitude": 41.5623209,
        "eventCategory": "Student Groups",
        "eventLink": "www.wesleyan.edu/caps",
        "eventDescription": "12/03/2013 07:30 pm - 08:30 pm Intended to create a network of support for those who have experienced the death of a loved one.",
        "eventLocation": "Davison Health Center Solarium",
        "eventTime": 1386117000,
        "eventLongitude": -72.6506488,
        "eventName": "Grief Support"
      },
      "key": 12
    }, {
      "value": {
        "eventLatitude": 41.5575372,
        "eventCategory": "Other",
        "eventLink": "http://www.wesleyan.edu/cfa",
        "eventDescription": "12/03/2013 08:00 pm - 09:30 pm The Wesleyan Wind Ensemble under the direction of Bob Hoyle, performs major works for wind band in an exciting evening performance spanning a variety of genres, cultures, and points in history.",
        "eventLocation": "Crowell Concert Hall",
        "eventTime": 1386118800,
        "eventLongitude": -72.6571089,
        "eventName": "WesWinds Fall Concert"
      },
      "key": 13
    }];
  }
  
	return callback(event_data);*/
}
