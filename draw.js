window.addEventListener('load', 
  function() { 
    alert('New page ready!');
  }, false);

window.onbeforeunload = function() {
  return "Leaving this page will reset the wizard";
};

var c = document.getElementById("myCanvas");
var ctx = c.getContext('2d');
ctx.canvas.width  = window.innerWidth- window.innerWidth*.03;
ctx.canvas.height  = window.innerHeight*10;
var brushsize =2;

    
var StartTouch = function(event) {
  event.preventDefault();
  if(event.touches.length == 1) {
    ctx.globalCompositeOperation = 'source-over';
    ctx.strokeStyle = "#3E8CEC";
    ctx.lineWidth = brushsize;
    } else {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.lineWidth = 70;
    } 
  ctx.beginPath();
};

var MoveTouch = function(event) {
  event.preventDefault();
    ctx.lineTo(event.touches[0].pageX, event.touches[0].pageY - 15);
    ctx.stroke();
};

var EndTouch = function(event) {
    event.preventDefault();
    // var img = document.getElementById("scream");
    // ctx.drawImage(img, 220, 290, 60, 60);
};

c.addEventListener("touchstart", StartTouch, false);
c.addEventListener("touchmove", MoveTouch, false);
c.addEventListener("touchend", EndTouch, false);

var snap = document.getElementById("snap");
snap.onchange=function(e){ 
  var url = URL.createObjectURL(e.target.files[0]);
  var img = new Image();
  img.onload = function() {
      ctx.drawImage(img, 0, 0, c.width, c.height);    
  }
  img.src = url;
};


function saveImage() {
  var dataURL = c.toDataURL("image/png");
  var w = window.open();
  w.document.write('<img src="'+dataURL+'"/>');
}

function saveImageDesktop() {
  var dataURL = c.toDataURL("image/png");
  let downloadLink = document.createElement('a');
  downloadLink.setAttribute('download', 'CanvasAsImage.png');
  let url = dataURL.replace(/^data:image\/png/,'data:application/octet-stream');
  downloadLink.setAttribute('href', url);
  downloadLink.click();
};


////for MOUSE DRAWING///
//Canvas
// var canvas = document.getElementById('myCanvas');
// var ctx = canvas.getContext('2d');
//Variables
var canvasx = $(c).offset().left;
var canvasy = $(c).offset().top;
var last_mousex = last_mousey = 0;
var mousex = mousey = 0;
var mousedown = false;

//Mousedown
$(c).on('mousedown', function(e) {
      last_mousex = mousex = parseInt(e.clientX-canvasx);
      last_mousey = mousey = parseInt(e.clientY-canvasy);
      mousedown = true;
});

//Mouseup
$(c).on('mouseup', function(e) {
    mousedown = false;
});

//Mousemove
$(c).on('mousemove', function(e) {
    mousex = parseInt(e.clientX-canvasx);
    mousey = parseInt(e.clientY-canvasy);
    switch (e.which) {
    case 1: // leftclick
      ctx.globalCompositeOperation = 'source-over';
            ctx.strokeStyle = "#3E8CEC";
            ctx.lineWidth = 3;
      break;
    case 2:
      alert("midde mouse click");
      break;
    case 3: //right click earser
    	e.preventDefault();
    	ctx.globalCompositeOperation = 'destination-out';
      ctx.lineWidth = 20;
      break;
    }
    if(mousedown) {
        ctx.beginPath();
        ctx.moveTo(last_mousex,last_mousey);
        ctx.lineTo(mousex,mousey);
        ctx.lineJoin = ctx.lineCap = 'round';
        ctx.stroke();
    }
    last_mousex = mousex;
    last_mousey = mousey;
    //Output
    $('#output').html('current: '+mousex+', '+mousey+'<br/>last: '+last_mousex+', '+last_mousey+'<br/>mousedown: '+mousedown);
});



