/* Haddad & Karam — interactions */
(function () {
  'use strict';
  var html = document.documentElement;

  /* ---------- i18n toggle ---------- */
  var lang = localStorage.getItem('hk-lang') || 'en';
  function applyLang(l) {
    lang = l;
    localStorage.setItem('hk-lang', l);
    html.setAttribute('lang', l);
    html.setAttribute('dir', l === 'ar' ? 'rtl' : 'ltr');
    document.querySelectorAll('[data-en]').forEach(function (el) {
      var v = el.getAttribute(l === 'ar' ? 'data-ar' : 'data-en');
      if (v !== null) el.textContent = v;
    });
    document.querySelectorAll('[data-en-ph]').forEach(function (el) {
      el.setAttribute('placeholder', el.getAttribute(l === 'ar' ? 'data-ar-ph' : 'data-en-ph') || '');
    });
    document.querySelectorAll('select option[data-en]').forEach(function (el) {
      el.textContent = el.getAttribute(l === 'ar' ? 'data-ar' : 'data-en');
    });
    document.title = l === 'ar'
      ? 'حدّاد وكرم للمحاماة — محامو الإصابات والتركات في نيويورك'
      : 'Haddad & Karam LLP — New York Injury & Estate Lawyers';
  }
  document.getElementById('langToggle').addEventListener('click', function () {
    applyLang(lang === 'en' ? 'ar' : 'en');
  });
  applyLang(lang);

  /* ---------- mobile menu ---------- */
  var menuBtn = document.getElementById('menuBtn');
  var mobileMenu = document.getElementById('mobileMenu');
  menuBtn.addEventListener('click', function () { mobileMenu.classList.toggle('hidden'); });
  mobileMenu.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () { mobileMenu.classList.add('hidden'); });
  });

  /* ---------- reveal on scroll ---------- */
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(function (el) { io.observe(el); });

  /* ---------- animated counters ---------- */
  var counted = false;
  var resultsSec = document.getElementById('results');
  var cio = new IntersectionObserver(function (entries) {
    if (entries[0].isIntersecting && !counted) {
      counted = true;
      document.querySelectorAll('.counter').forEach(function (el) {
        var target = parseInt(el.getAttribute('data-target'), 10);
        var start = null, dur = 1600;
        function step(ts) {
          if (!start) start = ts;
          var p = Math.min((ts - start) / dur, 1);
          var eased = 1 - Math.pow(1 - p, 3);
          el.textContent = Math.round(target * eased).toLocaleString('en-US');
          if (p < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
      });
      cio.disconnect();
    }
  }, { threshold: 0.35 });
  if (resultsSec) cio.observe(resultsSec);

  /* ---------- testimonial carousel ---------- */
  var slides = Array.prototype.slice.call(document.querySelectorAll('.tst-slide'));
  var dotsWrap = document.getElementById('tstDots');
  var idx = 0, timer = null;
  slides.forEach(function (_, i) {
    var d = document.createElement('button');
    d.className = 'tst-dot' + (i === 0 ? ' active' : '');
    d.setAttribute('aria-label', 'Slide ' + (i + 1));
    d.addEventListener('click', function () { go(i); restart(); });
    dotsWrap.appendChild(d);
  });
  var dots = Array.prototype.slice.call(dotsWrap.children);
  function go(i) {
    idx = (i + slides.length) % slides.length;
    slides.forEach(function (s, k) { s.classList.toggle('active', k === idx); });
    dots.forEach(function (d, k) { d.classList.toggle('active', k === idx); });
  }
  function restart() { clearInterval(timer); timer = setInterval(function () { go(idx + 1); }, 6000); }
  document.getElementById('tstPrev').addEventListener('click', function () { go(idx - 1); restart(); });
  document.getElementById('tstNext').addEventListener('click', function () { go(idx + 1); restart(); });
  restart();

  /* ---------- consultation form ---------- */
  var form = document.getElementById('consultForm');
  var msg = document.getElementById('formMsg');
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var name = form.name.value.trim();
    var phone = form.phone.value.trim();
    var caseType = form.case.value;
    var ok = name.length > 1 && phone.length > 5 && caseType !== '';
    msg.classList.remove('hidden');
    if (!ok) {
      msg.style.color = '#E9C893';
      msg.textContent = lang === 'ar'
        ? 'يرجى إكمال الاسم والهاتف ونوع القضية.'
        : 'Please complete name, phone, and case type.';
      return;
    }
    msg.style.color = '#9FE6B0';
    msg.textContent = lang === 'ar'
      ? 'شكرًا ' + name + '! سيتصل بك أحد محامينا خلال يوم عمل واحد.'
      : 'Thank you, ' + name + '! An attorney will call you within one business day.';
    form.reset();
  });

  /* ---------- back to top ---------- */
  var toTop = document.getElementById('toTop');
  window.addEventListener('scroll', function () {
    toTop.classList.toggle('show', window.scrollY > 600);
  }, { passive: true });
  toTop.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: 'smooth' }); });
})();
