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

  // Cached anchor values — set on init/resize, never during scroll.
  // This prevents mobile browsers drifting the drill string during
  // momentum scroll (getBoundingClientRect fluctuates mid-scroll on mobile).
  var cachedRigBot  = 0;
  var cachedRigCentX = 0;
  var cachedBhaH    = 0;
  var cachedMinPipe = 0;

  function cacheRigPosition() {
    var rigRect    = rigImg.getBoundingClientRect();
    cachedRigBot   = rigRect.bottom;
    cachedRigCentX = rigRect.left + rigRect.width / 2;
    cachedBhaH     = bhaImg ? bhaImg.getBoundingClientRect().height : 0;
    cachedMinPipe  = Math.max(0, window.innerHeight * 0.56 - cachedRigBot - cachedBhaH);

    // Fix the container position once — scroll only changes pipe height
    drillString.style.top       = (cachedRigBot - 10) + 'px';
    drillString.style.left      = cachedRigCentX + 'px';
    drillString.style.transform = 'translateX(-50%)';
  }

  function getTarget() {
    var scrollY   = window.scrollY || window.pageYOffset;
    var docHeight = document.documentElement.scrollHeight - window.innerHeight;
    var progress  = docHeight > 0 ? Math.min(scrollY / docHeight, 1) : 0;

    var maxDepth = window.innerWidth <= 820 ? 700 : MAX_DEPTH;
    targetPipe = cachedMinPipe + progress * maxDepth;

    // Cap so BHA stays in viewport
    var maxPipe = window.innerHeight - (cachedRigBot - 10) - cachedBhaH;
    if (targetPipe > maxPipe) targetPipe = maxPipe;
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
    cacheRigPosition();
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
