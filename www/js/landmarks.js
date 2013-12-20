var LANDMARKS = "http://stumobile0.wesleyan.edu/static/json/locations.json";
var lHttpReq;


function startLandmarks() {
  var lJSON;
  var json;
  lHttpReq = new XMLHttpRequest();
  if (!lHttpReq) {
    alert("server request failed");
    return false;
  }
  lHttpReq.onreadystatechange = alertLandmarks;
  lHttpReq.open("GET", LANDMARKS, true);
  lHttpReq.send();
  console.log("attempting to fetch landmarks");

  function alertLandmarks() {
    if (lHttpReq.readyState === 4) {
      if (lHttpReq.status === 200) {
        json = undefined;
        json = $.parseJSON(lHttpReq.responseText);
        lJSON = json.hasOwnProperty('locations') ? json.locations : undefined;
        console.log('landmarks json received');
        console.log(lJSON);
      }
      else {
        alert('landmarks request failed');
      }
    }
  }
  $(document).on("click","#landmarks_icon", function() {
    $("#lm_list").empty();

    if (!lJSON) {
      alert("No data");
      return false;
    }

    var search = $("#lm_bar > input").val();
    var searchRE = new RegExp(search, 'i');

    for (var c in lJSON) {
      console.log(lJSON[c]);        
      if (lJSON.hasOwnProperty(c)) {  //limit to 5 results
        if (searchRE.test(lJSON[c].search_terms)) {
          writeLandmark(lJSON[c]);
        }
      }
    }
  });

  function writeLandmark(c) {
    var oTag = /<a\b[^>]*>/i;
    var cTag = /<\/a>/i;
    var cd = c.description ? c.description.replace(oTag,"").replace(cTag,"") : "No description";

    $("#lm_list").append("<li><div class='lm-info'>"+
                              "<div class='lm-name'>"+c.name+"</div>"+
                              "<div class='lm-also'>"+c.search_terms+"</div>"+
                              "<div class='lm-desc'>"+cd+"</div>"+
                              "</div></li>");
  }
}


		
