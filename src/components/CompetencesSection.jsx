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
