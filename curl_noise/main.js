var sketch = function( p ) {


  var particles = [];
  var maxParticles = 2000;
  var emitter;
  var vel = 2;


  p.setup = function() {
    p.createCanvas(window.innerWidth-20, window.innerHeight-20);
    emitter = p.createVector((window.innerWidth-20)/2,
                            (window.innerHeight-20)/2);
    p.background(0);
  };


  p.draw = function() {
    p.background(0);
    p.stroke(255);
    if (particles.length < maxParticles) {
      particles.push(emitter.copy());
    }
    for (var i = 0; i < particles.length; i++) {
      var a = particles[i];
      wrap(a);
      var b = a.copy();
      var v = curl(a.x + 100, a.y + 100, p.frameCount).setMag(vel);
      a.add(v);
      p.line(b.x, b.y, a.x, a.y);
    }
  };


  function curl(x, y, t) {
    var noiseScale = 0.001,
        tScale = 0.001,
        eps = 1,
        n1, n2, a, b;

    n1 = p.noise(x * noiseScale, (y + eps) * noiseScale, t * tScale);
    n2 = p.noise(x * noiseScale, (y - eps) * noiseScale, t * tScale);
    a = (n1 - n2)/(2 * eps);

    n1 = p.noise((x + eps) * noiseScale, y * noiseScale, t * tScale);
    n2 = p.noise((x - eps) * noiseScale, y * noiseScale, t * tScale);
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
