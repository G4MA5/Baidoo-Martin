import { useEffect } from 'react';

export function useScrollReveal() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target;
          io.unobserve(el);
          const delay = (parseInt(el.dataset.d, 10) || 0) * 90;
          setTimeout(() => {
            el.classList.add('in');
            setTimeout(() => {
              el.classList.remove('rv', 'in');
            }, 900);
          }, delay);
        });
      },
      { threshold: 0.12 }
    );

    const selector = '.sec h2, .eo h2, .ab p, .g3 .t, .stp>div, .tg>div, .tl>div, .pcd, .avw, .gm, .tm>div, .ct>div, .eo, .fm, .pc';
    const elements = document.querySelectorAll(selector);

    elements.forEach((el, i) => {
      el.classList.add('rv');
      el.dataset.d = i % 4;
      io.observe(el);
    });

    return () => {
      io.disconnect();
    };
  }, []);
}
