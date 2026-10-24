import React, { useState, useEffect, useRef } from 'react';
import Fox3D from './Fox3D.jsx';

const BUBBLE_MESSAGES = [
  'Salut, c’est Martin !',
  '3+ ans d’expérience',
  'Cliquez sur moi !',
  'Parlons de votre projet ?',
];

export default function ParcoursSection() {
  const [bubbleText, setBubbleText] = useState('Salut, c’est Martin !');
  const [expCount, setExpCount] = useState(3);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const msgIdxRef = useRef(0);
  const sectionRef = useRef(null);

  const speakText = (text) => {
    if (!('speechSynthesis' in window)) return;
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'fr-FR';
      utterance.rate = 1.0;
      utterance.pitch = 1.1;
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
    } catch (e) {
      setIsSpeaking(false);
    }
  };

  const say = (text) => {
    setBubbleText(text);
    const bubbleEl = document.getElementById('fbub');
    if (bubbleEl) {
      bubbleEl.style.animation = 'none';
      void bubbleEl.offsetWidth;
      bubbleEl.style.animation = '';
    }
  };

  // Cyclic message rotation every 3.8s
  useEffect(() => {
    const rm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (rm) return;

    const timer = setInterval(() => {
      msgIdxRef.current = (msgIdxRef.current + 1) % BUBBLE_MESSAGES.length;
      const nextMsg = BUBBLE_MESSAGES[msgIdxRef.current];
      say(nextMsg);
      if (soundEnabled) {
        speakText(nextMsg);
      }
    }, 3800);

    return () => clearInterval(timer);
  }, [soundEnabled]);

  // Jump event reaction
  useEffect(() => {
    const handleFoxJump = () => {
      const jumpReplies = ['Hop !', 'Youpi !', 'Bienvenue !'];
      const chosen = jumpReplies[Math.floor(Math.random() * jumpReplies.length)];
      say(chosen);
      if (soundEnabled) {
        speakText(chosen);
      }
    };

    window.addEventListener('foxjump', handleFoxJump);
    return () => window.removeEventListener('foxjump', handleFoxJump);
  }, [soundEnabled]);

  // Animated experience counter and reveal on viewport enter
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    let started = false;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !started) {
          started = true;
          setExpCount(0);
          const startTime = performance.now();
          const duration = 1400;
          const step = (now) => {
            const progress = Math.min((now - startTime) / duration, 1);
            const easeOut = 1 - Math.pow(1 - progress, 3);
            setExpCount(Math.round(easeOut * 3));
            if (progress < 1) {
              requestAnimationFrame(step);
            }
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.15 }
    );

    obs.observe(el);

    const rvEls = el.querySelectorAll('.rv');
    const rvObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
          }
        });
      },
      { threshold: 0.1 }
    );
    rvEls.forEach((card) => rvObs.observe(card));

    return () => {
      obs.disconnect();
      rvObs.disconnect();
    };
  }, []);

  // Mobile pointerdown support: add .play class for 4.2s
  useEffect(() => {
    const cards = document.querySelectorAll('.pcd');
    const handlePointerDown = (e) => {
      if (e.pointerType !== 'mouse') {
        const card = e.currentTarget;
        card.classList.add('play');
        setTimeout(() => {
          card.classList.remove('play');
        }, 4200);
      }
    };

    cards.forEach((c) => c.addEventListener('pointerdown', handlePointerDown));
    return () => {
      cards.forEach((c) => c.removeEventListener('pointerdown', handlePointerDown));
    };
  }, []);

  const handleNextPhrase = () => {
    msgIdxRef.current = (msgIdxRef.current + 1) % BUBBLE_MESSAGES.length;
    const nextMsg = BUBBLE_MESSAGES[msgIdxRef.current];
    say(nextMsg);
    if (soundEnabled) {
      speakText(nextMsg);
    }
  };

  const toggleSound = (e) => {
    e.stopPropagation();
    if (!soundEnabled) {
      setSoundEnabled(true);
      speakText(bubbleText);
    } else {
      setSoundEnabled(false);
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      setIsSpeaking(false);
    }
  };

  return (
    <div className="blk org pxs">
      <i className="bu" style={{ left: '6%', top: '14%', width: '90px', height: '90px' }}></i>
      <i className="bu" style={{ left: '22%', bottom: '10%', width: '46px', height: '46px', animationDelay: '-2s' }}></i>
      <i className="bu" style={{ right: '8%', top: '20%', width: '120px', height: '120px', animationDelay: '-4s' }}></i>
      <i className="bu" style={{ right: '26%', bottom: '8%', width: '60px', height: '60px', animationDelay: '-1s' }}></i>
      <i className="bu" style={{ left: '46%', top: '6%', width: '38px', height: '38px', animationDelay: '-3s' }}></i>
      <div className="w">
        <section className="sec px" id="parcours" ref={sectionRef}>
          <span className="mono">05 — Parcours</span>
          <h2>
            Mon <span className="ul">Parcours</span>
          </h2>
          <p className="sub">
            Du bac scientifique au Master 1 en Data &amp; IA, en passant par la MIAGE, Gama Labs et Allied Gold.
          </p>

          <div className="pxg">
            {/* Colonne Gauche */}
            <div className="pcol">
              {/* Carte Master 1 Data & IA */}
              <div className="pcd rv" tabIndex={0} style={{ borderLeft: '5px solid var(--o)' }}>
                <span className="mono">2024 – Présent (En cours)</span>
                <b>Master 1 en Data &amp; Intelligence Artificielle</b>
                <span className="og">Data Science &amp; IA</span>
                <p>
                  Approfondissement en modélisation prédictive, Machine Learning, Deep Learning, Big Data et ingénierie de la donnée.
                </p>
                <svg className="pa" viewBox="0 0 160 70" aria-hidden="true">
                  <path className="sp" pathLength="1" d="M30 35L75 18M30 35L75 52M75 18L130 35M75 52L130 35" fill="none" stroke="#0B0B0C" strokeWidth="2.5" strokeLinecap="round" />
                  <circle className="st2 s1" cx="30" cy="35" r="7" fill="#fff" stroke="#0B0B0C" strokeWidth="2.5" />
                  <circle className="st2 s2" cx="75" cy="18" r="7" fill="#fff" stroke="#0B0B0C" strokeWidth="2.5" />
                  <circle className="st2 s3" cx="75" cy="52" r="7" fill="#fff" stroke="#0B0B0C" strokeWidth="2.5" />
                  <circle className="hr" cx="130" cy="35" r="10" fill="none" stroke="#FF6A13" strokeWidth="2.5" />
                  <circle cx="130" cy="35" r="10" fill="#FF6A13" stroke="#0B0B0C" strokeWidth="3" />
                  <use href="#i-ai" x="121" y="26" width="18" height="18" />
                  <circle className="dt" cx="30" cy="35" r="3.2" fill="#FF6A13" stroke="#0B0B0C" strokeWidth="1.5" style={{ '--dx': 45, '--dy': -17, animationDelay: '0.6s' }} />
                  <circle className="dt" cx="30" cy="35" r="3.2" fill="#FF6A13" stroke="#0B0B0C" strokeWidth="1.5" style={{ '--dx': 45, '--dy': 17, animationDelay: '0.8s' }} />
                  <circle className="dt" cx="75" cy="18" r="3.2" fill="#FF6A13" stroke="#0B0B0C" strokeWidth="1.5" style={{ '--dx': 55, '--dy': 17, animationDelay: '1.0s' }} />
                </svg>
              </div>

              {/* Carte 1 : Gama Labs */}
              <div className="pcd rv" tabIndex={0}>
                <span className="mono">Aujourd’hui</span>
                <b>Co-fondateur &amp; développeur Full-stack</b>
                <span className="og">Gama Labs</span>
                <p>Solutions web sur mesure, data et IA pour entreprises et particuliers.</p>
                <svg className="pa" viewBox="0 0 160 70" aria-hidden="true">
                  <path d="M0 62H160" stroke="#0B0B0C" strokeWidth="3" />
                  <rect className="bk b1" x="26" y="48" width="26" height="14" rx="3" fill="#fff" stroke="#0B0B0C" strokeWidth="3" />
                  <rect className="bk b2" x="54" y="48" width="26" height="14" rx="3" fill="#FF6A13" stroke="#0B0B0C" strokeWidth="3" />
                  <rect className="bk b3" x="40" y="33" width="26" height="14" rx="3" fill="#0B0B0C" />
                  <path d="M118 62V12" stroke="#0B0B0C" strokeWidth="3" strokeLinecap="round" />
                  <g className="fgp">
                    <path className="fl2" d="M118 12L148 21L118 31Z" fill="#FF6A13" stroke="#0B0B0C" strokeWidth="3" strokeLinejoin="round" />
                  </g>
                  <circle className="cf2" cx="118" cy="12" r="2.6" fill="#FF6A13" style={{ '--x': -18, '--y': -6 }} />
                  <circle className="cf2" cx="118" cy="12" r="2.2" fill="#0B0B0C" style={{ '--x': 16, '--y': -9 }} />
                  <circle className="cf2" cx="118" cy="12" r="2.4" fill="#FF6A13" style={{ '--x': 6, '--y': -14 }} />
                  <circle className="cf2" cx="118" cy="12" r="2" fill="#0B0B0C" style={{ '--x': -8, '--y': -12 }} />
                </svg>
              </div>

              {/* Carte 2 : Chef informaticien */}
              <div className="pcd rv" tabIndex={0}>
                <span className="mono">2024 – présent</span>
                <b>Chef informaticien</b>
                <span className="og">Concours Génie UPB</span>
                <p>Responsable de l’équipe informatique et coordination technique des projets.</p>
                <svg className="pa" viewBox="0 0 160 70" aria-hidden="true">
                  <path className="sp" pathLength="1" d="M80 36L30 16" fill="none" stroke="#0B0B0C" strokeWidth="3" strokeLinecap="round" />
                  <path className="sp" pathLength="1" d="M80 36L130 16" fill="none" stroke="#0B0B0C" strokeWidth="3" strokeLinecap="round" />
                  <path className="sp" pathLength="1" d="M80 36L30 56" fill="none" stroke="#0B0B0C" strokeWidth="3" strokeLinecap="round" />
                  <path className="sp" pathLength="1" d="M80 36L130 56" fill="none" stroke="#0B0B0C" strokeWidth="3" strokeLinecap="round" />
                  <circle className="st2 s1" cx="30" cy="16" r="7" fill="#fff" stroke="#0B0B0C" strokeWidth="3" />
                  <circle className="st2 s2" cx="130" cy="16" r="7" fill="#fff" stroke="#0B0B0C" strokeWidth="3" />
                  <circle className="st2 s3" cx="30" cy="56" r="7" fill="#fff" stroke="#0B0B0C" strokeWidth="3" />
                  <circle className="st2 s4" cx="130" cy="56" r="7" fill="#fff" stroke="#0B0B0C" strokeWidth="3" />
                  <circle className="hr" cx="80" cy="36" r="10" fill="none" stroke="#FF6A13" strokeWidth="2.5" />
                  <circle cx="80" cy="36" r="10" fill="#FF6A13" stroke="#0B0B0C" strokeWidth="3" />
                  <path d="M73 40l2-9 5 5 5-5 2 9z" fill="#0B0B0C" />
                  <circle className="dt" cx="80" cy="36" r="3.2" fill="#FF6A13" stroke="#0B0B0C" strokeWidth="1.5" style={{ '--dx': -50, '--dy': -20, animationDelay: '0.8s' }} />
                  <circle className="dt" cx="80" cy="36" r="3.2" fill="#FF6A13" stroke="#0B0B0C" strokeWidth="1.5" style={{ '--dx': 50, '--dy': -20, animationDelay: '0.98s' }} />
                  <circle className="dt" cx="80" cy="36" r="3.2" fill="#FF6A13" stroke="#0B0B0C" strokeWidth="1.5" style={{ '--dx': -50, '--dy': 20, animationDelay: '1.16s' }} />
                  <circle className="dt" cx="80" cy="36" r="3.2" fill="#FF6A13" stroke="#0B0B0C" strokeWidth="1.5" style={{ '--dx': 50, '--dy': 20, animationDelay: '1.34s' }} />
                </svg>
              </div>
            </div>

            {/* Centre : Mascotte 3D parlante avec bulle interactive */}
            <div className="avw">
              {/* Bulle officielle du renard (#fbub) */}
              <div
                className="fbub"
                id="fbub"
                aria-live="polite"
                onClick={handleNextPhrase}
                title="Cliquez pour changer le message ou faire sauter le renard"
                style={{ cursor: 'pointer' }}
              >
                {bubbleText}
                {isSpeaking && <span style={{ marginLeft: '6px', color: 'var(--o)' }}>●</span>}
              </div>

              <div className="avc">
                <Fox3D />
              </div>

              <span className="yrs">
                <i></i>
                <b data-n="3" data-s="+">{expCount}+</b>&nbsp;ans d’expérience
              </span>

              {/* Bouton audio optionnel discret */}
              <button
                type="button"
                className="mascot-voice-btn"
                onClick={toggleSound}
                title={soundEnabled ? 'Désactiver la voix' : 'Activer la voix de la mascotte'}
                style={{
                  margin: '10px auto 0',
                  display: 'table',
                  padding: '4px 10px',
                  fontSize: '11px',
                  borderRadius: '99px',
                  background: soundEnabled ? 'var(--o)' : '#fff',
                  color: soundEnabled ? '#fff' : 'var(--k)',
                  border: '1.5px solid var(--k)',
                  cursor: 'pointer',
                  fontWeight: 700,
                }}
              >
                {soundEnabled ? '🔊 Voix ON' : '🔈 Activer voix'}
              </button>
            </div>

            {/* Colonne Droite */}
            <div className="pcol">
              {/* Carte 3 : Licence en MIAGE */}
              <div className="pcd rv" tabIndex={0}>
                <span className="mono">2021 – 2024</span>
                <b>Licence en MIAGE</b>
                <div className="seal" title="Diplômé de licence">
                  <div>
                    <svg viewBox="0 0 64 48" aria-hidden="true">
                      <path d="M32 4L62 18L32 32L2 18Z" fill="#0B0B0C" />
                      <path d="M14 25V36C14 42 50 42 50 36V25L32 33Z" fill="#0B0B0C" />
                      <path d="M58 19V34" stroke="#0B0B0C" strokeWidth="3" strokeLinecap="round" />
                      <circle cx="58" cy="37" r="4" fill="#fff" stroke="#0B0B0C" strokeWidth="2" />
                    </svg>
                  </div>
                </div>
                <span className="og">Université Polytechnique de Bingerville</span>
                <p>
                  Méthodes informatiques appliquées à la gestion des entreprises.
                </p>
                <svg className="pa" viewBox="0 0 160 70" aria-hidden="true">
                  <rect x="46" y="54" width="68" height="8" rx="2" fill="#0B0B0C" />
                  <rect x="52" y="46" width="56" height="8" rx="2" fill="#FF6A13" stroke="#0B0B0C" strokeWidth="2.5" />
                  <rect x="58" y="38" width="44" height="8" rx="2" fill="#fff" stroke="#0B0B0C" strokeWidth="2.5" />
                  <g transform="translate(58 3) scale(.68)">
                    <g className="cap">
                      <path d="M32 4L62 18L32 32L2 18Z" fill="#0B0B0C" />
                      <path d="M14 25V36C14 42 50 42 50 36V25L32 33Z" fill="#0B0B0C" />
                      <path d="M58 19V34" stroke="#0B0B0C" strokeWidth="3" strokeLinecap="round" />
                      <circle cx="58" cy="37" r="4" fill="#fff" stroke="#0B0B0C" strokeWidth="2" />
                    </g>
                  </g>
                  <rect className="cb" x="78" y="14" width="5" height="3" fill="#FF6A13" style={{ '--x': -34, '--y': -8 }} />
                  <rect className="cb" x="78" y="14" width="5" height="3" fill="#0B0B0C" style={{ '--x': 30, '--y': -12 }} />
                  <rect className="cb" x="78" y="14" width="5" height="3" fill="#FF6A13" style={{ '--x': -18, '--y': -20 }} />
                  <rect className="cb" x="78" y="14" width="5" height="3" fill="#0B0B0C" style={{ '--x': 14, '--y': -24 }} />
                  <rect className="cb" x="78" y="14" width="5" height="3" fill="#FF6A13" style={{ '--x': 38, '--y': 2 }} />
                  <rect className="cb" x="78" y="14" width="5" height="3" fill="#0B0B0C" style={{ '--x': -40, '--y': 6 }} />
                </svg>
              </div>

              {/* Carte 4 : Baccalauréat D */}
              <div className="pcd rv" tabIndex={0}>
                <span className="mono">2021</span>
                <b>Baccalauréat D</b>
                <span className="og">Institut Froebel</span>
                <p>Série scientifique, base solide en mathématiques et sciences de la vie.</p>
                <svg className="pa" viewBox="0 0 160 70" aria-hidden="true">
                  <g fill="none" strokeLinecap="round">
                    <g stroke="#0B0B0C" strokeWidth="2">
                      <path className="rg r1" pathLength="1" d="M20 23.5V46.5" />
                      <path className="rg r2" pathLength="1" d="M29 15.3V54.7" />
                      <path className="rg r3" pathLength="1" d="M38 12.5V57.5" />
                      <path className="rg r4" pathLength="1" d="M47 16.1V53.9" />
                      <path className="rg r5" pathLength="1" d="M56 25.2V44.8" />
                      <path className="rg r6" pathLength="1" d="M74 51.9V18.1" />
                      <path className="rg r7" pathLength="1" d="M83 57.0V13.0" />
                      <path className="rg r8" pathLength="1" d="M92 56.1V13.9" />
                      <path className="rg r9" pathLength="1" d="M101 49.4V20.6" />
                      <path className="rg r10" pathLength="1" d="M119 20.5V49.5" />
                      <path className="rg r11" pathLength="1" d="M128 13.1V56.9" />
                      <path className="rg r12" pathLength="1" d="M137 10.2V59.8" />
                    </g>
                    <path className="rg w1" pathLength="1" d="M12 35C30 5 46 5 62 35S94 65 110 35S142 5 148 20" stroke="#FF6A13" strokeWidth="4" />
                    <path className="rg w2" pathLength="1" d="M12 35C30 65 46 65 62 35S94 5 110 35S142 65 148 50" stroke="#0B0B0C" strokeWidth="4" />
                  </g>
                  <text className="sy y1" x="14" y="14">π</text>
                  <text className="sy y2" x="128" y="66">Σ</text>
                  <text className="sy y3" x="136" y="14">∫</text>
                  <text className="sy y4" x="16" y="66">√</text>
                </svg>
              </div>
            </div>
          </div>

          {/* MODIFICATION 2 — Carte pleine largeur Stage (Allied Gold) */}
          <div className="pcd stg rv" tabIndex={0}>
            <span className="rib">Stage</span>
            <div className="stx">
              <span className="mono">Avril 2024 – Août 2024</span>
              <b className="ttl">Stagiaire IT : Support, Réseaux &amp; IoT</b>
              <span className="og">Allied Gold Corporation</span>
              <ul className="stl">
                <li>
                  <i>
                    <svg className="lg" aria-hidden="true">
                      <use href="#i-support" />
                    </svg>
                  </i>
                  <span>Support utilisateurs, maintenance des postes et gestion du matériel informatique.</span>
                </li>
                <li>
                  <i>
                    <svg className="lg" aria-hidden="true">
                      <use href="#i-net" />
                    </svg>
                  </i>
                  <span>Installation et configuration d’équipements réseau et systèmes.</span>
                </li>
                <li>
                  <i>
                    <svg className="lg" aria-hidden="true">
                      <use href="#i-chip" />
                    </svg>
                  </i>
                  <span>Conception d’une plateforme de supervision connectée à des capteurs IoT pour la collecte et la centralisation des données.</span>
                </li>
                <li>
                  <i>
                    <svg className="lg" aria-hidden="true">
                      <use href="#i-ai" />
                    </svg>
                  </i>
                  <span>Intégration d’un modèle d’IA pour l’analyse des données et l’aide à la prise de décision.</span>
                </li>
              </ul>
            </div>

            <svg className="pa agsv" viewBox="0 0 320 200" aria-hidden="true">
              <path d="M28 36L110 100" stroke="#0B0B0C" strokeWidth="2.5" strokeDasharray="5 5" fill="none" opacity=".45" />
              <path d="M28 100L110 100" stroke="#0B0B0C" strokeWidth="2.5" strokeDasharray="5 5" fill="none" opacity=".45" />
              <path d="M28 164L110 100" stroke="#0B0B0C" strokeWidth="2.5" strokeDasharray="5 5" fill="none" opacity=".45" />
              <path d="M110 100H150" stroke="#0B0B0C" strokeWidth="2.5" strokeDasharray="5 5" fill="none" opacity=".45" />

              <circle className="dt" cx="28" cy="36" r="3.6" fill="#FF6A13" stroke="#0B0B0C" strokeWidth="1.5" style={{ '--dx': 82, '--dy': 64, animationDelay: '0.0s' }} />
              <circle className="dt" cx="28" cy="100" r="3.6" fill="#FF6A13" stroke="#0B0B0C" strokeWidth="1.5" style={{ '--dx': 82, '--dy': 0, animationDelay: '0.35s' }} />
              <circle className="dt" cx="28" cy="164" r="3.6" fill="#FF6A13" stroke="#0B0B0C" strokeWidth="1.5" style={{ '--dx': 82, '--dy': -64, animationDelay: '0.7s' }} />
              <circle className="dt" cx="110" cy="100" r="3.6" fill="#FF6A13" stroke="#0B0B0C" strokeWidth="1.5" style={{ '--dx': 40, '--dy': 0, animationDelay: '0.5s' }} />

              <circle className="agn" cx="28" cy="36" r="15" fill="#fff" stroke="#0B0B0C" strokeWidth="3" />
              <use href="#i-chip" x="18" y="26" width="20" height="20" />
              <circle className="agn" cx="28" cy="100" r="15" fill="#fff" stroke="#0B0B0C" strokeWidth="3" />
              <use href="#i-chip" x="18" y="90" width="20" height="20" />
              <circle className="agn" cx="28" cy="164" r="15" fill="#fff" stroke="#0B0B0C" strokeWidth="3" />
              <use href="#i-chip" x="18" y="154" width="20" height="20" />

              <rect x="90" y="82" width="40" height="36" rx="8" fill="#fff" stroke="#0B0B0C" strokeWidth="3" />
              <use href="#i-net" x="98" y="88" width="24" height="24" />

              <rect x="150" y="16" width="160" height="168" rx="12" fill="#0B0B0C" />
              <circle cx="163" cy="29" r="2.6" fill="#FF6A13" />
              <circle cx="173" cy="29" r="2.6" fill="#555" />
              <circle cx="183" cy="29" r="2.6" fill="#555" />
              <g stroke="#2e2e34" strokeWidth="1">
                <path d="M162 56H298M162 78H298M162 100H298" />
              </g>

              <path className="rg" pathLength="1" d="M162 104L178 90L194 98L212 66L230 76L250 50L268 62L298 44" fill="none" stroke="#FF6A13" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              <circle className="hr" cx="250" cy="50" r="6" fill="none" stroke="#FF6A13" strokeWidth="2" />
              <circle cx="250" cy="50" r="4" fill="#fff" stroke="#FF6A13" strokeWidth="2" />

              <rect x="162" y="122" width="136" height="52" rx="8" fill="#1d1d22" />
              <g className="agspin">
                <use href="#i-ai" x="167" y="127" width="17" height="17" />
              </g>
              <text className="agt" x="190" y="139" fill="#F2C9A5">Analyse IA</text>
              <rect className="agl" x="168" y="148" width="100" height="5" rx="2.5" fill="#FF6A13" />
              <rect className="agl" x="168" y="157" width="70" height="5" rx="2.5" fill="#fff" opacity=".7" />
              <text className="agt" x="168" y="171" fill="#fff">→ aide à la décision</text>
            </svg>
          </div>
        </section>
      </div>
    </div>
  );
}
