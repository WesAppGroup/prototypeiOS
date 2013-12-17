(function() {
  
  var searchListen = function() {
    console.log("search button clicked");
    /* Search bar for wesmaps page */
    if (!$("#wesmaps").hasClass("hidden")) {
      console.log("submitting search to wesmaps");
      $("#wm_icon").click();
    }
    /* search bar for landmarks page */
    else if (!$("#landmarks").hasClass("hidden")) {
      console.log("submitting search to landmarks");
      $("#landmarks_icon").click();
    }
  };
  var onDeviceReady = function() {
		console.log('device ready');
    startApp();
    // startEvents();
    startWesmaps();
    startHours();
    /* Search bar listener */
    document.addEventListener("searchbutton", searchListen, false);
  };

  // IF DEVELOPING ON LOCAL ENABLE FIRST THING HERE
  // $(document).ready(onDeviceReady)
  document.addEventListener("deviceready", onDeviceReady, false);
})();
