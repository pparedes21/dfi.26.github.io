// Countdown Timer — sessão de 24h gravada no localStorage
(function () {
    var KEY = 'dfi_offer_expiry';
    var DURATION = 24 * 60 * 60 * 1000;
    var expiry = parseInt(localStorage.getItem(KEY), 10);
    if (!expiry || expiry < Date.now()) {
        expiry = Date.now() + DURATION;
        localStorage.setItem(KEY, expiry);
    }
    function pad(n) { return String(n).padStart(2, '0'); }
    function tick() {
        var remaining = Math.max(0, expiry - Date.now());
        document.getElementById('cd-hours').textContent   = pad(Math.floor(remaining / 3600000));
        document.getElementById('cd-minutes').textContent = pad(Math.floor((remaining % 3600000) / 60000));
        document.getElementById('cd-seconds').textContent = pad(Math.floor((remaining % 60000) / 1000));
        if (remaining > 0) setTimeout(tick, 1000);
    }
    tick();
})();

document.addEventListener('DOMContentLoaded', () => {

    // Smooth scroll para âncoras
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const target = document.querySelector(targetId);
            if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });

    // Fade-in por scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show-element');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.card, .testimonial, .include-item').forEach((el, i) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = `all 0.6s ease ${i * 0.08}s`;
        observer.observe(el);
    });

    document.addEventListener('scroll', () => {
        document.querySelectorAll('.card, .testimonial, .include-item').forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight - 50 && rect.bottom > 0) {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }
        });
    });

    // FAQ Acordeão
    document.querySelectorAll('.faq-question').forEach(btn => {
        btn.addEventListener('click', () => {
            const item = btn.closest('.faq-item');
            const isOpen = item.classList.contains('open');
            document.querySelectorAll('.faq-item.open').forEach(open => open.classList.remove('open'));
            if (!isOpen) item.classList.add('open');
        });
    });

    // Meta Pixel: InitiateCheckout em cliques de compra
    document.querySelectorAll('a[href*="kiwify"]').forEach(btn => {
        btn.addEventListener('click', () => {
            if (typeof fbq === 'function') {
                fbq('track', 'InitiateCheckout', { currency: 'BRL', value: 39.90 });
            }
        });
    });

});
