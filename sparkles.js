(function () {
  var SPARKLES = ["✨", "⭐", "💫", "🌟"];
  var last = 0;

  document.addEventListener("mousemove", function (e) {
    var now = Date.now();
    if (now - last < 60) return;
    last = now;
    var el = document.createElement("span");
    el.className = "floaty-sparkle";
    el.textContent = SPARKLES[Math.floor(Math.random() * SPARKLES.length)];
    el.style.left = e.clientX + "px";
    el.style.top = e.clientY + "px";
    el.style.animationDuration = (0.8 + Math.random() * 0.6) + "s";
    document.body.appendChild(el);
    setTimeout(function () { el.remove(); }, 1500);
  });

  window.blastConfetti = function () {
    var COLORS = ["#7ee787", "#58a6ff", "#f2cc60", "#ff7ee7", "#ff6b6b"];
    for (var i = 0; i < 80; i++) {
      var p = document.createElement("span");
      p.className = "confetti-piece";
      p.style.left = Math.random() * 100 + "vw";
      p.style.width = p.style.height = (4 + Math.random() * 6) + "px";
      p.style.background = COLORS[Math.floor(Math.random() * COLORS.length)];
      p.style.animationDuration = (1.5 + Math.random() * 1.5) + "s";
      document.body.appendChild(p);
      (function (el) { setTimeout(function () { el.remove(); }, 3200); })(p);
    }
  };
})();
