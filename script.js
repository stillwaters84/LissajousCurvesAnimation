//for any browser
window.requestAnimFrame = (function () {
  return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function (callback) {
      window.setTimeout(callback, 1000 / 60);
  };
})();

//jQuery methods on loading and settings of curve
//freqA = a, freqB = b in Chebyshev Polynom - changing it will create different curves
//alpha is needed to change colors
$(document).ready(function () {
  settings = {
      stepsize: 0.025,
      maxheight: 2,
      trailsize: 300,
      decay: 0.1,
      alpha: 0.5,
      freqA: 5,
      freqB: 4
  };
  var deg2rad = function (angle) {
      return (angle / 180) * Math.PI;
  }
  var colorfreq = function (i) {
      var frequency = 2;
      i = i % 32;
      var red = Math.ceil(Math.sin(frequency * i + 0) * 127 + 128);
      var green = Math.ceil(Math.sin(frequency * i + 2) * 127 + 128);
      var blue = Math.ceil(Math.sin(frequency * i + 4) * 127 + 128);
      return "rgba(" + red + "," + green + "," + blue + "," + settings.alpha + ")";
  }

  //120 and +200 for scaling
  var x = function (t, ps) {
      return 120 * Math.cos(settings.freqA * t) + 200
  }
  var y = function (t, ps) {
      return 120 * Math.sin(settings.freqB * t) + 200
  }

  //draw dot
  var dot = function (ctx, x, y, offset) {
      ctx.save();
      ctx.fillRect(20 + x, 20 + y, 0.5 + (offset / 32) * settings.maxheight, 0.5 + (offset / 32) * settings.maxheight);
      ctx.restore();
  }

  //offset is needed to change thickness of a line
  var ctx = document.getElementById("lissajous0.1").getContext('2d');
  var offset = 0;
  (function animloop() {
      offset = (offset + 1) % 360;
      requestAnimFrame(animloop);
      ctx.fillStyle = "rgba(0,0,0," + settings.decay + ")";
      ctx.fillRect(0, 0, 500, 500);
      var v = Math.ceil(Math.abs(Math.sin(deg2rad(offset)) * 32));
      ctx.fillStyle = colorfreq(v);//"rgba(98,200,137,1)";
      for (i = offset; i < settings.trailsize + offset; i += settings.stepsize) {
          dot(ctx, x(deg2rad(i), v), y(deg2rad(i), v), v);
      }
  })();
});