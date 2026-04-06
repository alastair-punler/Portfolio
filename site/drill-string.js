(function () {
  var drillString = document.querySelector('.drill-string');
  var drillPipe   = document.querySelector('.drill-pipe');
  var rigImg      = document.querySelector('.rig-placeholder > img');
  var bhaImg      = document.querySelector('.bha-sprite');

  if (!drillString || !drillPipe || !rigImg) return;

  var MAX_DEPTH    = 1500;
  var LERP_SPEED   = 0.04;  // 0-1, lower = slower catch-up
  var currentPipe  = 0;
  var targetPipe   = 0;
  var animating    = false;

  function getTarget() {
    var rigRect  = rigImg.getBoundingClientRect();
    var rigBot   = rigRect.bottom;
    var rigCentX = rigRect.left + rigRect.width / 2;
    var seabedY  = window.innerHeight * 0.56;
    var bhaH     = bhaImg ? bhaImg.getBoundingClientRect().height : 0;
    var minPipe  = Math.max(0, seabedY - rigBot - bhaH);

    var scrollY   = window.scrollY || window.pageYOffset;
    var docHeight = document.documentElement.scrollHeight - window.innerHeight;
    var progress  = docHeight > 0 ? Math.min(scrollY / docHeight, 1) : 0;

    targetPipe = minPipe + progress * MAX_DEPTH;

    // Cap so BHA stays in viewport
    var maxPipe = window.innerHeight - (rigBot - 10) - bhaH;
    if (targetPipe > maxPipe) targetPipe = maxPipe;

    // Position the container
    drillString.style.top  = (rigBot - 10) + 'px';
    drillString.style.left = rigCentX + 'px';
    drillString.style.transform = 'translateX(-50%)';
  }

  function tick() {
    // Lerp toward target
    var diff = targetPipe - currentPipe;
    if (Math.abs(diff) < 0.5) {
      currentPipe = targetPipe;
      animating = false;
    } else {
      currentPipe += diff * LERP_SPEED;
      animating = true;
      requestAnimationFrame(tick);
    }
    drillPipe.style.height = Math.round(currentPipe) + 'px';
  }

  function update() {
    getTarget();
    if (!animating) {
      animating = true;
      requestAnimationFrame(tick);
    }
  }

  // Jump to initial position instantly (no lerp on load)
  function init() {
    getTarget();
    currentPipe = targetPipe;
    drillPipe.style.height = Math.round(currentPipe) + 'px';
  }

  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', init, { passive: true });

  init();
  window.addEventListener('load', function () {
    init();
    setTimeout(init, 100);
  });
})();
