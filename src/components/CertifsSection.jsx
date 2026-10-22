import React, { useState } from 'react';
import dataLiteracyImg from '../assets/certif-data-literacy.png';
import googleSlidesImg from '../assets/certif-google-slides.png';
import googleDocsImg from '../assets/certif-google-docs.png';
import googleGmailImg from '../assets/certif-gmail.png';
import hpImg from '../assets/certif-hp.jpeg';
import cdcCiiImg from '../assets/certif-cdc-ci.jpeg';
import tremplinDigitalImg from '../assets/certif-tremplin-digital.jpeg';
import genieUpbCertifImg from '../assets/certif-genie-upb.jpeg';

const certifs = [
  {
    org: 'Coursera · 24 avril 2024',
    title: 'Data Literacy',
    desc: 'Compréhension des concepts fondamentaux liés aux données.',
    img: dataLiteracyImg,
  },
  {
    org: 'Google, Coursera · 2025',
    title: 'Google Slides',
    desc: 'Création et présentation de supports visuels professionnels.',
    img: googleSlidesImg,
  },
  {
    org: 'Google, Coursera · 2025',
    title: 'Google Docs',
    desc: 'Création et mise en forme de documents professionnels.',
    img: googleDocsImg,
  },
  {
    org: 'Google, Coursera · 2025',
    title: 'Google Gmail',
    desc: 'Fonctionnalités essentielles de la messagerie professionnelle.',
    img: googleGmailImg,
  },
  {
    org: 'HP LIFE · 23 août 2025',
    title: 'Présentations efficaces',
    desc: 'Concevoir et délivrer des présentations claires.',
    img: hpImg,
  },
  {
    org: 'Incubateur CDC CI Capital',
    title: 'Design Sprint',
    desc: 'Participation active à des ateliers de Design Sprint.',
    img: cdcCiiImg,
  },
  {
    org: 'Afrolink · janvier 2026',
    title: 'Tremplin Digital',
    desc: 'Participation active au programme Tremplin Digital 2026.',
    img: tremplinDigitalImg,
  },
  {
    org: 'UPB · 07 février 2026',
    title: 'Génie UPB',
    desc: 'Participation au comité d’organisation du concours.',
    img: genieUpbCertifImg,
  },
];

export default function CertifsSection() {
  const [selectedCertif, setSelectedCertif] = useState(null);

  return (
    <div className="blk pap">
      <div className="w">
        <section className="sec" id="certifs">
          <span className="mono">07 — Accréditations</span>
          <h2>Certifications &amp; distinctions.</h2>

          <div className="ct">
            {certifs.map((c, i) => (
              <div
                key={i}
                onClick={() => setSelectedCertif(c)}
                style={{ cursor: 'pointer' }}
                title="Cliquez pour agrandir le certificat"
              >
                <div className="ph has-img">
                  <img src={c.img} alt={c.title} loading="lazy" />
                </div>
                <span className="mono">{c.org}</span>
                <b>{c.title}</b>
                <p>{c.desc}</p>
              </div>
            ))}
          </div>

          {/* Modal Lightbox d'agrandissement */}
          {selectedCertif && (
            <div
              className="certif-lightbox"
              onClick={() => setSelectedCertif(null)}
            >
              <div
                className="lightbox-content"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  type="button"
                  className="lightbox-close"
                  onClick={() => setSelectedCertif(null)}
                  aria-label="Fermer"
                >
                  ✕
                </button>
                <img
                  src={selectedCertif.img}
                  alt={selectedCertif.title}
                />
                <div className="lightbox-meta">
                  <span className="mono">{selectedCertif.org}</span>
                  <b>{selectedCertif.title}</b>
                  <p style={{ margin: 0, color: '#555', fontSize: '14px' }}>
                    {selectedCertif.desc}
                  </p>
                </div>
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
