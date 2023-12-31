console.log(
  "Hello there! Thank you for visiting my website. If you are looking for the source code, it can be found at: https://github.com/AdityaPrakash-26/AdityaPrakash-26.github.io"
);
console.log(
  "Feel free to report bugs and share your feedback. Hope to see you on my repo! :D"
);

// Tracking
var pos_x = 0,
  pos_y = 0;

// check whether tha url has a particular panel
function checkUrl(url) {
  if (url.indexOf("#") > -1) {
    var panel = url.split("#")[1];
    if (panel == "about") {
      pos_x = 1;
      pos_y = 0;
    } else if (panel == "skills") {
      pos_x = 1;
      pos_y = 1;
    } else if (panel == "work") {
      pos_x = 0;
      pos_y = 1;
    } else if (panel == "projects") {
      pos_x = -1;
      pos_y = 1;
    } else if (panel == "education") {
      pos_x = -1;
      pos_y = 0;
    } else if (panel == "contact") {
      pos_x = -1;
      pos_y = -1;
    } else if (panel == "testimonials") {
      pos_x = 0;
      pos_y = -1;
    } else if (panel == "hobbies") {
      pos_x = 1;
      pos_y = -1;
    }
    setPos();
  }
}

//hide the address bar
window.addEventListener("load", function () {
  setTimeout(function () {
    window.scrollTo(0, 1);
  }, 0);
  checkUrl(window.location.href);
});

// Global
var win = window,
  doc = document;

// Global Functions

function hasClass(el, cls) {
  return el.className.match(new RegExp("(\\s|^)" + cls + "(\\s|$)"));
}

function addClass(el, cls) {
  if (!this.hasClass(el, cls)) {
    el.className += " " + cls;
  }
}

function removeClass(el, cls) {
  if (this.hasClass(el, cls)) {
    var reg = new RegExp("(\\s|^)" + cls + "(\\s|$)");
    el.className = el.className.replace(reg, " ");
  }
}

// Elements

var site = doc.getElementsByClassName("site-wrap")[0];
var wrap = doc.getElementsByClassName("panel-wrap")[0];

var panel = doc.getElementsByClassName("panel");

var zoom = doc.getElementsByClassName("js-zoom");

var nav_up = doc.getElementsByClassName("js-up"),
  nav_left = doc.getElementsByClassName("js-left"),
  nav_right = doc.getElementsByClassName("js-right"),
  nav_down = doc.getElementsByClassName("js-down"),
  nav_left_twice = doc.getElementsByClassName("js-left-twice");

function setPos() {
  wrap.style.transform =
    "translateX(" + pos_x + "00%) translateY(" + pos_y + "00%)";
  setTimeout(function () {
    removeClass(wrap, "animate");
  }, 600);
}

setPos();

function moveUp() {
  addClass(wrap, "animate");
  pos_y++;
  setPos();
}

function moveLeft() {
  addClass(wrap, "animate");
  pos_x++;
  setPos();
}

function moveLeftTwice() {
  addClass(wrap, "animate");
  pos_x += 2;
  setPos();
}

function moveDownTwice() {
  addClass(wrap, "animate");
  pos_y -= 2;
  setPos();
}

function moveRight() {
  addClass(wrap, "animate");
  pos_x--;
  setPos();
}

function moveDown() {
  addClass(wrap, "animate");
  pos_y--;
  setPos();
}

for (var x = 0; x < nav_up.length; x++) {
  nav_up[x].addEventListener("click", moveUp);
}

for (var x = 0; x < nav_left.length; x++) {
  nav_left[x].addEventListener("click", moveLeft);
}

for (var x = 0; x < nav_left_twice.length; x++) {
  nav_left_twice[x].addEventListener("click", moveLeftTwice);
}

for (var x = 0; x < nav_right.length; x++) {
  nav_right[x].addEventListener("click", moveRight);
}

for (var x = 0; x < nav_down.length; x++) {
  nav_down[x].addEventListener("click", moveDown);
}

for (var x = 0; x < zoom.length; x++) {
  zoom[x].addEventListener("click", zoomOut);
}

function zoomOut(e) {
  e.stopPropagation();
  addClass(site, "show-all");
  pos_x = 0;
  pos_y = 0;
  setPos();
  for (var x = 0; x < panel.length; x++) {
    (function (_x) {
      panel[_x].addEventListener("click", setPanelAndZoom);
    })(x);
  }
  // remove zoom out event listener
  for (var x = 0; x < zoom.length; x++) {
    zoom[x].removeEventListener("click", zoomOut);
  }

  for (var x = 0; x < zoom.length; x++) {
    zoom[x].addEventListener("click", zoomIn);
  }

  // change the icon
  removeClass(doc.getElementById("zoom-icon"), "fa-search-minus");
  addClass(doc.getElementById("zoom-icon"), "fa-search-plus");
}

function setPanelAndZoom(e) {
  (pos_x = -e.target.getAttribute("data-x-pos")),
    (pos_y = e.target.getAttribute("data-y-pos"));
  setPos();
  zoomIn();
}

function zoomIn() {
  for (var x = 0; x < panel.length; x++) {
    panel[x].removeEventListener("click", setPanelAndZoom);
  }
  removeClass(site, "show-all");

  // remove zoom in event listener
  for (var x = 0; x < zoom.length; x++) {
    zoom[x].removeEventListener("click", zoomIn);
  }

  for (var x = 0; x < zoom.length; x++) {
    zoom[x].addEventListener("click", zoomOut);
  }

  // change the icon
  removeClass(doc.getElementById("zoom-icon"), "fa-search-plus");
  addClass(doc.getElementById("zoom-icon"), "fa-search-minus");
}

function changeState() {
  var mobileStateOne = doc.getElementById("mobile-state-one");
  var mobileStateTwo = doc.getElementById("mobile-state-two");

  if (mobileStateOne.style.display === "none") {
    mobileStateOne.style.display = "block";
    mobileStateTwo.style.display = "none";
  } else {
    mobileStateOne.style.display = "none";
    mobileStateTwo.style.display = "block";
  }
}

function isOverflown(element) {
  return element.scrollHeight > element.clientHeight;
}

var paraHolders = document.getElementsByClassName("paraHolder");

for (var i = 0; i < paraHolders.length; i++) {
  var para = paraHolders[i];
  if (isOverflown(para)) {
    para.classList.add("scrollbarStyle");
  }
}

function toggleDescription(id) {
  if (
    !document.getElementById(id).style.display ||
    document.getElementById(id).style.display === "none"
  ) {
    document.getElementById(id).style.display = "block";
    document.getElementById(`${id}-toggle-arrow-up`).style.display =
      "inline-block";
    document.getElementById(`${id}-toggle-arrow-down`).style.display = "none";
  } else {
    document.getElementById(id).style.display = "none";
    document.getElementById(`${id}-toggle-arrow-up`).style.display = "none";
    document.getElementById(`${id}-toggle-arrow-down`).style.display =
      "inline-block";
  }
}
