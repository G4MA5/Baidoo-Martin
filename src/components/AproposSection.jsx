import React, { useEffect, useState, useRef } from 'react';
import profil1 from '../assets/profil1.jpeg';
import profil2 from '../assets/profil2.jpeg';
import profil3 from '../assets/profil3.jpeg';
import baidooMartin from '../assets/baidoo-martin.jpeg';
import martinAbout2 from '../assets/martin-about-2.webp';

const TY = [0, 56, 94, 128];
const SC = [1, 0.88, 0.76, 0.62];
const RX = [0, 22, 34, 40];

export default function AproposSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const y0Ref = useRef(null);

  const slides = [
    { src: profil1, alt: 'Portrait de Martin Baidoo (1)' },
    { src: profil2, alt: 'Portrait de Martin Baidoo (2)' },
    { src: profil3, alt: 'Portrait de Martin Baidoo (3)' },
    { src: baidooMartin, alt: 'Martin Baidoo' },
    { src: martinAbout2, alt: 'Avatar de Martin avec ses technologies' },
  ];
  const n = slides.length;
  const h = Math.floor(n / 2);

  const go = (x) => {
    setActiveIndex((x + n) % n);
  };

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const interval = setInterval(() => {
      if (!isHovered) {
        setActiveIndex((prev) => (prev + 1) % n);
      }
    }, 3400);

    return () => clearInterval(interval);
  }, [isHovered, n]);

  const handlePointerDown = (e) => {
    y0Ref.current = e.clientY;
  };

  const handlePointerUp = (e) => {
    if (y0Ref.current === null) return;
    const diff = e.clientY - y0Ref.current;
    y0Ref.current = null;
    if (Math.abs(diff) > 40) {
      go(activeIndex + (diff < 0 ? 1 : -1));
    }
  };

  return (
    <div className="blk dots" id="apropos-w">
      <div className="w">
        <section className="sec ab" id="apropos">
          <div className="abg">
            <div className="stkw">
              <div
                className="stk"
                id="stk"
                role="group"
                aria-label="Galerie de photos de Martin"
                onPointerDown={handlePointerDown}
                onPointerUp={handlePointerUp}
                onPointerEnter={() => setIsHovered(true)}
                onPointerLeave={() => setIsHovered(false)}
              >
                {slides.map((s, i) => {
                  const d = ((i - activeIndex + n + h) % n) - h;
                  const ad = Math.abs(d);
                  const k = Math.min(ad, 3);
                  const sg = d < 0 ? -1 : 1;
                  const transform = `translateY(-50%) translateY(${TY[k] * sg}%) scale(${SC[k]}) rotateX(${-sg * RX[k]}deg)`;
                  const zIndex = 10 - ad;
                  const opacity = ad > 2 ? 0 : ad === 0 ? 1 : ad === 1 ? 0.95 : 0.75;
                  const pointerEvents = ad > 2 ? 'none' : 'auto';

                  return (
                    <figure
                      key={i}
                      className="sc"
                      onClick={() => go(i)}
                      style={{
                        transform,
                        zIndex,
                        opacity,
                        pointerEvents,
                        cursor: 'pointer',
                        overflow: 'hidden',
                        borderRadius: '24px',
                        background: '#111',
                      }}
                      aria-hidden={d !== 0}
                    >
                      <img
                        src={s.src}
                        alt={s.alt}
                        width="480"
                        height="600"
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          display: 'block',
                        }}
                      />
                    </figure>
                  );
                })}
              </div>

              <div className="snv">
                <button
                  type="button"
                  id="sup"
                  aria-label="Photo précédente"
                  onClick={() => go(activeIndex - 1)}
                >
                  ↑
                </button>
                <span className="mono" id="scn">
                  {activeIndex + 1} / {n}
                </span>
                <button
                  type="button"
                  id="sdn"
                  aria-label="Photo suivante"
                  onClick={() => go(activeIndex + 1)}
                >
                  ↓
                </button>
              </div>
            </div>

            <div>
              <span className="mono">01 — À propos</span>
              <h2>Je construis des solutions digitales intelligentes.</h2>
              <p>
                Développeur Full-stack et co-fondateur de Gama Labs, je conçois des applications web performantes, évolutives et centrées sur les besoins réels.
              </p>
              <p>
                J’interviens aussi en freelance : j’accompagne entreprises et particuliers sur des solutions sur mesure, alliant développement web, analyse de données et automatisation.
              </p>
              <p>
                Passionné par la data, j’utilise Excel, SQL et Python pour exploiter les données et améliorer la prise de décision, et j’intègre l’IA pour optimiser les processus.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
