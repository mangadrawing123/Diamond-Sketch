    var c = document.getElementById("myCanvas");
    var ctx = c.getContext('2d');
    ctx.canvas.width  = window.innerWidth- window.innerWidth*.06;
    ctx.canvas.height  = window.innerHeight*5;
    var brushsize =1;

    
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

    function red_color() {
        ctx.strokeStyle = "red";
    }

    function green_color() {
        ctx.strokeStyle = "green";
    }

    function blue_color() {
        ctx.strokeStyle = "blue";
    }

    function brushplus() {
        brushsize++;
        brushsize++;
        ctx.lineWidth = brushsize;
    }

    function brushminus() {
        brushsize--;
        brushsize--;
        ctx.lineWidth = brushsize;
    }

    function clearContent() {
        var w = c.width;
        c.width = 10;
        c.width = w;
    }

    c.addEventListener("touchstart", StartTouch, false);
    c.addEventListener("touchmove", MoveTouch, false);
    c.addEventListener("touchend", EndTouch, false);

    // var snap = document.getElementById("snap");
    // snap.onchange=function(e){ 
    // var url = URL.createObjectURL(e.target.files[0]);
    // var img = new Image();
    // img.onload = function() {
    //     ctx.drawImage(img, 0, 0, c.width, c.height);    
    // }
    // img.src = url;
    // };

   
  function saveImage() {
    var dataURL = c.toDataURL("image/png");
    var w = window.open();
    w.document.write('<img src="'+dataURL+'"/>');
  }
