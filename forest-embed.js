/* A Forest of Reversals: parent-page script. Pins the scroll sections and reports scroll position to them. */
(function () {
  var charts = [];
  function find(win) { for (var i = 0; i < charts.length; i++) { if (charts[i].contentWindow === win) return charts[i]; } var f = document.querySelectorAll('iframe'); for (var j = 0; j < f.length; j++) { if (f[j].contentWindow === win) return f[j]; } return null; }
  function size(f) {
    var w = f.parentElement;
    if (typeof f._len === 'number') w.style.setProperty('height', (window.innerHeight + Math.round(f._len)) + 'px', 'important');
    else w.style.setProperty('height', '230vh', 'important');
  }
  function setup(f, d) {
    if (typeof d.len === 'number') f._len = d.len;
    if (!f.dataset.plfForest) {
      f.dataset.plfForest = '1';
      var w = f.parentElement;
      w.style.setProperty('position', 'relative', 'important');
      f.style.setProperty('position', 'sticky', 'important');
      f.style.setProperty('top', '0', 'important');
      f.style.setProperty('height', '100vh', 'important');
      f.style.setProperty('height', '100svh', 'important');
      f.style.setProperty('min-height', '0', 'important');
      charts.push(f);
    }
    size(f); f._p = undefined;
    var vh = window.innerHeight, r = f.parentElement.getBoundingClientRect(), span = r.height - vh;
    f._p = span > 0 ? Math.max(0, Math.min(1, -r.top / span)) : 0;
    f.contentWindow.postMessage({ plf: 'forest', p: f._p }, '*');
  }
  function resize(f, d) {
    var w = f.parentElement, vh = window.innerHeight, r = w.getBoundingClientRect(), inside = r.top < 0 && r.bottom > vh;
    var p = r.height > vh ? Math.max(0, Math.min(1, -r.top / (r.height - vh))) : 0, absTop = window.pageYOffset + r.top;
    f._len = d.len; size(f);
    if (inside) { var nh = w.getBoundingClientRect().height; window.scrollTo(0, absTop + (d.reset ? 0 : p) * Math.max(0, nh - vh)); }
    f._p = undefined; send();
  }
  window.addEventListener('message', function (e) {
    var d = e.data; if (!d || typeof d.plf !== 'string') return;
    var f = find(e.source); if (!f) return;
    if (d.plf === 'plf-height' && typeof d.h === 'number' && !f.dataset.plfForest) {
      f.style.setProperty('height', Math.ceil(d.h) + 'px', 'important');
      f.style.setProperty('min-height', '0', 'important');
      var pw = f.parentElement; if (pw) { pw.style.setProperty('height', 'auto', 'important'); pw.style.setProperty('min-height', '0', 'important'); }
      q(); return;
    }
    if (d.plf === 'forest-hello') setup(f, d);
    else if (!f.dataset.plfForest) return;
    else if (d.plf === 'forest-size' && typeof d.len === 'number') resize(f, d);
    else if (d.plf === 'forest-scroll' && typeof d.dy === 'number') window.scrollBy({ top: d.dy, behavior: d.smooth ? 'smooth' : 'auto' });
    else if (d.plf === 'forest-skip') skip(f);
  });
  function skip(f) {
    var target = document.getElementById('where-it-stands');
    var w = f.parentElement, wEnd = w.getBoundingClientRect().bottom + window.pageYOffset;
    var y = target ? target.getBoundingClientRect().top + window.pageYOffset : wEnd;
    if (y < wEnd) y = wEnd;
    window.scrollTo({ top: Math.max(0, y), behavior: 'auto' });
  }
  var queued = false;
  function send() {
    queued = false;
    var vh = window.innerHeight;
    charts.forEach(function (f) {
      var r = f.parentElement.getBoundingClientRect(), span = r.height - vh;
      if (r.bottom < -vh || r.top > 2 * vh) return;
      var p = span > 0 ? Math.max(0, Math.min(1, -r.top / span)) : 1;
      if (f._p !== undefined && Math.abs(f._p - p) < 0.00002) return;
      f._p = p; f.contentWindow.postMessage({ plf: 'forest', p: p }, '*');
    });
  }
  function q() { if (!queued) { queued = true; requestAnimationFrame(send); } }
  window.addEventListener('scroll', q, { passive: true });
  window.addEventListener('resize', function () { charts.forEach(size); q(); });
})();
