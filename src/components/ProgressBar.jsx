import React, { useEffect, useState } from 'react';

export default function ProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let busy = false;
    const handleScroll = () => {
      if (!busy) {
        busy = true;
        requestAnimationFrame(() => {
          busy = false;
          const y = window.scrollY;
          const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
          setProgress((y / maxScroll) * 100);
        });
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return <div id="pb" style={{ width: `${progress}%` }}></div>;
}
