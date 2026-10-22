import React, { useState } from 'react';

export default function ContactSection() {
  const [form, setForm] = useState({ nom: '', email: '', sujet: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setForm({ nom: '', email: '', sujet: '', message: '' });
    }, 4000);
  };

  return (
    <div className="blk dk2">
      <div className="w">
        <section className="end" id="contact">
          <div className="eo">
            <span className="mono">08 — Contact</span>
            <h2>Parlons.</h2>
            <a href="mailto:baidookoffimartin@gmail.com">baidookoffimartin@gmail.com</a>

            <div className="soc3">
              <a
                className="s3"
                href="https://github.com/B-Martin11"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <span className="sb">
                  <svg className="lg" aria-hidden="true">
                    <use href="#i-github" />
                  </svg>
                </span>
                <span>
                  <b>GitHub</b>
                  <em>@B-Martin11</em>
                </span>
                <i>↗</i>
              </a>

              <a
                className="s3"
                href="https://www.linkedin.com/in/baidoo-martin-02823b359?utm_source=share_via&utm_content=profile&utm_medium=member_ios"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <span className="sb">
                  <svg className="lg" aria-hidden="true">
                    <use href="#i-linkedin" />
                  </svg>
                </span>
                <span>
                  <b>LinkedIn</b>
                  <em>Martin Baidoo</em>
                </span>
                <i>↗</i>
              </a>

              <a
                className="s3"
                href="https://www.tiktok.com/@martinsandiego7?_r=1&_t=ZS-9AlsFG3ZZqA"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
              >
                <span className="sb">
                  <svg className="lg" aria-hidden="true">
                    <use href="#i-tiktok" />
                  </svg>
                </span>
                <span>
                  <b>TikTok</b>
                  <em>@martinsandiego7</em>
                </span>
                <i>↗</i>
              </a>

              <a
                className="s3"
                href="https://wa.me/2250787650695?s=p"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
              >
                <span className="sb">
                  <svg className="lg" aria-hidden="true">
                    <use href="#i-whatsapp" />
                  </svg>
                </span>
                <span>
                  <b>WhatsApp</b>
                  <em>+225 07 87 65 06 95</em>
                </span>
                <i>↗</i>
              </a>
            </div>
          </div>

          <form className="fm" onSubmit={handleSubmit}>
            <label>
              Nom
              <input
                type="text"
                value={form.nom}
                onChange={(e) => setForm({ ...form, nom: e.target.value })}
                required
              />
            </label>
            <label>
              Email
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
              />
            </label>
            <label className="f">
              Sujet
              <input
                type="text"
                value={form.sujet}
                onChange={(e) => setForm({ ...form, sujet: e.target.value })}
                required
              />
            </label>
            <label className="f">
              Message
              <textarea
                rows="5"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                required
              />
            </label>
            <button type="submit">
              {submitted ? 'Message envoyé ✓' : 'Envoyer'}
            </button>
          </form>
        </section>

        <div style={{ height: '80px' }}></div>
        <div className="ft mono">© Martin Baidoo Kofi Medes · $ exit 0</div>
      </div>
    </div>
  );
}
