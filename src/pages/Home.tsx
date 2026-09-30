import About from '../components/About';
import Contact from '../components/Contact';
import Experience from '../components/Experience';
import Hero from '../components/Hero';
import Services from '../components/Services';
import Skills from '../components/Skills';
import Work from '../components/Work';
import { useReveal } from '../hooks/useReveal';

export default function Home() {
  useReveal();

  return (
    <>
      <Hero />
      <About />
      <Services />
      <Skills />
      <Work />
      <Experience />
      <Contact />
    </>
  );
}
