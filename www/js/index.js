/* Index page javascript
 */
function startApp() {
  console.log('app started');
  var firstAppInstance = new Date();
  var first_events_visit = true;
  var firstMenusVisit = true;
  var firstLandmarksVisit = true;
  var appLifeTime = 10; //this is the number of minutes after which the app will refresh upon next open

  /* Links buttons */
  $(document).on("click", ".goto_page",function(e) {
    e.preventDefault();
    console.log("page change");
    console.log($(this).attr('value'));
    if ($(this).attr('value') === "home") {
      $(".page").addClass("hidden");
      $("#home").removeClass("hidden");
      resetBorders();
    }
    else if ($(this).attr('value') === "wesmaps") {
      $(".page").addClass("hidden");
      $("#wesmaps").removeClass("hidden");
                 console.log("wmps in index");
                 startWesmaps();
    }
    else if ($(this).attr('value') === "wm_schedule") {
      $(".page").addClass("hidden");
      $("#wm_schedule").removeClass("hidden");
    }
    else if ($(this).attr('value') === "events") {
      $(".page").addClass("hidden");
      $("#events").removeClass("hidden");
      if (first_events_visit === true){
        startEvents();
        first_events_visit = false;
      }
    }
    else if ($(this).attr('value') === "events_list") {
      $(".page").addClass("hidden");
      $("#events_list").removeClass("hidden");
    }
    else if ($(this).attr('value') === "events_read_more") {
      $(".page").addClass("hidden");
      $("#events_read_more").removeClass("hidden");
    }
    else if ($(this).attr('value') === "menus") { 
      firstMenusVisit ? startMenus() : function(){};
      firstMenusVisit = false;
      $(".page").addClass("hidden");
      $("#menus").removeClass("hidden");
    }
    else if ($(this).attr('value') === "donate") {
      $(".page").addClass("hidden");
      $("#donate").removeClass("hidden");
      startDonate();
    }
    else if ($(this).attr('value') === "landmarks") {
      firstLandmarksVisit ? startLandmarks() : function(){};
      firstLandmarksVisit = false;
      $(".page").addClass("hidden");
      $("#landmarks").removeClass("hidden");
    }
    // else if (first_events_visit === true) {
    //   // $("#event_nav")[0].addEventListener("click", function() {
      
    //   console.log("starting maps");
    // }
  });

  /* Back button listener */
  var backListen = function() {
    console.log("back button hit");
    $($(".wm-go-home > a")[0]).click();
  };
  
    function onResume(){
        //refresh the app after 10 minutes (only during app-resume).
        var now = new Date();
        console.log(firstAppInstance);
        var diff = (now-firstAppInstance)/60/60/60; //converting to minutes
        if (diff > appLifeTime){
            console.log("Refreshing app");
            document.location.reload();
        }
        else{
            console.log("not refreshing",appLifeTime-diff,"minutes to go");
        }
    }
    
    document.addEventListener("backbutton", backListen, false);
    document.addEventListener("resume", onResume, false);
}
