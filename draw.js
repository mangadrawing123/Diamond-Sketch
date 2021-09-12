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
ctx.canvas.height  = window.innerHeight*6;
var brushsize =2;
var brushSizeEraser = 50;

///Asign shift key to be eraser
var isKeyPressed= function (event) {
  if (event.shiftKey) {
    ctx.globalCompositeOperation = 'destination-out';
    ctx.lineWidth = brushSizeEraser;
    ctx.beginPath();
  }
}
    
var StartTouch = function(event) {
  // event.preventDefault();
  if(event.touches.length == 1) {
    ctx.globalCompositeOperation = 'source-over';
    ctx.strokeStyle = "#3E8CEC";
    ctx.lineWidth = brushsize;
    } else if (event.shiftKey){
      ctx.globalCompositeOperation = 'destination-out';
      ctx.lineWidth = brushSizeEraser;
    } else {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.lineWidth = brushSizeEraser;
    }
  ctx.beginPath();
};

var MoveTouch = function(event) {
  event.preventDefault();
    ctx.lineTo(event.touches[0].pageX, event.touches[0].pageY-15);
    ctx.stroke();
};

var EndTouch = function(event) {
    event.preventDefault();
};


c.addEventListener("touchstart", StartTouch, false);
c.addEventListener("touchmove", MoveTouch, false);
c.addEventListener("touchend", EndTouch, false);
c.addEventListener("touchstart", isKeyPressed, false);

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


