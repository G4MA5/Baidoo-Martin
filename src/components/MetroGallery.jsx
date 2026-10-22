import React, { useState, useEffect } from 'react';
import metro1 from '../assets/project-metro-1.png';
import metro2 from '../assets/project-metro-2.png';
import metro3 from '../assets/project-metro-3.png';
import metro4 from '../assets/project-metro-4.png';
import metro5 from '../assets/project-metro-5.png';

const metroScreens = [
  { src: metro1, title: 'Metro — Écran 1 (Accueil & Trajet)' },
  { src: metro2, title: 'Metro — Écran 2 (Carte & Lignes)' },
  { src: metro3, title: 'Metro — Écran 3 (Horaires & Stations)' },
  { src: metro4, title: 'Metro — Écran 4 (Tickets & Tarifs)' },
  { src: metro5, title: 'Metro — Écran 5 (Profil & Alertes)' },
];

export default function MetroGallery() {
  const [active, setActive] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const timer = setInterval(() => {
      if (!isHovered) {
        setActive((prev) => (prev + 1) % metroScreens.length);
      }
    }, 3200);

    return () => clearInterval(timer);
  }, [isHovered]);

  const next = (e) => {
    if (e) e.preventDefault();
    setActive((prev) => (prev + 1) % metroScreens.length);
  };

  const prev = (e) => {
    if (e) e.preventDefault();
    setActive((prev) => (prev - 1 + metroScreens.length) % metroScreens.length);
  };

  return (
    <div
      className="metro-gallery"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={next}
      title="Cliquez pour voir l'écran suivant"
    >
      <div className="metro-badge">
        <span>Écran {active + 1} / {metroScreens.length}</span>
      </div>

      {metroScreens.map((screen, idx) => (
        <div
          key={idx}
          className={`metro-slide ${idx === active ? 'active' : ''}`}
        >
          <img
            src={screen.src}
            alt={screen.title}
            loading={idx === 0 ? 'eager' : 'lazy'}
          />
        </div>
      ))}

      <div
        className="metro-controls"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="metro-btn"
          onClick={prev}
          aria-label="Écran précédent"
        >
          ‹
        </button>

        <div className="metro-dots">
          {metroScreens.map((_, idx) => (
            <button
              key={idx}
              type="button"
              className={`metro-dot ${idx === active ? 'active' : ''}`}
              onClick={() => setActive(idx)}
              aria-label={`Aller à l'écran ${idx + 1}`}
            />
          ))}
        </div>

        <button
          type="button"
          className="metro-btn"
          onClick={next}
          aria-label="Écran suivant"
        >
          ›
        </button>
      </div>
    </div>
  );
}
