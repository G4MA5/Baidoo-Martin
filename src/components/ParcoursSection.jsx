import React, { useState, useEffect, useRef } from 'react';
import Fox3D from './Fox3D.jsx';

const MASCOT_PHRASES = [
  "Bienvenue sur mon parcours ! Je suis le guide de Martin.",
  "Martin vient d'entamer son Master 1 en Data & Intelligence Artificielle !",
  "Co-fondateur chez Gama Labs, il conçoit des solutions Full-stack et IA.",
  "Licence en MIAGE validée avec la mention Très Bien !",
  "Chef informaticien du concours Génie UPB depuis 2024.",
];

export default function ParcoursSection() {
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [charIdx, setCharIdx] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);
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

  // Typewriter effect for mascot speech
  useEffect(() => {
    const currentPhrase = MASCOT_PHRASES[phraseIdx];
    let timer;

    if (charIdx < currentPhrase.length) {
      timer = setTimeout(() => {
        setDisplayedText(currentPhrase.slice(0, charIdx + 1));
        setCharIdx((prev) => prev + 1);
      }, 35);
    } else {
      // Pause on finished phrase before next
      timer = setTimeout(() => {
        const nextIdx = (phraseIdx + 1) % MASCOT_PHRASES.length;
        setPhraseIdx(nextIdx);
        setCharIdx(0);
        setDisplayedText('');
        if (soundEnabled) {
          speakText(MASCOT_PHRASES[nextIdx]);
        }
      }, 4200);
    }

    return () => clearTimeout(timer);
  }, [charIdx, phraseIdx, soundEnabled]);

  // Click on bubble to cycle and speak
  const handleNextPhrase = () => {
    const nextIdx = (phraseIdx + 1) % MASCOT_PHRASES.length;
    setPhraseIdx(nextIdx);
    setCharIdx(0);
    setDisplayedText('');
    if (soundEnabled) {
      speakText(MASCOT_PHRASES[nextIdx]);
    }
  };

  const toggleSound = (e) => {
    e.stopPropagation();
    if (!soundEnabled) {
      setSoundEnabled(true);
      speakText(MASCOT_PHRASES[phraseIdx]);
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
            Du bac scientifique au Master 1 en Data &amp; IA, en passant par la MIAGE et Gama Labs.
          </p>
          <div className="pxg">
            {/* Colonne Gauche */}
            <div className="pcol">
              {/* Étape ajoutée : Master 1 en Data & IA */}
              <div className="pcd" style={{ borderLeft: '5px solid var(--o)' }}>
                <span className="mono">2024 – Présent (En cours)</span>
                <b>Master 1 en Data &amp; Intelligence Artificielle</b>
                <span className="og">Data Science &amp; IA</span>
                <p>
                  Approfondissement en modélisation prédictive, Machine Learning, Deep Learning, Big Data et ingénierie de la donnée.
                </p>
              </div>

              <div className="pcd">
                <span className="mono">Aujourd’hui</span>
                <b>Co-fondateur &amp; développeur Full-stack</b>
                <span className="og">Gama Labs</span>
                <p>Solutions web sur mesure, data et IA pour entreprises et particuliers.</p>
              </div>

              <div className="pcd">
                <span className="mono">2024 – présent</span>
                <b>Chef informaticien</b>
                <span className="og">Concours Génie UPB</span>
                <p>Responsable de l’équipe informatique et coordination technique des projets.</p>
              </div>
            </div>

            {/* Centre : Mascotte 3D parlante avec bulle interactive */}
            <div className="avw">
              {/* Bulle de dialogue animée */}
              <div
                className="mascot-speech-bubble"
                onClick={handleNextPhrase}
                title="Cliquez pour écouter la phrase suivante"
              >
                <div className="mascot-bubble-header">
                  <span className="mascot-title">
                    🦊 Mascotte Fox
                    {isSpeaking && (
                      <span className="sound-bars">
                        <span className="sound-bar"></span>
                        <span className="sound-bar"></span>
                        <span className="sound-bar"></span>
                        <span className="sound-bar"></span>
                      </span>
                    )}
                  </span>
                  <button
                    type="button"
                    className="mascot-voice-btn"
                    onClick={toggleSound}
                    title={soundEnabled ? 'Désactiver la voix' : 'Activer la voix de la mascotte'}
                  >
                    {soundEnabled ? '🔊 Voix ON' : '🔈 Activer voix'}
                  </button>
                </div>
                <p className="mascot-bubble-text">
                  « {displayedText} »
                </p>
              </div>

              <div className="avc">
                <Fox3D />
              </div>
              <span className="yrs">
                <i></i>3+ ans d’expérience
              </span>
            </div>

            {/* Colonne Droite */}
            <div className="pcol">
              <div className="pcd">
                <span className="mono">2021 – 2024</span>
                <b>Licence en MIAGE</b>
                <div className="seal" title="Licence obtenue avec la mention Très Bien">
                  <div>
                    <svg viewBox="0 0 64 48" aria-hidden="true">
                      <path d="M32 4L62 18L32 32L2 18Z" fill="#0B0B0C" />
                      <path d="M14 25V36C14 42 50 42 50 36V25L32 33Z" fill="#0B0B0C" />
                      <path d="M58 19V34" stroke="#0B0B0C" strokeWidth="3" strokeLinecap="round" />
                      <circle cx="58" cy="37" r="4" fill="#fff" stroke="#0B0B0C" strokeWidth="2" />
                    </svg>
                    <b>Mention</b>
                    <b>Très Bien</b>
                  </div>
                </div>
                <span className="og">Université Polytechnique de Bingerville</span>
                <p>
                  Méthodes informatiques appliquées à la gestion des entreprises. Obtenue avec la mention Très Bien.
                </p>
              </div>

              <div className="pcd">
                <span className="mono">2021</span>
                <b>Baccalauréat D</b>
                <span className="og">Institut Froebel</span>
                <p>Série scientifique, base solide en mathématiques et sciences de la vie.</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
