import React, { useEffect, useState, useRef } from 'react';

export default function ProfilSection() {
  const [expCount, setExpCount] = useState(3);
  const [projCount, setProjCount] = useState(5);
  const [activeLines, setActiveLines] = useState([]);
  const [terminalCmd, setTerminalCmd] = useState('');
  const [terminalOutput, setTerminalOutput] = useState('');
  const sectionRef = useRef(null);

  const lines = [
    { text: '// martin.ts', type: 'c' },
    { text: <>const martin = &#123;</>, raw: 'const martin = {' },
    { text: <>  role: <span className="s">"Full-stack, Data & IoT"</span>,</> },
    { text: <>  stack: [<span className="s">"React"</span>, <span className="s">"Node.js"</span>, <span className="s">"Flutter"</span>,</> },
    { text: <>    <span className="s">"SQL"</span>, <span className="s">"Python"</span>, <span className="s">"n8n"</span>, <span className="s">"IoT"</span>],</> },
    { text: <>  studio: <span className="s">"Gama Labs"</span>,</> },
    { text: <>  ville: <span className="s">"Abidjan"</span>,</> },
    { text: <>  dispo: <span className="k">true</span>,</> },
    { text: <>&#125;;</> },
  ];

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const cmd = 'npm run hire-me';
    const msg = '✓ disponible en freelance. Écrivez-moi.';

    if (prefersReducedMotion) {
      setActiveLines(lines.map((_, i) => i));
      setTerminalCmd(cmd);
      setTerminalOutput(msg);
      return;
    }

    // Reveal code lines one by one
    const timers = [];
    lines.forEach((_, i) => {
      const t = setTimeout(() => {
        setActiveLines((prev) => [...prev, i]);
      }, 300 + i * 260);
      timers.push(t);
    });

    // Terminal typing animation after code lines
    const startTerminal = 300 + lines.length * 260 + 300;
    const terminalTimer = setTimeout(() => {
      let k = 0;
      const typeChar = () => {
        k++;
        setTerminalCmd(cmd.slice(0, k));
        if (k < cmd.length) {
          timers.push(setTimeout(typeChar, 70));
        } else {
          timers.push(
            setTimeout(() => {
              setTerminalOutput(msg);
            }, 400)
          );
        }
      };
      typeChar();
    }, startTerminal);
    timers.push(terminalTimer);

    // Counter animation with IntersectionObserver
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          observer.disconnect();
          const startTime = performance.now();
          const duration = 1400;

          const animate = (currentTime) => {
            const p = Math.min((currentTime - startTime) / duration, 1);
            const easeOutCubic = 1 - Math.pow(1 - p, 3);
            setExpCount(Math.round(3 * easeOutCubic));
            setProjCount(Math.round(5 * easeOutCubic));
            if (p < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => {
      timers.forEach(clearTimeout);
      observer.disconnect();
    };
  }, []);

  return (
    <div className="blk dots">
      <div className="w">
        <section className="sec" id="profil" ref={sectionRef}>
          <span className="mono">01 — Profil</span>
          <h2>Le profil, en neuf lignes.</h2>
          <div className="dvs">
            <div className="chips">
              <div className="chip">
                <b data-n="3" data-s="+">
                  {expCount}+
                </b>
                <span className="mono">Ans d’expérience</span>
              </div>
              <div className="chip">
                <b data-n="5" data-s="+">
                  {projCount}+
                </b>
                <span className="mono">Projets livrés</span>
              </div>
              <div className="chip">
                <b>Gama Labs</b>
                <span className="mono">Co-fondateur</span>
              </div>
            </div>

            <div className="ed" aria-hidden="true">
              <div className="eb">
                <i></i><i></i><i></i>
                <span className="mono">martin.ts</span>
              </div>
              <pre id="cd">
                {lines.map((line, i) => (
                  <span
                    key={i}
                    className={`ln ${activeLines.includes(i) ? 'on' : ''}`}
                  >
                    {line.type === 'c' ? (
                      <span className="c">{line.text}</span>
                    ) : (
                      line.text
                    )}
                  </span>
                ))}
              </pre>
              <div className="t2">
                <span className="mono">terminal</span>
                <div>
                  $ <span id="tc">{terminalCmd}</span>
                  <i className="cr"></i>
                </div>
                <div id="to" className="ok">
                  {terminalOutput}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
