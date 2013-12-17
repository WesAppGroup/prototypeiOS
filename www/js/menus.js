/* Javascript Menus
*/
var menusUrl = "http://stumobile0.wesleyan.edu/static/usdan.json";
var mHttpReq;

function startMenus() { 
  mHttpReq = new XMLHttpRequest();

  if (!mHttpReq) {
    alert('Server request failed');
    return false;
  }

  mHttpReq.onreadystatechange = alertMenu;
  mHttpReq.open("GET", menusUrl, true);
  mHttpReq.send();
  console.log("Loading menus...");

  function alertMenu() {
    if (mHttpReq.readyState === 4) {
      if (mHttpReq.status === 200) {
        console.log('menus JSON received');
        writeMenu($.parseJSON(mHttpReq.responseText));
      }
      else {
        alert("menus request failed");
      }
    }
  }
  var menu_header = $("#header_link1_m")[0];
  var hours_header = $("#header_link2_m")[0];
  hours_header.style.color = "rgba(126, 126, 126, 0.62)";
  menu_header.style.color = "white";

  function writeMenu(json) {
    console.log(json);
    var html = "<div>";
    if (json.breakfast) {
      html += "<div><h4 class = 'menu_meal'>Breakfast</h4><div class='menu_items'>";
      for (var p in json.breakfast) {
        if (json.breakfast.hasOwnProperty(p)) {
          //html += "<p>"+json.breakfast[p]+"</p>";
          var item = (json.breakfast[p]+"").split("] ");				
					var cat = item[0].substring(1);
					var food = item[1];
          html += "<p class = '"+cat+"'>"+json.breakfast[p]+"</p>";
        }
      }
      html += "</div></div>";
    }
    console.log(html);
    if (json.brunch) {
      html += "<div><h4 class = 'menu_meal'>Brunch</h4><div class='menu_items'>";
      for (var p in json.brunch) {
        if (json.lunch.hasOwnProperty(p)) {
          //html += "<p>"+json.brunch[p]+"</p>";
          var item = (json.brunch[p]+"").split("] ");				
					var cat = item[0].substring(1);
					var food = item[1];
          html += "<p class = '"+cat+"'>"+json.brunch[p]+"</p>";
        }
      }
      html += "</div></div>";
    }
    console.log(html);
    if (json.lunch) {
      html += "<div><h4 class = 'menu_meal'>Lunch</h4><div class='menu_items'>";
      for (var p in json.lunch) {
        if (json.lunch.hasOwnProperty(p)) {
          if (json.lunch[p][0] === 'Dinner') {
            break;
          }
          //html += "<p>"+json.lunch[p]+"</p>";
          var item = (json.lunch[p]+"").split("] ");				
					var cat = item[0].substring(1);;
					var food = item[1];
          html += "<p class = '"+cat+"'>"+json.lunch[p]+"</p>";
        }
      }
      html += "</div></div>";
    }
    console.log(html);
    if (json.dinner) {
      html += "<div><h4 class = 'menu_meal'>Dinner</h4><div class='menu_items'>";
      for (var p in json.dinner) {
        if (json.dinner.hasOwnProperty(p)) {
          //html += "<p>"+json.dinner[p]+"</p>";
          var item = (json.dinner[p]+"").split("] ");				
					var cat = item[0].substring(1);
					var food = item[1];
          html += "<p class = '"+cat+"'>"+json.dinner[p]+"</p>";
        }
      }
      html += "</div></div>";
    }
    $("#menus_content").html(html);
  }
}
