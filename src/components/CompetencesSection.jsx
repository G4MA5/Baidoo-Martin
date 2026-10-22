import React from 'react';

export default function CompetencesSection() {
  return (
    <>
      <div className="blk dots">
        <div className="w">
          <section className="sec tg" id="competences">
            <span className="mono">03 — Compétences & méthode</span>
            <h2>Mes outils, ma façon de travailler.</h2>

            <div>
              <span className="mono m">Développement</span>
              <span>
                <svg className="lg" aria-hidden="true">
                  <use href="#i-typescript" />
                </svg>
                TypeScript
              </span>
              <span>
                <svg className="lg" aria-hidden="true">
                  <use href="#i-java" />
                </svg>
                Java
              </span>
              <span>
                <svg className="lg" aria-hidden="true">
                  <use href="#i-python" />
                </svg>
                Python
              </span>
              <span>
                <svg className="lg" aria-hidden="true">
                  <use href="#i-flutter" />
                </svg>
                Flutter
              </span>
              <span>
                <svg className="lg" aria-hidden="true">
                  <use href="#i-html5" />
                </svg>
                <svg className="lg" aria-hidden="true">
                  <use href="#i-css3" />
                </svg>
                HTML &amp; CSS
              </span>
              <span>
                <svg className="lg" aria-hidden="true">
                  <use href="#i-tailwindcss" />
                </svg>
                Tailwind CSS
              </span>
            </div>

            <div style={{ marginTop: '14px' }}>
              <span className="mono m">Data &amp; BI</span>
              <span>
                <svg className="lg" aria-hidden="true">
                  <use href="#i-db" />
                </svg>
                SQL
              </span>
              <span>
                <svg className="lg" aria-hidden="true">
                  <use href="#i-chart" />
                </svg>
                Analyse de données
              </span>
              <span>
                <svg className="lg" aria-hidden="true">
                  <use href="#i-powerbi" />
                </svg>
                Power BI
              </span>
              <span>
                <svg className="lg" aria-hidden="true">
                  <use href="#i-excel" />
                </svg>
                Excel
              </span>
              <span>
                <svg className="lg" aria-hidden="true">
                  <use href="#i-r" />
                </svg>
                R Studio
              </span>
            </div>

            <div style={{ marginTop: '14px' }}>
              <span className="mono m">Outils</span>
              <span>
                <svg className="lg" aria-hidden="true">
                  <use href="#i-git" />
                </svg>
                Git
              </span>
              <span>
                <svg className="lg" aria-hidden="true">
                  <use href="#i-github" />
                </svg>
                GitHub
              </span>
              <span>
                <svg className="lg" aria-hidden="true">
                  <use href="#i-n8n" />
                </svg>
                n8n
              </span>
            </div>

            <div style={{ marginTop: '14px' }}>
              <span className="mono m">Systèmes, réseaux &amp; IoT</span>
              <span>
                <svg className="lg" aria-hidden="true">
                  <use href="#i-chip" />
                </svg>
                IoT &amp; systèmes embarqués
              </span>
              <span>
                <svg className="lg" aria-hidden="true">
                  <use href="#i-net" />
                </svg>
                Réseaux &amp; intranet
              </span>
              <span>
                <svg className="lg" aria-hidden="true">
                  <use href="#i-server" />
                </svg>
                Administration système
              </span>
              <span>
                <svg className="lg" aria-hidden="true">
                  <use href="#i-server" />
                </svg>
                Serveurs
              </span>
            </div>

            <div className="stp">
              <div>
                <span className="mono">Étape 1</span>
                <b>Analyse du besoin</b>
                <p>Compréhension des enjeux métier et des spécifications.</p>
              </div>
              <div>
                <span className="mono">Étape 2</span>
                <b>Conception</b>
                <p>Architecture logicielle, modélisation des données, design UX/UI.</p>
              </div>
              <div>
                <span className="mono">Étape 3</span>
                <b>Implémentation</b>
                <p>Développement agile, code propre, documenté et performant.</p>
              </div>
              <div>
                <span className="mono">Étape 4</span>
                <b>Tests</b>
                <p>Tests unitaires, d’intégration et sécurité.</p>
              </div>
              <div>
                <span className="mono">Étape 5</span>
                <b>Déploiement</b>
                <p>Mise en production, monitoring et amélioration continue.</p>
              </div>
            </div>
          </section>
        </div>
      </div>

      <div className="bd bd2">
        <div>
          Code propre / Data utile / IA appliquée / Livré en production / Code propre / Data utile / IA appliquée / Livré en production /&nbsp;
        </div>
      </div>
    </>
  );
}
