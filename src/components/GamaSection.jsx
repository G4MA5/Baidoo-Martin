import React from 'react';
import logoGama from '../assets/logo-gama.png';
import ahoussiImg from '../assets/team-ahoussi-armel.jpeg';
import assaleImg from '../assets/team-assale-yao.jpeg';
import dakaudImg from '../assets/team-dakaud-uriel.jpeg';
import derouxImg from '../assets/team-deroux-caleb.jpeg';
import graourouImg from '../assets/team-graourou-divine.jpeg';

const teamMembers = [
  {
    name: 'Ahoussi Serge Armel',
    role: 'Développeur Full-stack & Lead Communication',
    extra: 'Président 6e Promo (BDE)',
    photo: ahoussiImg,
  },
  {
    name: 'Assalé Yao Eliakim',
    alias: 'dev yao',
    role: 'Développeur Frontend',
    photo: assaleImg,
  },
  {
    name: 'Dakaud Uriel Jean-Bedel',
    alias: 'le sys',
    role: 'Développeur Full-stack, IA & UI/UX Designer',
    photo: dakaudImg,
  },
  {
    name: 'Deroux Desailly Caleb',
    role: 'Développeur & Designer UI/UX',
    photo: derouxImg,
  },
  {
    name: 'Graourou Grace Olivier Divine',
    role: 'Développeuse Full-stack',
    photo: graourouImg,
  },
];

export default function GamaSection() {
  return (
    <div className="blk dots">
      <div className="w">
        <section className="sec" id="gama">
          <span className="mono">06 — Gama Labs</span>
          <h2>Gama Labs, le studio.</h2>
          <div className="gl">
            <div className="gt">
              <div
                className="glogo"
                title="Gama Labs"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto',
                }}
              >
                <img
                  src={logoGama}
                  alt="Logo Gama Labs"
                  style={{
                    width: '85%',
                    height: '85%',
                    objectFit: 'contain',
                    margin: 'auto',
                    display: 'block',
                    filter: 'drop-shadow(0 4px 10px rgba(0,0,0,0.06))',
                  }}
                />
              </div>

              <div className="gama-brand-title">
                <span className="brand-main">Gama</span>
                <span className="brand-dot">_</span>
                <span className="brand-sub">labs</span>
              </div>

              <span className="mono">Studio de développement</span>
              <p className="gtag">
                Des applications web et mobiles sur mesure, avec la <em>data</em> et l’<em>IA</em> au cœur des solutions.
              </p>
              <div className="gsv">
                <span>Web</span>
                <span>Mobile</span>
                <span>Data &amp; IA</span>
                <span>Automatisation</span>
                <span>IoT &amp; Réseaux</span>
              </div>
            </div>

            <div className="gdv">
              <span className="mono">L’équipe · 5 membres</span>
            </div>

            <div className="gtm">
              {teamMembers.map((member, i) => (
                <div key={i}>
                  <div
                    className="ph has-img"
                    style={{
                      aspectRatio: '1',
                      borderRadius: '50%',
                      border: '3px solid var(--o)',
                      padding: 0,
                      overflow: 'hidden',
                      boxShadow: '0 6px 18px rgba(0,0,0,0.3)',
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
                  </div>
                  <p>
                    {member.name}
                    {member.alias && (
                      <span className="alias-badge">« {member.alias} »</span>
                    )}
                    <span className="role-tag">{member.role}</span>
                    {member.extra && (
                      <span className="extra-badge">★ {member.extra}</span>
                    )}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
