var sketch = function( p ) {


  var particles = [];
  var polarities =[];
  var maxParticles = 2000;
  var maxSpeed = 2;
  var barrier;
  var barrierSize;
  var emitter;


  p.setup = function() {
    p.createCanvas(window.innerWidth-20, window.innerHeight-20);
    barrier = p.createVector(p.width/2, p.height/2);
    barrierSize = p.min(p.width - 50, p.height - 50);
    emitter = p.createVector(p.width/2, p.height/2);
    p.background(0);

    // Uncomment the following to initialize the particle field to a grid:
    //////////////////////////////////////////////////////////////////////
    //
    // var res = 20;
    // for (var i=0; i<p.width; i += res) {
    //   for (var j=0; j<p.height; j += res) {
    //     particles.push(p.createVector(i+.5*res, j+.5*res));
    //   }
    // }
    //
    //////////////////////////////////////////////////////////////////////
  };


  p.draw = function() {

    // Uncomment the following for static visualization mode:
    /////////////////////////////////////////////////////////
    //
    // if (p.frameCount >= 8) { p.noLoop(); }
    //
    /////////////////////////////////////////////////////////

    // Uncomment the following for dymanic visualization mode:
    //////////////////////////////////////////////////////////
    //
    p.background(0);
    if (particles.length < maxParticles) {
      particles.push(emitter.copy());
      polarities.push(1);
    }
    //
    //////////////////////////////////////////////////////////

    p.stroke(255, 255, 255, 64);
    p.fill(0, 0, 0, 0);
    p.ellipse(barrier.x, barrier.y, barrierSize, barrierSize);

    for (var i = 0; i < particles.length; i++) {
      var a = particles[i];
      var v = curl(a.x, a.y, p.frameCount).setMag(maxSpeed);
      v.mult(polarities[i]);
      a.add(v);
      wrap(a, i);
      p.stroke(255);
      p.point(a.x, a.y);
    }
  };


  function curl(x, y, t) {
    var eps = 1,
        n1, n2, a, b;

    n1 = conPot(x, (y + eps), t);
    n2 = conPot(x, (y - eps), t);
    a = (n1 - n2)/(2 * eps);

    n1 = conPot((x + eps), y, t);
    n2 = conPot((x - eps), y, t);
    b = (n1 - n2)/(2 * eps);

    return p.createVector(a, -b);
  }


  function pot(x, y, t) {
    var scale = 0.001;
    return p.noise(x*scale, y*scale, t*scale);
  }


  function conPot(x, y, t) {
    return pot(x, y, t) * ramp(x, y);
  }


  function ramp(x, y) {
    var v = barrier.copy();
    v.sub(x, y);
    var d = v.mag()-barrierSize/2;
    var L = 0.001;
    var r = d/L;
    if (r >= 1) { return 1; }
    if (r <= -1) { return -1; }
    return (15/8)*r - (10/8)*Math.pow(r, 3) + (3/8)*Math.pow(r, 5);
  }

  function wrap(v, i) {
    var d = p5.Vector.sub(barrier, v);
    if (d.mag() >= barrierSize/2) {
      d.setMag(maxSpeed + 1);
      v.add(d);
      polarities[i] *= -1;
    }
  }
};


var myp5 = new p5(sketch);
