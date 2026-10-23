import React, { useEffect, useRef } from 'react';

export default function ToolsNetwork() {
  const containerRef = useRef(null);

  useEffect(() => {
    const w = containerRef.current;
    if (!w) return;

    const D = document;
    const rm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const svg = w.querySelector('svg');
    const dot = svg.querySelector('#ndot');
    const ni = D.getElementById('ni');
    const N = {};
    const E = [];
    let vis = true;
    let auto = !rm;
    let mode = null;
    let scn = null;
    let idx = 0;
    let animId;

    Array.prototype.forEach.call(svg.querySelectorAll('.nd'), function(g) {
      N[g.dataset.id] = {
        g: g,
        id: g.dataset.id,
        x: +g.dataset.x,
        y: +g.dataset.y,
        px: +g.dataset.x,
        py: +g.dataset.y,
        ph: Math.random() * 6.28,
        nb: [],
        ic: g.dataset.ic,
        t: g.getAttribute('aria-label')
      };
    });

    Array.prototype.forEach.call(svg.querySelectorAll('.ee'), function(l) {
      const a = N[l.dataset.a];
      const b = N[l.dataset.b];
      if (a && b) {
        E.push({ l: l, a: a, b: b });
        a.nb.push(b);
        b.nb.push(a);
      }
    });

    const DS = {
      react: 'Interfaces web réactives. Branché aux API Node.js, habillé avec Tailwind, sécurisé par TypeScript.',
      nodejs: 'Serveur et API. Il parle à SQL, alimente React et Flutter, et reçoit les données qui arrivent du réseau.',
      typescript: 'Un code typé et fiable, côté interface (React) comme côté serveur (Node.js).',
      html: 'La base du web : la structure et le style de chaque page, avec Tailwind par-dessus.',
      tailwind: 'Le style rapide et cohérent des interfaces React.',
      flutter: 'Applications mobiles qui consomment les mêmes API que le web.',
      java: 'Un back-end robuste, relié aux bases SQL et aux API.',
      python: 'Analyse de données, scripts et automatisation : il dialogue avec SQL, R, Excel, Power BI et n8n.',
      api: 'Le point de rencontre : web, mobile, automatisations et serveurs échangent par API.',
      sql: 'La mémoire commune. Node.js, Java, Python et n8n y écrivent ; Power BI, Excel et R y lisent.',
      powerbi: 'Transforme les données SQL en tableaux de bord pour décider.',
      excel: 'Analyse rapide et partage des données avec les équipes.',
      r: 'Statistiques et visualisations avancées sur les données SQL.',
      git: 'L’historique et le travail d’équipe sur tout le code.',
      github: 'Dépôts, revues de code et partage des projets.',
      n8n: 'Automatise : il relie les API, les bases SQL et les scripts Python sans friction.',
      iot: 'Capteurs et systèmes embarqués qui collectent les données du terrain.',
      net: 'Le réseau intranet qui transporte les données des capteurs jusqu’au serveur.',
      srv: 'Serveurs et administration système : ils hébergent la plateforme et la base de données.'
    };

    const SC = {
      web: { t: 'Application web', p: ['tailwind', 'react', 'api', 'nodejs', 'sql'], d: 'Tailwind habille l’interface React, qui parle à l’API Node.js, laquelle lit et écrit dans SQL.' },
      mobile: { t: 'Application mobile', p: ['flutter', 'api', 'nodejs', 'sql'], d: 'Flutter consomme la même API que le web : un seul back-end pour toutes les applications.' },
      data: { t: 'Analyse de données', p: ['sql', 'python', 'powerbi'], d: 'SQL stocke, Python nettoie et analyse, Power BI met le résultat en tableau de bord.' },
      iot: { t: 'IoT → plateforme', p: ['iot', 'net', 'srv', 'sql', 'powerbi'], d: 'Les capteurs envoient leurs mesures par le réseau intranet vers un serveur, qui alimente SQL puis un tableau de bord. C’est le principe de mon système de collecte des données de l’eau.' },
      auto: { t: 'Automatisation', p: ['api', 'n8n', 'python', 'sql'], d: 'n8n relie les API, Python et SQL pour automatiser les tâches répétitives.' },
      code: { t: 'Code & équipe', p: ['react', 'git', 'github'], d: 'Git trace chaque modification, GitHub héberge et partage le code avec l’équipe.' }
    };

    const keys = Object.keys(SC);
    const btns = Array.prototype.slice.call(w.querySelectorAll('.nsc button'));

    function chip(n) {
      return '<span><svg class="lg"><use href="#i-' + n.ic + '"/></svg>' + n.t + '</span>';
    }

    function info(ic, t, d, list) {
      if (!ni) return;
      ni.innerHTML = '<div class="ih"><svg class="lg"><use href="#i-' + ic + '"/></svg></div><div><b>' + t + '</b><p>' + d + '</p>' + (list ? '<div class="cw">' + list + '</div>' : '') + '</div>';
    }

    function clear() {
      svg.classList.remove('foc');
      for (const k in N) {
        N[k].g.classList.remove('on', 'sel');
      }
      E.forEach(function(e) {
        e.l.classList.remove('on');
      });
      scn = null;
      btns.forEach(function(b) {
        b.classList.remove('on');
      });
    }

    function node(id) {
      const n = N[id];
      if (!n) return;
      svg.classList.add('foc');
      n.g.classList.add('on', 'sel');
      n.nb.forEach(function(m) {
        m.g.classList.add('on');
      });
      E.forEach(function(e) {
        if (e.a === n || e.b === n) e.l.classList.add('on');
      });
      info(n.ic, n.t, DS[id] || '', n.nb.map(chip).join(''));
    }

    function play(k) {
      const s = SC[k];
      if (!s) return;
      svg.classList.add('foc');
      s.p.forEach(function(i) {
        if (N[i]) N[i].g.classList.add('on');
      });
      for (let i = 0; i < s.p.length - 1; i++) {
        E.forEach(function(e) {
          const a = s.p[i];
          const b = s.p[i + 1];
          if ((e.a.id === a && e.b.id === b) || (e.a.id === b && e.b.id === a)) {
            e.l.classList.add('on');
          }
        });
      }
      scn = {
        p: s.p.map(function(i) { return N[i]; }).filter(Boolean),
        t0: performance.now()
      };
      btns.forEach(function(b) {
        b.classList.toggle('on', b.dataset.s === k);
      });
      if (N[s.p[0]]) {
        info(N[s.p[0]].ic, s.t, s.d, s.p.map(function(i) { return N[i] ? chip(N[i]) : ''; }).join(''));
      }
    }

    function render(m) {
      clear();
      if (dot) dot.setAttribute('cx', -50);
      if (!m) {
        info('api', 'Un seul écosystème', 'Chaque trait est une vraie liaison : une API qui échange avec une base, un capteur qui alimente un tableau de bord, une automatisation qui relie le tout.');
        return;
      }
      if (m.n) node(m.n);
      else play(m.s);
    }

    function set(m) {
      mode = m;
      render(m);
    }

    function stop() {
      auto = false;
    }

    btns.forEach(function(b) {
      b.addEventListener('click', function() {
        stop();
        set(b.dataset.s ? { s: b.dataset.s } : null);
      });
    });

    Object.keys(N).forEach(function(id) {
      const g = N[id].g;
      g.addEventListener('pointerenter', function(e) {
        if (e.pointerType === 'mouse') {
          stop();
          render({ n: id });
        }
      });
      g.addEventListener('pointerleave', function(e) {
        if (e.pointerType === 'mouse') render(mode);
      });
      g.addEventListener('click', function(e) {
        e.stopPropagation();
        stop();
        set({ n: id });
      });
      g.addEventListener('focus', function() {
        stop();
        render({ n: id });
      });
      g.addEventListener('blur', function() {
        render(mode);
      });
      g.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          set({ n: id });
        }
      });
    });

    svg.addEventListener('click', function() {
      stop();
      set(null);
    });

    const observer = new IntersectionObserver(function(entries) {
      vis = entries[0].isIntersecting;
    });
    observer.observe(w);

    let interval;
    if (auto) {
      set({ s: keys[0] });
      interval = setInterval(function() {
        if (auto && vis) {
          idx = (idx + 1) % keys.length;
          set({ s: keys[idx] });
        }
      }, 5200);
    } else {
      render(null);
    }

    function loop(t) {
      animId = requestAnimationFrame(loop);
      if (!vis) return;

      for (const k in N) {
        const n = N[k];
        n.px = n.x + (rm ? 0 : Math.sin(t * 0.0008 + n.ph) * 5);
        n.py = n.y + (rm ? 0 : Math.cos(t * 0.001 + n.ph) * 5);
        n.g.setAttribute('transform', 'translate(' + n.px.toFixed(1) + ' ' + n.py.toFixed(1) + ')');
      }

      E.forEach(function(e) {
        e.l.setAttribute('x1', e.a.px);
        e.l.setAttribute('y1', e.a.py);
        e.l.setAttribute('x2', e.b.px);
        e.l.setAttribute('y2', e.b.py);
      });

      if (scn && !rm && dot) {
        const p = scn.p;
        const L = [];
        let tot = 0;
        let i;
        for (i = 0; i < p.length - 1; i++) {
          const l = Math.hypot(p[i + 1].px - p[i].px, p[i + 1].py - p[i].py);
          L.push(l);
          tot += l;
        }
        let d = ((t - scn.t0) * 0.2) % (tot + 120);
        if (d <= tot) {
          for (i = 0; i < L.length && d > L[i]; i++) {
            d -= L[i];
          }
          if (L[i]) {
            const f = d / L[i];
            dot.setAttribute('cx', p[i].px + (p[i + 1].px - p[i].px) * f);
            dot.setAttribute('cy', p[i].py + (p[i + 1].py - p[i].py) * f);
          }
        } else {
          dot.setAttribute('cx', -50);
        }
      }
    }

    animId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animId);
      if (interval) clearInterval(interval);
      observer.disconnect();
    };
  }, []);

  return (
    <div className="net-w" id="net" ref={containerRef}>
      <div className="nsc" role="group" aria-label="Scénarios">
        <button type="button" data-s="web">Application web</button>
        <button type="button" data-s="mobile">Application mobile</button>
        <button type="button" data-s="data">Analyse de données</button>
        <button type="button" data-s="iot">IoT → plateforme</button>
        <button type="button" data-s="auto">Automatisation</button>
        <button type="button" data-s="code">Code &amp; équipe</button>
        <button type="button" data-s="" className="rs">Tout voir</button>
      </div>

      <div className="nsvg">
        <svg viewBox="0 0 1100 740" role="img" aria-label="Réseau des outils que j’utilise, reliés entre eux">
          <g>
        <line className="ee" data-a="html" data-b="react" x1="90" y1="110" x2="270" y2="190" />
        <line className="ee" data-a="html" data-b="tailwind" x1="90" y1="110" x2="90" y2="290" />
        <line className="ee" data-a="tailwind" data-b="react" x1="90" y1="290" x2="270" y2="190" />
        <line className="ee" data-a="typescript" data-b="react" x1="230" y1="400" x2="270" y2="190" />
        <line className="ee" data-a="typescript" data-b="nodejs" x1="230" y1="400" x2="500" y2="430" />
        <line className="ee" data-a="react" data-b="api" x1="270" y1="190" x2="520" y2="250" />
        <line className="ee" data-a="nodejs" data-b="api" x1="500" y1="430" x2="520" y2="250" />
        <line className="ee" data-a="flutter" data-b="api" x1="90" y1="520" x2="520" y2="250" />
        <line className="ee" data-a="java" data-b="api" x1="700" y1="90" x2="520" y2="250" />
        <line className="ee" data-a="java" data-b="sql" x1="700" y1="90" x2="810" y2="430" />
        <line className="ee" data-a="nodejs" data-b="sql" x1="500" y1="430" x2="810" y2="430" />
        <line className="ee" data-a="python" data-b="sql" x1="790" y1="260" x2="810" y2="430" />
        <line className="ee" data-a="python" data-b="api" x1="790" y1="260" x2="520" y2="250" />
        <line className="ee" data-a="python" data-b="r" x1="790" y1="260" x2="990" y2="120" />
        <line className="ee" data-a="python" data-b="powerbi" x1="790" y1="260" x2="1000" y2="300" />
        <line className="ee" data-a="python" data-b="excel" x1="790" y1="260" x2="1000" y2="480" />
        <line className="ee" data-a="sql" data-b="powerbi" x1="810" y1="430" x2="1000" y2="300" />
        <line className="ee" data-a="sql" data-b="excel" x1="810" y1="430" x2="1000" y2="480" />
        <line className="ee" data-a="sql" data-b="r" x1="810" y1="430" x2="990" y2="120" />
        <line className="ee" data-a="excel" data-b="powerbi" x1="1000" y1="480" x2="1000" y2="300" />
        <line className="ee" data-a="n8n" data-b="api" x1="640" y1="560" x2="520" y2="250" />
        <line className="ee" data-a="n8n" data-b="sql" x1="640" y1="560" x2="810" y2="430" />
        <line className="ee" data-a="n8n" data-b="python" x1="640" y1="560" x2="790" y2="260" />
        <line className="ee" data-a="git" data-b="github" x1="290" y1="590" x2="440" y2="650" />
        <line className="ee" data-a="git" data-b="react" x1="290" y1="590" x2="270" y2="190" />
        <line className="ee" data-a="git" data-b="nodejs" x1="290" y1="590" x2="500" y2="430" />
        <line className="ee" data-a="git" data-b="flutter" x1="290" y1="590" x2="90" y2="520" />
        <line className="ee" data-a="iot" data-b="net" x1="1030" y1="580" x2="910" y2="650" />
        <line className="ee" data-a="net" data-b="srv" x1="910" y1="650" x2="770" y2="630" />
        <line className="ee" data-a="srv" data-b="nodejs" x1="770" y1="630" x2="500" y2="430" />
        <line className="ee" data-a="srv" data-b="sql" x1="770" y1="630" x2="810" y2="430" />
        <line className="ee" data-a="srv" data-b="api" x1="770" y1="630" x2="520" y2="250" />
          </g>
          <circle id="ndot" r="9" cx="-50" cy="-50" fill="#FF6A13" stroke="#0B0B0C" strokeWidth="3" />
        <g className="nd" data-id="html" data-x="90" data-y="110" data-ic="html5" transform="translate(90 110)" tabIndex={0} role="button" aria-label="HTML & CSS">
          <rect className="ns" x="-30" y="-30" width="68" height="68" rx="17" />
          <rect className="nb" x="-34" y="-34" width="68" height="68" rx="17" />
          <use href="#i-html5" x="-30" y="-15" width="29" height="29" />
          <use href="#i-css3" x="1" y="-15" width="29" height="29" />
          <text className="nl" y="58" textAnchor="middle">HTML & CSS</text>
        </g>
        <g className="nd" data-id="java" data-x="700" data-y="90" data-ic="java" transform="translate(700 90)" tabIndex={0} role="button" aria-label="Java">
          <rect className="ns" x="-30" y="-30" width="68" height="68" rx="17" />
          <rect className="nb" x="-34" y="-34" width="68" height="68" rx="17" />
          <use href="#i-java" x="-21" y="-21" width="42" height="42" />
          <text className="nl" y="58" textAnchor="middle">Java</text>
        </g>
        <g className="nd" data-id="r" data-x="990" data-y="120" data-ic="r" transform="translate(990 120)" tabIndex={0} role="button" aria-label="R Studio">
          <rect className="ns" x="-30" y="-30" width="68" height="68" rx="17" />
          <rect className="nb" x="-34" y="-34" width="68" height="68" rx="17" />
          <use href="#i-r" x="-21" y="-21" width="42" height="42" />
          <text className="nl" y="58" textAnchor="middle">R Studio</text>
        </g>
        <g className="nd" data-id="tailwind" data-x="90" data-y="290" data-ic="tailwindcss" transform="translate(90 290)" tabIndex={0} role="button" aria-label="Tailwind">
          <rect className="ns" x="-30" y="-30" width="68" height="68" rx="17" />
          <rect className="nb" x="-34" y="-34" width="68" height="68" rx="17" />
          <use href="#i-tailwindcss" x="-21" y="-21" width="42" height="42" />
          <text className="nl" y="58" textAnchor="middle">Tailwind</text>
        </g>
        <g className="nd" data-id="react" data-x="270" data-y="190" data-ic="react" transform="translate(270 190)" tabIndex={0} role="button" aria-label="React">
          <rect className="ns" x="-30" y="-30" width="68" height="68" rx="17" />
          <rect className="nb" x="-34" y="-34" width="68" height="68" rx="17" />
          <use href="#i-react" x="-21" y="-21" width="42" height="42" />
          <text className="nl" y="58" textAnchor="middle">React</text>
        </g>
        <g className="nd" data-id="api" data-x="520" data-y="250" data-ic="api" transform="translate(520 250)" tabIndex={0} role="button" aria-label="API">
          <rect className="ns" x="-30" y="-30" width="68" height="68" rx="17" />
          <rect className="nb" x="-34" y="-34" width="68" height="68" rx="17" />
          <use href="#i-api" x="-21" y="-21" width="42" height="42" />
          <text className="nl" y="58" textAnchor="middle">API</text>
        </g>
        <g className="nd" data-id="python" data-x="790" data-y="260" data-ic="python" transform="translate(790 260)" tabIndex={0} role="button" aria-label="Python">
          <rect className="ns" x="-30" y="-30" width="68" height="68" rx="17" />
          <rect className="nb" x="-34" y="-34" width="68" height="68" rx="17" />
          <use href="#i-python" x="-21" y="-21" width="42" height="42" />
          <text className="nl" y="58" textAnchor="middle">Python</text>
        </g>
        <g className="nd" data-id="powerbi" data-x="1000" data-y="300" data-ic="powerbi" transform="translate(1000 300)" tabIndex={0} role="button" aria-label="Power BI">
          <rect className="ns" x="-30" y="-30" width="68" height="68" rx="17" />
          <rect className="nb" x="-34" y="-34" width="68" height="68" rx="17" />
          <use href="#i-powerbi" x="-21" y="-21" width="42" height="42" />
          <text className="nl" y="58" textAnchor="middle">Power BI</text>
        </g>
        <g className="nd" data-id="typescript" data-x="230" data-y="400" data-ic="typescript" transform="translate(230 400)" tabIndex={0} role="button" aria-label="TypeScript">
          <rect className="ns" x="-30" y="-30" width="68" height="68" rx="17" />
          <rect className="nb" x="-34" y="-34" width="68" height="68" rx="17" />
          <use href="#i-typescript" x="-21" y="-21" width="42" height="42" />
          <text className="nl" y="58" textAnchor="middle">TypeScript</text>
        </g>
        <g className="nd" data-id="nodejs" data-x="500" data-y="430" data-ic="nodedotjs" transform="translate(500 430)" tabIndex={0} role="button" aria-label="Node.js">
          <rect className="ns" x="-30" y="-30" width="68" height="68" rx="17" />
          <rect className="nb" x="-34" y="-34" width="68" height="68" rx="17" />
          <use href="#i-nodedotjs" x="-21" y="-21" width="42" height="42" />
          <text className="nl" y="58" textAnchor="middle">Node.js</text>
        </g>
        <g className="nd" data-id="sql" data-x="810" data-y="430" data-ic="db" transform="translate(810 430)" tabIndex={0} role="button" aria-label="SQL">
          <rect className="ns" x="-30" y="-30" width="68" height="68" rx="17" />
          <rect className="nb" x="-34" y="-34" width="68" height="68" rx="17" />
          <use href="#i-db" x="-21" y="-21" width="42" height="42" />
          <text className="nl" y="58" textAnchor="middle">SQL</text>
        </g>
        <g className="nd" data-id="excel" data-x="1000" data-y="480" data-ic="excel" transform="translate(1000 480)" tabIndex={0} role="button" aria-label="Excel">
          <rect className="ns" x="-30" y="-30" width="68" height="68" rx="17" />
          <rect className="nb" x="-34" y="-34" width="68" height="68" rx="17" />
          <use href="#i-excel" x="-21" y="-21" width="42" height="42" />
          <text className="nl" y="58" textAnchor="middle">Excel</text>
        </g>
        <g className="nd" data-id="flutter" data-x="90" data-y="520" data-ic="flutter" transform="translate(90 520)" tabIndex={0} role="button" aria-label="Flutter">
          <rect className="ns" x="-30" y="-30" width="68" height="68" rx="17" />
          <rect className="nb" x="-34" y="-34" width="68" height="68" rx="17" />
          <use href="#i-flutter" x="-21" y="-21" width="42" height="42" />
          <text className="nl" y="58" textAnchor="middle">Flutter</text>
        </g>
        <g className="nd" data-id="git" data-x="290" data-y="590" data-ic="git" transform="translate(290 590)" tabIndex={0} role="button" aria-label="Git">
          <rect className="ns" x="-30" y="-30" width="68" height="68" rx="17" />
          <rect className="nb" x="-34" y="-34" width="68" height="68" rx="17" />
          <use href="#i-git" x="-21" y="-21" width="42" height="42" />
          <text className="nl" y="58" textAnchor="middle">Git</text>
        </g>
        <g className="nd" data-id="github" data-x="440" data-y="650" data-ic="github" transform="translate(440 650)" tabIndex={0} role="button" aria-label="GitHub">
          <rect className="ns" x="-30" y="-30" width="68" height="68" rx="17" />
          <rect className="nb" x="-34" y="-34" width="68" height="68" rx="17" />
          <use href="#i-github" x="-21" y="-21" width="42" height="42" />
          <text className="nl" y="58" textAnchor="middle">GitHub</text>
        </g>
        <g className="nd" data-id="n8n" data-x="640" data-y="560" data-ic="n8n" transform="translate(640 560)" tabIndex={0} role="button" aria-label="n8n">
          <rect className="ns" x="-30" y="-30" width="68" height="68" rx="17" />
          <rect className="nb" x="-34" y="-34" width="68" height="68" rx="17" />
          <use href="#i-n8n" x="-21" y="-21" width="42" height="42" />
          <text className="nl" y="58" textAnchor="middle">n8n</text>
        </g>
        <g className="nd" data-id="srv" data-x="770" data-y="630" data-ic="server" transform="translate(770 630)" tabIndex={0} role="button" aria-label="Serveurs & admin">
          <rect className="ns" x="-30" y="-30" width="68" height="68" rx="17" />
          <rect className="nb" x="-34" y="-34" width="68" height="68" rx="17" />
          <use href="#i-server" x="-21" y="-21" width="42" height="42" />
          <text className="nl" y="58" textAnchor="middle">Serveurs & admin</text>
        </g>
        <g className="nd" data-id="net" data-x="910" data-y="650" data-ic="net" transform="translate(910 650)" tabIndex={0} role="button" aria-label="Réseau">
          <rect className="ns" x="-30" y="-30" width="68" height="68" rx="17" />
          <rect className="nb" x="-34" y="-34" width="68" height="68" rx="17" />
          <use href="#i-net" x="-21" y="-21" width="42" height="42" />
          <text className="nl" y="58" textAnchor="middle">Réseau</text>
        </g>
        <g className="nd" data-id="iot" data-x="1030" data-y="580" data-ic="chip" transform="translate(1030 580)" tabIndex={0} role="button" aria-label="IoT">
          <rect className="ns" x="-30" y="-30" width="68" height="68" rx="17" />
          <rect className="nb" x="-34" y="-34" width="68" height="68" rx="17" />
          <use href="#i-chip" x="-21" y="-21" width="42" height="42" />
          <text className="nl" y="58" textAnchor="middle">IoT</text>
        </g>
        </svg>
      </div>

      <div className="ni" id="ni">
        <div>
          <b>Un seul écosystème</b>
          <p>Chaque trait est une vraie liaison : une API qui échange avec une base, un capteur qui alimente un tableau de bord, une automatisation qui relie le tout.</p>
        </div>
      </div>
    </div>
  );
}
