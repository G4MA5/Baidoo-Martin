import React from 'react';
import ToolsNetwork from './ToolsNetwork.jsx';

export default function CompetencesSection() {
  return (
    <>
      <div className="blk dots">
        <div className="w">
          <section className="sec" id="competences">
            <span className="mono">03 — Compétences &amp; méthode</span>
            <h2>Mes outils, tous reliés.</h2>
            <p className="nsub">
              Ils ne vivent pas chacun dans leur coin. Survolez ou cliquez sur un outil, ou choisissez un scénario, pour voir comment tout fonctionne ensemble.
            </p>

            <ToolsNetwork />

            <div className="stp" style={{ marginTop: '56px' }}>
              <div tabIndex={0}>
                <svg className="sa" viewBox="0 0 160 90" aria-hidden="true">
                  <rect x="14" y="8" width="96" height="74" rx="8" fill="#fff" stroke="#0B0B0C" strokeWidth="3" />
                  <rect className="s1l l1" x="26" y="22" width="62" height="7" rx="3.5" />
                  <rect className="s1l l2" x="26" y="36" width="72" height="7" rx="3.5" />
                  <rect className="s1l l3" x="26" y="50" width="50" height="7" rx="3.5" />
                  <rect className="s1l l4" x="26" y="64" width="66" height="7" rx="3.5" />
                  <g className="mag">
                    <circle cx="118" cy="26" r="15" fill="#ffffffb3" stroke="#0B0B0C" strokeWidth="4" />
                    <path d="M129 37l14 14" stroke="#0B0B0C" strokeWidth="6" strokeLinecap="round" />
                  </g>
                </svg>
                <span className="mono">Étape 1</span>
                <b>Analyse du besoin</b>
                <p>Compréhension des enjeux métier et des spécifications.</p>
              </div>

              <div tabIndex={0}>
                <svg className="sa" viewBox="0 0 160 90" aria-hidden="true">
                  <rect className="s2f" x="26" y="34" width="44" height="38" rx="4" fill="#FF6A13" />
                  <g fill="none" stroke="#0B0B0C" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <rect className="d d1" pathLength="1" x="16" y="8" width="128" height="74" rx="8" />
                    <path className="d d2" pathLength="1" d="M16 24H144" />
                    <rect className="d d3" pathLength="1" x="26" y="34" width="44" height="38" rx="4" />
                    <path className="d d4" pathLength="1" d="M80 38H132M80 50H132M80 62H114" />
                  </g>
                  <circle cx="26" cy="16" r="2.6" fill="#FF6A13" />
                  <circle cx="35" cy="16" r="2.6" fill="#0B0B0C" />
                </svg>
                <span className="mono">Étape 2</span>
                <b>Conception</b>
                <p>Architecture logicielle, modélisation des données, design UX/UI.</p>
              </div>

              <div tabIndex={0}>
                <svg className="sa" viewBox="0 0 160 90" aria-hidden="true">
                  <rect x="8" y="6" width="144" height="78" rx="10" fill="#0B0B0C" />
                  <circle cx="20" cy="17" r="3" fill="#FF6A13" />
                  <circle cx="30" cy="17" r="3" fill="#555" />
                  <circle cx="40" cy="17" r="3" fill="#555" />
                  <rect className="cl" x="20" y="30" width="46" height="6" rx="3" fill="#FF6A13" />
                  <rect className="cl" x="20" y="42" width="84" height="6" rx="3" fill="#F2C9A5" />
                  <rect className="cl" x="32" y="54" width="62" height="6" rx="3" fill="#fff" />
                  <rect className="cl" x="32" y="66" width="38" height="6" rx="3" fill="#FF6A13" />
                  <rect className="cur" x="74" y="64" width="6" height="10" fill="#fff" />
                </svg>
                <span className="mono">Étape 3</span>
                <b>Implémentation</b>
                <p>Développement agile, code propre, documenté et performant.</p>
              </div>

              <div tabIndex={0}>
                <svg className="sa" viewBox="0 0 160 90" aria-hidden="true">
                  <rect x="14" y="8" width="132" height="74" rx="8" fill="#fff" stroke="#0B0B0C" strokeWidth="3" />
                  <rect x="24" y="18" width="14" height="14" rx="3" fill="#F4F4F2" stroke="#0B0B0C" strokeWidth="2" />
                  <path className="chk c1" pathLength="1" d="M27 25l3 4 6-7" fill="none" stroke="#FF6A13" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  <rect className="s4l" x="46" y="22" width="60" height="6" rx="3" fill="#0B0B0C" />

                  <rect x="24" y="36" width="14" height="14" rx="3" fill="#F4F4F2" stroke="#0B0B0C" strokeWidth="2" />
                  <path className="chk c2" pathLength="1" d="M27 43l3 4 6-7" fill="none" stroke="#FF6A13" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  <rect className="s4l" x="46" y="40" width="82" height="6" rx="3" fill="#0B0B0C" />

                  <rect x="24" y="54" width="14" height="14" rx="3" fill="#F4F4F2" stroke="#0B0B0C" strokeWidth="2" />
                  <path className="chk c3" pathLength="1" d="M27 61l3 4 6-7" fill="none" stroke="#FF6A13" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  <rect className="s4l" x="46" y="58" width="50" height="6" rx="3" fill="#0B0B0C" />

                  <rect x="24" y="73" width="112" height="5" rx="2.5" fill="#E5E7EB" />
                  <rect className="pbar" pathLength="1" x="24" y="73" width="112" height="5" rx="2.5" fill="#FF6A13" />
                </svg>
                <span className="mono">Étape 4</span>
                <b>Tests</b>
                <p>Tests unitaires, d’intégration et sécurité.</p>
              </div>

              <div tabIndex={0}>
                <svg className="sa" viewBox="0 0 160 90" aria-hidden="true">
                  <rect x="14" y="8" width="132" height="74" rx="8" fill="#0B0B0C" stroke="#0B0B0C" strokeWidth="3" />
                  <path className="s5traj" pathLength="1" d="M30 72 Q 75 35 130 22" fill="none" stroke="#FF6A13" strokeWidth="2.5" strokeDasharray="4 4" />
                  <circle className="s5star st1" cx="36" cy="26" r="2" fill="#fff" />
                  <circle className="s5star st2" cx="72" cy="18" r="2.5" fill="#FF6A13" />
                  <circle className="s5star st3" cx="132" cy="42" r="1.8" fill="#fff" />

                  <g className="s5rk">
                    <path d="M 92 40 L 104 22 L 120 34 L 106 50 Z" fill="#FF6A13" stroke="#fff" strokeWidth="2.5" strokeLinejoin="round" />
                    <circle cx="107" cy="34" r="3.5" fill="#fff" stroke="#0B0B0C" strokeWidth="1.8" />
                    <path d="M 94 45 L 84 50 L 92 39 Z" fill="#fff" />
                    <path d="M 107 51 L 112 60 L 102 48 Z" fill="#fff" />
                    <path className="s5fl" d="M 92 48 L 82 58 L 96 50 Z" fill="#FCD34D" />
                  </g>
                </svg>
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
