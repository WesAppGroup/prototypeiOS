function startHours() {
	console.log("starting hours");

  /* Listener to hide and show menus or hours */
 $("#menus-link").on("click",function() {
    $("#hours_content").addClass("hidden");
    $("#menus_content").removeClass("hidden");
    $("#menus-link").removeClass("inactive-link");
    $("#hours-link").addClass("inactive-link");
  });
  $("#hours-link").on("click", function() {
    $("#hours-link").removeClass("inactive-link");
    $("#menus-link").addClass("inactive-link");
    $("#menus_content").addClass("hidden");
    $("#hours_content").removeClass("hidden");
  });




	var hours_div = document.createElement("div");
	var hours_ul = document.createElement("ul");
	hours_ul.setAttribute("class", "hours_ul")
	var names = Object.keys(hours_data);
	names.forEach(function(item) {
		var obj = hours_data[item];
		var title = document.createElement("div");
		title.innerHTML = item
		title.setAttribute("id", "hours_title");
		var hr = document.createElement("hr");
		hr.setAttribute("class", "hours_hr");
		hr.setAttribute("id", obj.category)

		var hours = document.createElement("div");
		hours.setAttribute("class", "hours_label");
		hours_extra = document.createElement("div");
		hours_extra.setAttribute("class", "hours_extra");
		hours_extra.innerHTML = "Hours:";
		hours.appendChild(hours_extra);
		if (!(obj.hours == undefined)) {
			obj.hours.forEach(function(time) {
				var ul = document.createElement("ul");
				ul.setAttribute("class", "hour-hour");
				var ul_div = document.createElement("div");
				ul_div.setAttribute("class", "hour-hour-div");
				ul_div.innerHTML = time;
				ul.appendChild(ul_div);
				hours.appendChild(ul);
			});
		}

		var info = document.createElement("div");
		if (!(obj.info == undefined)) {
			info_extra = document.createElement("div");
			info_extra.setAttribute("class", "hours_extra");
			info_extra.innerHTML = "Info:";
			info.appendChild(info_extra);
			obj.info.forEach(function(thing) {
				var ul = document.createElement("ul");
				ul.setAttribute("class", "hour-info");
				var ul_div = document.createElement("div");
				ul_div.setAttribute("class", "hours_label");
				ul_div.innerHTML = thing;
				ul.appendChild(ul_div);
				info.appendChild(ul);
			});
		}
		var place = document.createElement("div");
		// place.setAttribute("id",obj.category);
		place.setAttribute("class", "hour_class")
		place.appendChild(title);
		place.appendChild(hr);
		place.appendChild(hours);
		place.appendChild(info);
		hours_ul.appendChild(place);
	});
	hours_div.appendChild(hours_ul)
	$("#hours_content").html(hours_div);
}
