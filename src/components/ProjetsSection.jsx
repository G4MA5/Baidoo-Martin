import React from 'react';
import MetroGallery from './MetroGallery.jsx';
import upbStudentsImg from '../assets/project-upb-students.png';
import cliniqueLifeImg from '../assets/project-clinique-life.png';
import eagleVisionImg from '../assets/project-eagle-vision.png';
import iotImg from '../assets/project-iot.png';
import seriousGameImg from '../assets/project-serious-game.png';
import genieUpbImg from '../assets/project-genie-upb.png';
import biblioImg from '../assets/project-upb-bibliotheque.png';

export default function ProjetsSection() {
  return (
    <div className="blk pap">
      <div className="w">
        <section className="sec" id="projets">
          <span className="mono">04 — Projets sélectionnés</span>
          <h2>Mes projets.</h2>
          <div className="pj">
            {/* 1. UPB Student’s */}
            <a className="pc" href="#" style={{ '--i': 0 }}>
              <div className="ph has-img">
                <img
                  src={upbStudentsImg}
                  alt="Capture d’écran UPB Student’s"
                />
              </div>
              <div className="pt">
                <span className="mono tgs">
                  <i className="pi">
                    <svg className="lg" aria-hidden="true">
                      <use href="#i-flutter" />
                    </svg>
                  </i>
                  Flutter
                </span>
                <h3>UPB Student’s</h3>
                <p>
                  Application mobile de gestion académique : résultats, profils étudiants, notifications. [Résultat à ajouter]
                </p>
                <span className="mono">Démo en direct ↗</span>
              </div>
            </a>

            {/* 2. Clinique Life */}
            <a className="pc" href="#" style={{ '--i': 1 }}>
              <div className="ph has-img">
                <img
                  src={cliniqueLifeImg}
                  alt="Capture d’écran Clinique Life"
                />
              </div>
              <div className="pt">
                <span className="mono tgs">
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
                  React · Node.js
                </span>
                <h3>Clinique Life</h3>
                <p>
                  Plateforme développée avec Gama Labs pour une clinique. [Résultat à ajouter]
                </p>
                <span className="mono">Voir le projet ↗</span>
              </div>
            </a>

            {/* 3. Metro (Animated 5 screens gallery) */}
            <div className="pc" style={{ '--i': 2, cursor: 'default' }}>
              <div className="ph has-img" style={{ padding: 0 }}>
                <MetroGallery />
              </div>
              <div className="pt">
                <span className="mono tgs">
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
                  React · Node.js
                </span>
                <h3>Metro</h3>
                <p>
                  Application mobile réalisée en équipe. [Résultat à ajouter]
                </p>
                <a
                  href="#"
                  className="mono"
                  style={{ textDecoration: 'none', color: 'var(--o)' }}
                >
                  Voir le projet ↗
                </a>
              </div>
            </div>

            {/* 4. Eagle Vision */}
            <a className="pc" href="#" style={{ '--i': 3 }}>
              <div className="ph has-img">
                <img
                  src={eagleVisionImg}
                  alt="Capture d’écran Eagle Vision"
                />
              </div>
              <div className="pt">
                <span className="mono tgs">
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
                  React · Node.js
                </span>
                <h3>Eagle Vision</h3>
                <p>
                  Système de surveillance intelligente par drones. [Résultat à ajouter]
                </p>
                <span className="mono">Voir le projet ↗</span>
              </div>
            </a>

            {/* 5. IoT : collecte des données de l’eau */}
            <a className="pc" href="#" style={{ '--i': 4 }}>
              <div className="ph has-img">
                <img
                  src={iotImg}
                  alt="Système IoT collecte des données de l’eau"
                />
              </div>
              <div className="pt">
                <span className="mono tgs">
                  <i className="pi">
                    <svg className="lg" aria-hidden="true">
                      <use href="#i-chip" />
                    </svg>
                  </i>
                  <i className="pi">
                    <svg className="lg" aria-hidden="true">
                      <use href="#i-net" />
                    </svg>
                  </i>
                  IoT · Réseau · Intranet
                </span>
                <h3>IoT : collecte des données de l’eau</h3>
                <p>
                  Système embarqué que j’ai construit pour collecter les données de l’eau et les envoyer vers une plateforme web, à travers un réseau et un serveur intranet. [Résultat à ajouter]
                </p>
                <span className="mono">Voir le projet ↗</span>
              </div>
            </a>

            {/* 6. Serious game */}
            <a className="pc" href="#" style={{ '--i': 5 }}>
              <div className="ph has-img">
                <img
                  src={seriousGameImg}
                  alt="Capture d’écran du Serious game"
                />
              </div>
              <div className="pt">
                <span className="mono tgs">
                  <i className="pi">
                    <svg className="lg" aria-hidden="true">
                      <use href="#i-game" />
                    </svg>
                  </i>
                  Serious game
                </span>
                <h3>Serious game</h3>
                <p>
                  Jeu sérieux développé chez Gama Labs. [Thème et objectif à préciser]
                </p>
                <span className="mono">Voir le projet ↗</span>
              </div>
            </a>

            {/* 7. Site du concours Génie UPB */}
            <a className="pc" href="#" style={{ '--i': 6 }}>
              <div className="ph has-img">
                <img
                  src={genieUpbImg}
                  alt="Capture d’écran du site Génie UPB"
                />
              </div>
              <div className="pt">
                <span className="mono tgs">
                  <i className="pi">
                    <svg className="lg" aria-hidden="true">
                      <use href="#i-web" />
                    </svg>
                  </i>
                  Web · Génie UPB
                </span>
                <h3>Site du concours Génie UPB</h3>
                <p>
                  Site officiel du concours Génie UPB, dont j’ai dirigé l’équipe informatique.
                </p>
                <span className="mono">Voir le projet ↗</span>
              </div>
            </a>

            {/* 8. Bibliothèque numérique UPB */}
            <a className="pc" href="#" style={{ '--i': 7 }}>
              <div className="ph has-img">
                <img
                  src={biblioImg}
                  alt="Capture d’écran de la bibliothèque"
                />
              </div>
              <div className="pt">
                <span className="mono tgs">
                  <i className="pi">
                    <svg className="lg" aria-hidden="true">
                      <use href="#i-book" />
                    </svg>
                  </i>
                  Web · Bibliothèque
                </span>
                <h3>Bibliothèque numérique UPB</h3>
                <p>
                  Plateforme de bibliothèque numérique pour l’Université Polytechnique de Bingerville. [Détails à préciser]
                </p>
                <span className="mono">Voir le projet ↗</span>
              </div>
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
