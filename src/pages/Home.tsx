import About from '../components/About';
import Contact from '../components/Contact';
import CtaBanner from '../components/CtaBanner';
import Experience from '../components/Experience';
import Hero from '../components/Hero';
import Highlights from '../components/Highlights';
import Process from '../components/Process';
import Ribbons from '../components/Ribbons';
import Services from '../components/Services';
import Skills from '../components/Skills';
import Work from '../components/Work';
import { useReveal } from '../hooks/useReveal';

export default function Home() {
  useReveal();

  return (
    <>
      <Hero />
      <Ribbons />
      <About />
      <Experience />
      <Process />
      <Services />
      <CtaBanner />
      <Work />
      <Skills />
      <Highlights />
      <Contact />
    </>
  );
}
