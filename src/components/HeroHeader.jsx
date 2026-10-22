import React, { useEffect, useState, useRef } from 'react';
import martinHero from '../assets/martin-hero.webp';
import ahoussiImg from '../assets/team-ahoussi-armel.jpeg';
import assaleImg from '../assets/team-assale-yao.jpeg';
import dakaudImg from '../assets/team-dakaud-uriel.jpeg';
import derouxImg from '../assets/team-deroux-caleb.jpeg';
import graourouImg from '../assets/team-graourou-divine.jpeg';

const WORDS = ['Full-stack', 'Data analyst', 'IA & automatisation', 'Freelance'];

const teamMinis = [
  { name: 'Ahoussi Serge Armel', photo: ahoussiImg },
  { name: 'Assalé Yao Eliakim', photo: assaleImg },
  { name: 'Dakaud Uriel Jean-Bedel', photo: dakaudImg },
  { name: 'Deroux Desailly Caleb', photo: derouxImg },
  { name: 'Graourou Grace Olivier Divine', photo: graourouImg },
];

export default function HeroHeader() {
  const [typedWord, setTypedWord] = useState('');
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const hwRef = useRef(null);

  // Typewriter effect
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setTypedWord(WORDS[0]);
      return;
    }

    const currentWord = WORDS[wordIdx];
    let timeout;

    if (!isDeleting && charIdx < currentWord.length) {
      timeout = setTimeout(() => {
        setTypedWord(currentWord.slice(0, charIdx + 1));
        setCharIdx((prev) => prev + 1);
      }, 85);
    } else if (!isDeleting && charIdx === currentWord.length) {
      timeout = setTimeout(() => {
        setIsDeleting(true);
      }, 1400);
    } else if (isDeleting && charIdx > 0) {
      timeout = setTimeout(() => {
        setTypedWord(currentWord.slice(0, charIdx - 1));
        setCharIdx((prev) => prev - 1);
      }, 40);
    } else if (isDeleting && charIdx === 0) {
      setIsDeleting(false);
      setWordIdx((prev) => (prev + 1) % WORDS.length);
      timeout = setTimeout(() => {}, 250);
    }

    return () => clearTimeout(timeout);
  }, [charIdx, isDeleting, wordIdx]);

  // Mouse parallax effect
  useEffect(() => {
    const hw = hwRef.current;
    if (!hw || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const handlePointerMove = (e) => {
      const px = ((e.clientX / window.innerWidth) - 0.5).toFixed(3);
      const py = ((e.clientY / window.innerHeight) - 0.5).toFixed(3);
      hw.style.setProperty('--px', px);
      hw.style.setProperty('--py', py);
    };

    window.addEventListener('pointermove', handlePointerMove);
    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
    };
  }, []);

  return (
    <>
      <header className="h2o">
        <div className="hw" ref={hwRef}>
          <div className="hd">
            <i></i>Hello There !
          </div>

          <h1 className="ht">
            <span className="im">Je suis</span>{' '}
            <em>
              Martin Baidoo
              <svg className="sq" viewBox="0 0 300 14" preserveAspectRatio="none" aria-hidden="true">
                <path
                  d="M2 9 C 30 1, 50 15, 80 7 S 130 2, 160 9 S 220 15, 250 6 S 285 4, 298 8"
                  fill="none"
                  stroke="#0B0B0C"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
            </em>
            <svg className="sp" viewBox="0 0 30 30" aria-hidden="true">
              <path
                d="M4 12 L12 14 M14 3 L14 11 M23 6 L18 12"
                stroke="#0B0B0C"
                strokeWidth="2.5"
                strokeLinecap="round"
                fill="none"
              />
            </svg>
          </h1>

          <p className="hs">
            Développeur <b id="ty">{typedWord}</b>
            <i className="cr"></i> basé à Abidjan
          </p>

          <a className="badge" href="#contact" aria-label="Me contacter">
            <svg viewBox="0 0 120 120" aria-hidden="true">
              <defs>
                <path
                  id="cp"
                  d="M60,60 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0"
                />
              </defs>
              <text>
                <textPath href="#cp">
                  ME CONTACTER • DISPONIBLE • ME CONTACTER • DISPONIBLE •
                </textPath>
              </text>
            </svg>
            <span className="ar">↗</span>
          </a>

          <div className="qt">
            <b className="qm">“</b>
            <p>Des applications qui marchent, et des données qui prouvent leur valeur.</p>
            <div className="av">
              {teamMinis.map((member, idx) => (
                <i
                  key={idx}
                  title={member.name}
                  style={{
                    overflow: 'hidden',
                    padding: 0,
                    boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
                    transition: 'transform 0.2s ease, z-index 0.2s',
                    position: 'relative',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.25)';
                    e.currentTarget.style.zIndex = '10';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.zIndex = '1';
                  }}
                >
                  <img
                    src={member.photo}
                    alt={member.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block',
                    }}
                  />
                </i>
              ))}
              <span className="mono">Équipe Gama Labs</span>
            </div>
          </div>

          <div className="pills">
            <span className="pl k">
              <i className="pi">
                <svg className="lg" aria-hidden="true">
                  <use href="#i-typescript" />
                </svg>
              </i>
              Full-stack
            </span>
            <span className="pl o">
              <i className="pi">
                <svg className="lg" aria-hidden="true">
                  <use href="#i-powerbi" />
                </svg>
              </i>
              Data &amp; BI
            </span>
            <span className="pl pw">✦</span>
            <span className="pl k">
              <i className="pi">
                <svg className="lg" aria-hidden="true">
                  <use href="#i-flutter" />
                </svg>
              </i>
              Flutter
            </span>
            <span className="pl o">
              <i className="pi">
                <svg className="lg" aria-hidden="true">
                  <use href="#i-react" />
                </svg>
              </i>
              <i className="pi">
                <svg className="lg" aria-hidden="true">
                  <use href="#i-nodedotjs" />
                </svg>
              </i>
              React &amp; Node.js
            </span>
            <span className="pl k">
              <i className="pi">
                <svg className="lg" aria-hidden="true">
                  <use href="#i-n8n" />
                </svg>
              </i>
              IA &amp; n8n
            </span>
            <span className="pl o">
              <i className="pi">
                <svg className="lg" aria-hidden="true">
                  <use href="#i-python" />
                </svg>
              </i>
              SQL · Python
            </span>
            <span className="pl k">
              <i className="pi">
                <svg className="lg" aria-hidden="true">
                  <use href="#i-chip" />
                </svg>
              </i>
              IoT &amp; Réseaux
            </span>
          </div>

          <div className="pp">
            <div className="bl"></div>
            <div className="ring" aria-hidden="true"></div>
            <div className="disc">
              <img
                src={martinHero}
                alt="Portrait de Martin Baidoo : moitié humain, moitié code"
                width="700"
                height="700"
              />
              <i className="scan"></i>
            </div>
            <span className="tb" style={{ right: '9%', top: '27%' }} title="JavaScript">
              <svg className="lg" aria-hidden="true">
                <use href="#i-javascript" />
              </svg>
            </span>
            <span className="tb" style={{ right: '1%', top: '41%' }} title="Python">
              <svg className="lg" aria-hidden="true">
                <use href="#i-python" />
              </svg>
            </span>
            <span className="tb" style={{ right: '7%', top: '55%' }} title="SQL">
              <svg className="lg" aria-hidden="true">
                <use href="#i-db" />
              </svg>
            </span>
            <span className="tb" style={{ right: '17%', top: '67%' }} title="n8n">
              <svg className="lg" aria-hidden="true">
                <use href="#i-n8n" />
              </svg>
            </span>
            <span className="tb" style={{ right: '24%', top: '19%' }} title="React">
              <svg className="lg" aria-hidden="true">
                <use href="#i-react" />
              </svg>
            </span>
            <span className="lab" style={{ left: '6%' }}>
              Humain
            </span>
            <span className="lab r" style={{ right: '6%' }}>
              Informaticien
            </span>
          </div>

          <div className="soc">
            <span className="mono">Suivez-moi</span>
            <div className="sl">
              <a
                className="sb"
                href="https://github.com/B-Martin11"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                title="GitHub (B-Martin11)"
              >
                <svg className="lg" aria-hidden="true">
                  <use href="#i-github" />
                </svg>
              </a>
              <a
                className="sb"
                href="https://www.linkedin.com/in/baidoo-martin-02823b359?utm_source=share_via&utm_content=profile&utm_medium=member_ios"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                title="LinkedIn"
              >
                <svg className="lg" aria-hidden="true">
                  <use href="#i-linkedin" />
                </svg>
              </a>
              <a
                className="sb"
                href="https://www.tiktok.com/@martinsandiego7?_r=1&_t=ZS-9AlsFG3ZZqA"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                title="TikTok (@martinsandiego7)"
              >
                <svg className="lg" aria-hidden="true">
                  <use href="#i-tiktok" />
                </svg>
              </a>
              <a
                className="sb"
                href="https://wa.me/2250787650695?s=p"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                title="WhatsApp (+225 07 87 65 06 95)"
              >
                <svg className="lg" aria-hidden="true">
                  <use href="#i-whatsapp" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </header>

      <div className="bd">
        <div>
          Full stack / Data / IA / Automatisation n8n / Flutter / React / SQL / Python / IoT / Réseaux / Admin système / Full stack / Data / IA / Automatisation n8n / Flutter / React / SQL / Python / IoT / Réseaux / Admin système /&nbsp;
        </div>
      </div>
    </>
  );
}
