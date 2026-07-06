(function () {
  var canvas = document.createElement("canvas");
  canvas.id = "bg-fx";
  document.body.prepend(canvas);
  var ctx = canvas.getContext("2d");

  var W, H, particles;
  var COLORS = ["#7ee787", "#58a6ff", "#f2cc60"];

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function makeParticles(n) {
    var arr = [];
    for (var i = 0; i < n; i++) {
      arr.push({
        x: Math.random() * W,
        y: Math.random() * H,
        r: Math.random() * 1.6 + 0.4,
        vx: (Math.random() - 0.5) * 0.15,
        vy: (Math.random() - 0.5) * 0.15,
        c: COLORS[i % COLORS.length],
        a: Math.random() * 0.5 + 0.15
      });
    }
    return arr;
  }

  function step() {
    ctx.clearRect(0, 0, W, H);
    for (var i = 0; i < particles.length; i++) {
      var p = particles[i];
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0) p.x = W;
      if (p.x > W) p.x = 0;
      if (p.y < 0) p.y = H;
      if (p.y > H) p.y = 0;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.c;
      ctx.globalAlpha = p.a;
      ctx.fill();
    }
    ctx.globalAlpha = 1;

    // faint connecting lines for nearby particles
    ctx.strokeStyle = "rgba(88, 166, 255, 0.08)";
    for (var i = 0; i < particles.length; i++) {
      for (var j = i + 1; j < particles.length; j++) {
        var a = particles[i], b = particles[j];
        var dx = a.x - b.x, dy = a.y - b.y;
        var d2 = dx * dx + dy * dy;
        if (d2 < 120 * 120) {
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(step);
  }

  if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    resize();
    particles = makeParticles(Math.min(70, Math.floor((W * H) / 18000)));
    window.addEventListener("resize", function () {
      resize();
      particles = makeParticles(Math.min(70, Math.floor((W * H) / 18000)));
    });
    requestAnimationFrame(step);
  }
})();
