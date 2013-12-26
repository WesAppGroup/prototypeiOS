/* Javascript Menus
*/
var menusUrl = "http://stumobile0.wesleyan.edu/static/usdan.json";
var mHttpReq;
var sampleMenu = '{"lunch":[["[stockpot] shrimp gumbo&nbsp;"],["[stockpot] cream of broccoli chowder&nbsp;"],["[mongolian grill] cook to order stir fry&nbsp;"],["[hearth baked pizza] italian sausage pizza&nbsp;"],["[kosher] meat sauce&nbsp;"],["[kosher] marinara sauce&nbsp;"],["[kosher] steamed zucchini&nbsp;"],["[kosher] tuna salad panini&nbsp;"],["[kosher] matzo ball soup&nbsp;"],["[kosher] tuna salad panini&nbsp;"],["[kosher] shells pasta&nbsp;"],["[cardinal deli] ham and swiss with honey mustard spread&nbsp;"],["[classics] chicken pot pie&nbsp;"],["[classics] brown rice&nbsp;"],["[classics] steamed green beans&nbsp;"],["[classics] steamed carrots&nbsp;"],["[vegan] spicy island tofu&nbsp;"],["[vegan] white rice&nbsp;"],["[vegan] arugula salad&nbsp;"],["[vegan] black eyed pea salad with lime cilantro vinaigrette&nbsp;"],["Dinner"],["[stockpot] shrimp gumbo&nbsp;"],["[stockpot] cream of broccoli chowder&nbsp;"],["[mongolian grill] cooked to order cage-free egg  breakfast sandwiches&nbsp;"],["[pastabilities] pomodoro sauce&nbsp;"],["[pastabilities] freshly prepared pasta&nbsp;"],["[pastabilities] marinara sauce&nbsp;"],["[kosher] matzo ball soup&nbsp;"],["[kosher] turkey with gravy&nbsp;"],["[kosher] egg noodles&nbsp;"],["[kosher] green beans&nbsp;"],["[kosher] chocolate chip cookies&nbsp;"],["[classics] cheese lasagna&nbsp;"],["[classics] asparagus, tomatoes, and onions&nbsp;"],["[classics] buttered carrots&nbsp;"],["[classics] cous cous&nbsp;"],["[vegan] macaroni and cheese&nbsp;"],["[vegan] brown rice&nbsp;"],["[vegan] steamed cauliflower&nbsp;"],["[vegan] brown and red lentils&nbsp;"],["[hearth baked pizza] buffalo chicken&nbsp;"]],"dinner":[["[stockpot] shrimp gumbo&nbsp;"],["[stockpot] cream of broccoli chowder&nbsp;"],["[mongolian grill] cooked to order cage-free egg  breakfast sandwiches&nbsp;"],["[pastabilities] pomodoro sauce&nbsp;"],["[pastabilities] freshly prepared pasta&nbsp;"],["[pastabilities] marinara sauce&nbsp;"],["[kosher] matzo ball soup&nbsp;"],["[kosher] turkey with gravy&nbsp;"],["[kosher] egg noodles&nbsp;"],["[kosher] green beans&nbsp;"],["[kosher] chocolate chip cookies&nbsp;"],["[classics] cheese lasagna&nbsp;"],["[classics] asparagus, tomatoes, and onions&nbsp;"],["[classics] buttered carrots&nbsp;"],["[classics] cous cous&nbsp;"],["[vegan] macaroni and cheese&nbsp;"],["[vegan] brown rice&nbsp;"],["[vegan] steamed cauliflower&nbsp;"],["[vegan] brown and red lentils&nbsp;"],["[hearth baked pizza] buffalo chicken&nbsp;"]],"breakfast":[["[classics] cage-free scrambled eggs&nbsp;"],["[classics] cage free scrambled eggs&nbsp;"],["[classics] home fries&nbsp;"],["[classics] pork sausage&nbsp;"],["[classics] buttermilk pancakes&nbsp;"]]}';

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
        writeMenu($.parseJSON(sampleMenu));
      }
    }
  }

  function writeMenu(json) {
    console.log(json);
    var html = "";
    var oldCat = "";
    if (json.breakfast) {
      html += "<div class='meal'><div class='menu_meal'>Breakfast</div><div class='menu_items'>";
      for (var p in json.breakfast) {
        if (json.breakfast.hasOwnProperty(p)) {
          var item = (json.breakfast[p]+"").split("] ");				
					var cat = item[0].substring(1);
					var food = item[1];
          if (cat !== oldCat) {
            html +="<span class='"+cat+" m-station'>"+cat+"</span>";
            oldCat = cat;
          }
          html += "<span class='menu-item'>"+food+"</span>";
        }
      }
      html += "</div></div>";
    }
    oldCat = "";
    console.log(html);
    if (json.brunch) {
      html += "<div class='meal'><div class='menu_meal'>Brunch</div><div class='menu_items'>";
      for (var p in json.brunch) {
        if (json.lunch.hasOwnProperty(p)) {
          var item = (json.brunch[p]+"").split("] ");				
					var cat = item[0].substring(1);
					var food = item[1];
          if (oldCat !== cat) {
            html +="<span class='"+cat+" m-station'>"+cat+"</span>";
            oldCat = cat;
          }
          html += "<span class='menu-item'>"+food+"</span>";
        }
      }
      html += "</div></div>";
    }
    oldCat = "";
    console.log(html);
    if (json.lunch) {
      html += "<div class='meal'><div class='menu_meal'>Lunch</div><div class='menu_items'>";
      for (var p in json.lunch) {
        if (json.lunch.hasOwnProperty(p)) {
          if (json.lunch[p][0] === 'Dinner') {
            break;
          }
          var item = (json.lunch[p]+"").split("] ");				
					var cat = item[0].substring(1);;
					var food = item[1];
          if (oldCat !== cat) {
            html +="<span class='"+cat+" m-station'>"+cat+"</span>";
            oldCat = cat;
          }
          html += "<span class='menu-item'>"+food+"</span>";
        }
      }
      html += "</div></div>";
    }
    oldCat = "";
    console.log(html);
    if (json.dinner) {
      html += "<div class='meal'><div class='menu_meal'>Dinner</div><div class='menu_items'>";
      for (var p in json.dinner) {
        if (json.dinner.hasOwnProperty(p)) {
          var item = (json.dinner[p]+"").split("] ");				
					var cat = item[0].substring(1);
					var food = item[1];
          if (oldCat !== cat) {
            html +="<span class='"+cat+" m-station'>"+cat+"</span>";
            oldCat = cat;
          }
          html += "<span class='menu-item'>"+food+"</span>";
        }
      }
      html += "</div></div>";
    }
    $("#menus_content").html(html);
  }
}
