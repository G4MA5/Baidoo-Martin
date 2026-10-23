import React from 'react';
import SvgIcons from './components/SvgIcons.jsx';
import ProgressBar from './components/ProgressBar.jsx';
import ToastDetail from './components/ToastDetail.jsx';
import Navbar from './components/Navbar.jsx';
import HeroHeader from './components/HeroHeader.jsx';
import ProfilSection from './components/ProfilSection.jsx';
import AproposSection from './components/AproposSection.jsx';
import ApprocheSection from './components/ApprocheSection.jsx';
import CompetencesSection from './components/CompetencesSection.jsx';
import ProjetsSection from './components/ProjetsSection.jsx';
import ParcoursSection from './components/ParcoursSection.jsx';
import GalerieSection from './components/GalerieSection.jsx';
import GamaSection from './components/GamaSection.jsx';
import CertifsSection from './components/CertifsSection.jsx';
import ContactSection from './components/ContactSection.jsx';
import { useScrollReveal } from './hooks/useScrollReveal.js';

export default function App() {
  useScrollReveal();

  return (
    <>
      <SvgIcons />
      <ProgressBar />
      <ToastDetail />

      <div className="pg">
        <Navbar />
        <HeroHeader />
        <ProfilSection />
        <AproposSection />
        <ApprocheSection />
        <CompetencesSection />
        <ProjetsSection />
        <ParcoursSection />
        <GalerieSection />
        <GamaSection />
        <CertifsSection />
        <ContactSection />
      </div>
    </>
  );
}
