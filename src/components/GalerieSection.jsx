import React, { useState, useEffect } from 'react';
import profil1 from '../assets/profil1.jpeg';
import profil2 from '../assets/profil2.jpeg';
import profil3 from '../assets/profil3.jpeg';
import baidooMartin from '../assets/baidoo-martin.jpeg';

export default function GalerieSection() {
  const [activePhoto, setActivePhoto] = useState(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setActivePhoto(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const galleryItems = [
    { cls: 'g1', r: '-2deg', img: profil1, alt: 'Martin Baidoo', cap: 'Session de développement · Abidjan' },
    { cls: 'g2', r: '1.5deg', img: profil2, alt: 'Martin Baidoo portrait', cap: 'Gama Labs · En action' },
    { cls: 'g3', r: '-1deg', img: profil3, alt: 'Martin Baidoo', cap: 'Focus technique & Projets' },
    { cls: 'g4', r: '2deg', img: baidooMartin, alt: 'Martin Baidoo', cap: 'Toujours en apprentissage' },
    { cls: 'g5', r: '-1.5deg', ph: '[ Photo — à ajouter ]', cap: '[Légende]' },
    { cls: 'g6', r: '1deg', ph: '[ Photo — à ajouter ]', cap: '[Légende]' },
    { cls: 'g7', r: '-2.5deg', ph: '[ Photo — à ajouter ]', cap: '[Légende]' },
    { cls: 'g8', r: '1.8deg', ph: '[ Photo — à ajouter ]', cap: '[Légende]' },
  ];

  return (
    <div className="blk dk2">
      <div className="w">
        <section className="sec" id="galerie">
          <span className="mono">Galerie</span>
          <h2>Un peu de moi, en images.</h2>
          <p className="nsub gsb">
            Les coulisses, l’équipe, les moments qui comptent.{' '}
            <span className="gst">Moi, en vrai ↓</span>
          </p>

          <div className="gal">
            {galleryItems.map((item, idx) => (
              <figure
                key={idx}
                className={`gi ${item.cls}`}
                style={{ '--r': item.r }}
              >
                {item.img ? (
                  <img
                    src={item.img}
                    alt={item.alt}
                    onClick={() => setActivePhoto({ src: item.img, alt: item.alt, cap: item.cap })}
                    loading="lazy"
                  />
                ) : (
                  <div className="ph">{item.ph}</div>
                )}
                <figcaption>{item.cap}</figcaption>
              </figure>
            ))}
          </div>
        </section>
      </div>

      {/* Lightbox pour agrandir les photos au clic */}
      <div
        id="lbx"
        hidden={!activePhoto}
        onClick={() => setActivePhoto(null)}
      >
        <button
          type="button"
          aria-label="Fermer"
          onClick={() => setActivePhoto(null)}
        >
          ×
        </button>
        {activePhoto && (
          <figure onClick={(e) => e.stopPropagation()}>
            <img src={activePhoto.src} alt={activePhoto.alt} />
            <figcaption>{activePhoto.cap}</figcaption>
          </figure>
        )}
      </div>
    </div>
  );
}
