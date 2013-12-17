/* Javascript for WesMaps 
 */
/* AJAX request */
var cHttpRequest;
var sHttpRequest;
var coursesJSON;
var sectionsJSON;
var COURSES_SEARCH = 'http://stumobile0.wesleyan.edu/courses/search/';
var SECTIONS_BY_ID = 'http://stumobile0.wesleyan.edu/sections/by-id/';
var sem;
var dim;
var liHeight;
var liH;
var colorDep = {
  'ASTR' : '#000000',
  'BIOL' : '#458179',
  'CHEM' : '#792200',
  'LAST' : '#790000',
  'ARCP' : '#795200',
  'CCIV' : '#7A5D00',
  'AMST' : '#707A00',
  'ARST' : '#497A00',
  'ECON' : '#307A36',
  'MATH' : '#307A51',
  'HIST' : '#307A6B',
  'GOVT' : '#30687A',
  'HEBR' : '#30517A',
  'ITAL' : '#30337A',
  'JAPN' : '#4B307A',
  'KREA' : '#62307A',
  'NS'   : '#77307A',
  'PHED' : '#7A3062',
  'SISP' : '#7A3051',
  'SPAN' : '#7A3030',
  'RUSS' : '#E00000',
  'THEA' : '#E06C00',
  'RELI' : '#E0BC00',
  'SOC'  : '#CEE000',
  'COL'  : '#86E000',
  'ARHA' : '#48E000',
  'EAST' : '#12E000',
  'E'    : '#00E024',
  'MB'   : '#00E063',
  'ANTH' : '#00E086',
  'GRST' : '#00E0D7',
  'COMP' : '#00AAE0',
  'CSS'  : '#006CE0',
  'DANC' : '#0012E0',
  'REES' : '#3600E0',
  'CHIN' : '#7D00E0',
  'CHUM' : '#BC00E0',
  'FREN' : '#E000CE',
  'CSPL' : '#E000A1',
  'GRK'  : '#E00500',
  'FIST' : '#790000',
  'SOCS' : '#790027',
  'PYSC' : '#79003F',
  'PHYS' : '#79005C',
  'HEST' : '#790079',
  'MDST' : '#610079',
  'RLIT' : '#3F0079',
  'FRST' : '#270079',
  'WRCT' : '#130079',
  'HUMS' : '#000A79',
  'ARAB' : '#001D79',
  'ALIT' : '#003579',
  'UNIV' : '#004D79',
  'SCIE' : '#005779',
  'IBST' : '#006679',
  'AFAM' : '#00796F',
  'ARTS' : '#007957',
  'PHIL' : '#007935',
  'LAT'  : '#00791D',
  'LANG' : '#00790A',
  'PRT'  : '#0F7900',
  'QAC'  : '#357900',
  'ENGL' : '#497900',
  'FILM' : '#617900',
  'FGSS' : '#797900'};
 
function startWesmaps() {
  dim = getWindowSizes();
  console.log(dim[0] + '\t' + dim[1]);

  /* Searches database for courses matching search and update dom */
  $(document).on("click","#wm_icon", function() {
    $("#wm_courses").empty();
    
    sem = $("#wm-s-f > select :selected").text().toLowerCase();

    var search = $("#wm_bar > input").val();
    var req = COURSES_SEARCH + search;

    /* AJAX request for course search */
    cHttpRequest = new XMLHttpRequest();

    if (!cHttpRequest) {
      alert("Server Request failed");
      return false;
    }

    cHttpRequest.onreadystatechange = alertCourses;
    cHttpRequest.open("GET", req, true);
    cHttpRequest.send();
    console.log('course request sent for sem '+sem);
    
    /* courses search callback */
    function alertCourses() {
      if (cHttpRequest.readyState === 4) {
        if (cHttpRequest.status === 200) {
          coursesJSON = undefined;
          coursesJSON = $.parseJSON(cHttpRequest.responseText);
          console.log("courses json received");
          writeCourses();
        }
        else {
          alert("Course request Failed");
        }
      }
    }
  });
  function writeCourses() {
    var lastCourse = 0;
    var i = 0;
    var color;
    var c;

    for (var cn in coursesJSON) {
      if (coursesJSON[cn].value) {
        console.log("JSON sem: "+coursesJSON[cn].value.courseSemester+"\t searched sem: "+sem);
        if (coursesJSON[cn].value.courseSemester.toLowerCase() === sem) {
          c = coursesJSON[cn].value;
          if (lastCourse === c.courseCourseid) {
            i++;
          }
          else {
            i = 0;
          }
          lastCourse = c.courseCourseid;
          $("#wm_courses").append("<li><div class='wm_c_dnum'>" +
                                    "<div class='wm_c_dep'>" +
                                    c.courseDepartment +
                                    "</div>" + 
                                    "<div class='wm_c_cnum'>" +
                                    c.courseNumber +
                                    "</div>" +
                                    "</div>" +
                                    "<div class='wm_c_info'>" +
                                    "<div class='wm_c_title'>" +
                                    c.courseTitle + 
                                    "</div>" +
                                    "<div class='wm_c_expand' id='wm_c_" + c.courseCourseid + "'>" +
                                    "<i class='fa fa-plus-square-o fa-3x'></i>" +
                                    "</div>" +
                                    "<div class='wm-table hidden'>" +
                                    "<table>" +
                                    "<tr>" +
                                    "<td class='wm_c_prof'></td>" +
                                    "<td class='wm_c_time'></td>" +
                                    "</tr>" + 
                                    "<tr>" +
                                    "<td class='wm_c_seats'></td>" +
                                    "<td class='wm_c_loc'></td>" +
                                    "</tr>" +
                                    "<tr>" +
                                    "<td class='wm_c_sem'>" + c.courseSemester + "</td>" +
                                    "<td class='wm_c_gea'>" + c.courseGenEdArea + "</td>" +
                                    "</tr>" +
                                    "<tr>" + 
                                    "<td><textarea class='wm_c_desc'>"+ c.courseDescription + "</textarea></td>" +
                                    "</tr>" + 
                                    "</table>" + 
                                    "</div>" +
                                    "</div>" + 
                                    "</li>"
                                  );
          $('#wm_c_' + c.courseCourseid).data('ccid', c.courseCourseid);
          $('#wm_c_' + c.courseCourseid).data('sid', i);
          
          color = colorDep[c.courseDepartment] ? colorDep[c.courseDepartment] : '#458179';
          $('#wm_c_' + c.courseCourseid).parent().parent().children('.wm_c_dnum').css('background-color', color);
        }
      }
    }
  }
  function getLiHeight() {
    return $($('li')[0]).height();
  }

  $(document).on("click",".wm_c_expand", function() {
    var that = $(this);
    var li = $(this).parent().parent();
    var info = $(this).parent();
    var tbody = info.children('.wm-table').children('table').children('tbody');

    var ccid = $(this).data().ccid ? $(this).data().ccid : 0;
    var sid = $(this).data().sid ? $(this).data().sid : 0;
    
    var sn = sem === "fall" ? 1 : sem === "spring" ? 2 : 0;
    var req = SECTIONS_BY_ID + ccid + "/" + sn;
    
    /* AJAX sections request */
    sHttpRequest = new XMLHttpRequest();
    if (!sHttpRequest) {
      alert("Failed");
      return false;
    }

    sHttpRequest.onreadystatechange = showSection;
    sHttpRequest.open("GET", req, true);
    sHttpRequest.send();
    console.log('sections request sent: '+req);

    /* Section request callback */
    function showSection() {
      if (sHttpRequest.readyState === 4) {
        if (sHttpRequest.status === 200) {
          sectionsJSON = undefined;
          sectionsJSON = $.parseJSON(sHttpRequest.responseText);
          console.log('sections json received');
          if (sid < sectionsJSON.length) {
            expandSection(sectionsJSON[sid].value);
          }
          else {
            expandSection(sectionsJSON[0].value); 
          }
        }
        else {
          alert("Sections request Failed");
        }
      }
    } 
    /* expands a course to show its section information */
    function expandSection(s) {
      var text = tbody.children('tr').children('td').children('.wm_c_desc');
      var scH = 0;
      var taH = 0;
      var loops = 0;
      liH = getLiHeight();
      liHeight = getLiHeight();
      if (that.children('i').hasClass('fa-plus-square-o')) {
        console.log("expanding course");
        tbody.children('tr').children('.wm_c_prof').html(parseProf(s.sectionProfessors)); 
        tbody.children('tr').children('.wm_c_time').html(s.sectionTime);
        tbody.children('tr').children('.wm_c_loc').html(s.sectionLocation);
        tbody.children('tr').children('.wm_c_seats').html('seats: ' + s.sectionSeats_available);

        info.children('.wm-table').removeClass('hidden');

        that.html("<i class='fa fa-minus-square-o fa-3x'></i>");
        info.addClass('wm-info-expanded');

        console.log("liH: "+liH+"\t");
        li.children('.wm_c_dnum').height(dim[1] / 10);

        scH = text[0].scrollHeight;
        taH = text.innerHeight();
        
        if (li.data().liHeight) {
          li.height(li.data().liHeight);
        }
        else {
          while (scH > (text.innerHeight())) {
            console.log('liH: '+liH+'\t');
            console.log('taH: '+taH+'\t');
            console.log('The scrollHeight '+text[0].scrollHeight+' is bigger than the textheight '+text.innerHeight());
            console.log("liHeight "+li.height());
            li.height(liHeight + 10);
            liHeight += 10;
            text.height(taH + 10);
            taH += 10;
            loops += 1;
            if (loops > 300) {
              break;
            }
            console.log("liH: "+liH+"\t");
          }
          li.height(li.height() + dim[1] / 2.5);
          li.data("liHeight", li.height());
        }
      }
      else {
        console.log("collapsing course");
        console.log("liH: "+liH+"\t");
        that.html("<i class='fa fa-plus-square-o fa-3x'></i>");
        info.removeClass('wm-info-expanded');
        info.children('.wm-table').addClass('hidden');
        console.log('collapsing liH: '+liH+'\t');
        li.height(dim[1] / 10);
      }
    }
  });
}

/* Parses string from course JSON in the form
  {instructor=\u003eemoran, first_name=\u003eEdward, last_name=\u003eMoran}
*/
function parseProf (prof) {
  var fName;
  var lName;
  var m;
  var re = /.*?\u003e(.*?),.*?\u003e(.*?),.*?\u003e(.*?)\}/;
  if (re.test(prof)) {
    m = re.exec(prof);
    fName = m[2];
    lName = m[3];
    return fName + ' ' + lName;
  }
  else {
    return prof;
  }
}

/* Gets screen dimensions */
function getWindowSizes() {
  var windowHeight = 0, windowWidth = 0;
  if (typeof (window.innerWidth) == 'number') {
    windowHeight = window.innerHeight;
    windowWidth = window.innerWidth;
  } 
  else if (document.documentElement && (document.documentElement.clientWidth || document.documentElement.clientHeight)) {
    windowHeight = document.documentElement.clientHeight;
    windowWidth = document.documentElement.clientWidth;
  } 
  else if (document.body && (document.body.clientWidth || document.body.clientHeight)) {
    windowHeight = document.body.clientHeight;
    windowWidth = document.body.clientWidth;
  }
  return [windowWidth, windowHeight];
}
