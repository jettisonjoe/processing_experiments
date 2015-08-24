var config = {};
config.stepCount = 0;
config.stepSize = 3;
config.yBreak = 2;

var sketch = function(p) {
  p.setup = function() {
    config.baseColor = [191,185,192];
    config.diff = 1;
    p.createCanvas(window.innerWidth-50, window.innerHeight-50);
    p.background(p.color.apply(this, config.baseColor));
  };

  p.draw = function() {
    console.log("Draw.");
    p.noStroke();
    var w = 1,
        h = 10,
        n = p.width/w,
        a = [n],
        diff = config.stepCount * config.stepSize,
        result;
    for (var i = 0; i < n; i++) {
      result = randomColorOfLuminance(diff);
      a[i] = p.color(result[0], result[1], result[2]);
    }
    a.sort(colorCompare);
    for (i = 0; i < n; i++) {
      var x = w * i,
          y = config.stepCount * (h + config.yBreak);
      p.fill(a[i]);
      p.rect(x, y, w, h);
    }
    config.stepCount++;
    if (config.stepCount * (config.yBreak + h) >= window.innerHeight-50) {
      p.noLoop();
    }
  };

  colorCompare = function(a, b) {
    return colorScore(a) - colorScore(b);
  };

  colorScore = function(c) {
    //return p.hue(c);
    var h = 1 * 255,
        s = 0 * 255,
        l = 0 * 255;
    return ((p.hue(c) * h) +
            (p.saturation(c) * s) +
            (p.lightness(c) * l));
  };

  colorLuminance = function(c) {
    return (p.red(c) * 299 + p.green(c) * 587 + p.blue(c) * 144) / 1000;
  };
};


randomColorOfLuminance = function(lum) {
  // Generates a random color of the given luminance (perceived brightness).
  // Args:
  //   lum: Desired luminance as an integer between 0 and 255.
  // Returns: A color array of the form [r, g, b].
  var mults = { r: 299, g: 587, b: 144 },  // Formula constants.
    result = { r: null, g: null, b: null },
    need = ['r', 'b', 'g'],
    curLum = 0;
    rand = Math.random();

    while (need.length > 0) {
      var i = Math.floor(Math.random() * need.length),
          gen = need.splice(i, 1),
          min, max,
          maxPoss = curLum;
      for (var j = 0; j < need.length; j++) {
        maxPoss += (mults[need[j]] * 255) / 1000;
      }
      min = Math.max((lum - maxPoss) / (mults[gen] / 1000), 0);
      max = Math.min((lum - curLum) / (mults[gen] / 1000), 255);
      result[gen] = Math.floor(Math.random() * (max - min)) + min;
    }
    return [result.r, result.g, result.b];
};


brightnessContrast = function (base, diff) {
  // Generate a color with a minimum brightness difference from a base color.
  // Args:
  //   base: A color array in the format [r, g, b].
  //   diff: A desired brightness difference between 0 and 255.
  // Returns: A color array of the form [r, g, b].
  if (diff < 0 || diff > 255) { throw "Diff out of range (0-255)."; }

    var multipliers = {r: 299, g: 587, b: 144},  // Formula constants.
        baseLum,
        candLum,
        candidate = [];
  while (true) {
    for (var i = 0; i < 3; i++) {
      candidate[i] = Math.floor(Math.random() * 255);
    }
    baseLum = (base[0] * multipliers.r +
               base[1] * multipliers.g +
               base[2] * multipliers.b) / 1000;
    candLum = (candidate[0] * multipliers.r +
               candidate[1] * multipliers.g +
               candidate[2] * multipliers.b) / 1000;
    return candidate;
  }
};

  //       rVal, gVal, bVal,
  //       key,
  //       possible,
  //       minVal,
  //       val;
  //   if (result.r !== null) {
  //     rVal = result.r;
  //   } else { rVal = 255; }
  //   if (result.g !== null) {
  //     gVal = result.g;
  //   } else { gVal = 255; }
  //   if (result.b !== null) {
  //     bVal = result.b;
  //   } else { bVal = 255; }
  //   if (mult == constants.r) {
  //     key = 'r';
  //       possible = (gVal * constants.g) + (bVal * constants.b);
  //   }
  //   else if (mult == constants.g) {
  //       key = 'g';
  //       possible = (rVal * constants.r) + (bVal * constants.b);
  //   }
  //   else if (mult == constants.b) {
  //       key = 'b';
  //       possible = (rVal * constants.r) + (gVal * constants.g);
  //   }
  //   if (possible >= minBright) {
  //       minVal = 0;
  //   } else { minVal = (minBright - possible) / mult; }
  //   val = Math.floor(Math.random() * (255 - minVal + 1) + minVal);
  //   multipliers.splice(index, 1);
  //   result[key] = val;
  // }
//   return "#" + ((1 << 24) +
//                 (result.r << 16) +
//                 (result.g << 8) + result.b).toString(16).slice(1);
// };


// Returns a hex color satisfying a given color difference.
// base is a color in the format { r: number, g: number, b: number }.
// diff is a number.
colorContrast = function (base, diff) {
    var minDiff = diff || 500,
        baseColor = base,
        baseVals = [baseColor.r, baseColor.g, baseColor.b],
        colorDiff = 0,
        result = {r: null, g: null, b: null};
    while (baseVals.length) {
        var index = Math.floor(Math.random() * baseVals.length),
            baseVal = baseVals[index],
            rDelta, gDelta, bDelta,
            key,
            possible,
            maxDelta,
            minDelta,
            delta,
            sign,
            val;
        // Determine greatest possible value deltas.
        if (result.r !== null) { rDelta = Math.abs(baseColor.r - result.r);
        } else { rDelta = Math.max(255 - baseColor.r, baseColor.r); }
        if (result.g !== null) { gDelta = Math.abs(baseColor.g - result.g);
        } else { gDelta = Math.max(255 - baseColor.g, baseColor.g); }
        if (result.b !== null) { bDelta = Math.abs(baseColor.b - result.b)
        } else { bDelta = Math.max(255 - baseColor.b, baseColor.b); }
        // Determine greatest possible diff, excluding the current value delta.
        if (baseVal == baseColor.r) {
            key = 'r';
            possible = gDelta + bDelta;
        }
        else if (baseVal == baseColor.g) {
            key = 'g';
            possible = rDelta + bDelta;
        }
        else if (baseVal == baseColor.b) {
            key = 'b';
            possible = rDelta + gDelta;
        }
        // Determine max and min delta for the current value.
        maxDelta = Math.max(255 - baseColor[key], baseColor[key]);
        if (possible > minDiff) {
            minDelta = 0;
        } else { minDelta = minDiff - possible; }
        delta = Math.floor(Math.random() * (maxDelta - minDelta + 1) + minDelta);
        // Calculate current value.
        sign = Math.random() < 0.5 ? -1 : 1;
        delta = delta * sign;
        val = baseColor[key] + delta;
        val = Math.max(Math.min(val, 255), 0);
        if (Math.abs(baseColor[key] - val) < minDelta) {
            delta = delta * -1;
            val = baseColor[key] + delta;
            val = Math.max(Math.min(val, 255), 0);
        }
        // console.log(key +": ", baseColor[key]," minDelta: ", minDelta, "maxDelta: ", maxDelta, " delta: ", delta, " value: ", val);
        baseVals.splice(index, 1);
        result[key] = val;
    }
    colorDiff = Math.abs(baseColor.r - result.r) + Math.abs(baseColor.g - result.g) + Math.abs(baseColor.b - result.b);
    return "#" + ((1 << 24) + (result.r << 16) + (result.g << 8) + result.b).toString(16).slice(1);
};


var myp5 = new p5(sketch);
