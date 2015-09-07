var sketch = function( p ) {


  var particles = [];
  var maxParticles = 2000;
  var center;
  var vel = 2;
  var tick = 0;
  var tickStep = 0.001;


  var noiseScale = 0.001;
  var eps = 1;


  p.setup = function() {
    p.createCanvas(window.innerWidth-20, window.innerHeight-20);
    center = p.createVector((window.innerWidth-20)/2,
                            (window.innerHeight-20)/2);
  };


  p.draw = function() {
    p.background(0);
    p.stroke(255);
    if (particles.length < maxParticles) {
      particles.push(center.copy());
    }
    for (var i = 0; i < particles.length; i++) {
      var a = particles[i];
      wrap(a);
      var b = a.copy();
      var v = curl(a.x, a.y, tick).setMag(vel);
      a.add(v);
      p.line(b.x, b.y, a.x, a.y);
    }
    tick += tickStep;
  };


  function curl(x, y, t) {
    var n1, n2, a, b;

    n1 = p.noise(x * noiseScale, (y + eps) * noiseScale, t);
    n2 = p.noise(x * noiseScale, (y - eps) * noiseScale, t);
    a = (n1 - n2)/(2 * eps);

    n1 = p.noise((x + eps) * noiseScale, y * noiseScale, t);
    n2 = p.noise((x - eps) * noiseScale, y * noiseScale, t);
    b = (n1 - n2)/(2 * eps);

    return p.createVector(a, -b);
  }


  function wrap(v) {
    var xOffset = 0,
        yOffset = 0;
    if (v.x < 0) { xOffset = p.width; }
    else if (v.x > p.width) { xOffset = -p.width; }
    if (v.y < 0) { yOffset = p.height; }
    else if (v.y > p.height) { yOffset = -p.height; }
    v.add(p.createVector(xOffset, yOffset));  
  }
};


var myp5 = new p5(sketch);
