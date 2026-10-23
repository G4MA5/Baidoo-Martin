import React, { useEffect, useState } from 'react';

const navItems = [
  { href: '#apropos', label: 'À propos' },
  { href: '#projets', label: 'Projets' },
  { href: '#gama', label: 'Gama Labs' },
  { href: '#galerie', label: 'Galerie' },
  { href: '#certifs', label: 'Certifications' },
  { href: '#contact', label: 'Contact' },
];

export default function Navbar() {
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-45% 0px -45% 0px' }
    );

    navItems.forEach((item) => {
      const id = item.href.slice(1);
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <nav className="nv">
      {navItems.map((item) => {
        const id = item.href.slice(1);
        const isActive = activeId === id;
        return (
          <a
            key={item.href}
            href={item.href}
            className={isActive ? 'on' : ''}
          >
            {item.label}
          </a>
        );
      })}
    </nav>
  );
}
