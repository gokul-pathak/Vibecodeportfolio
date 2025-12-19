import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { CompanySlider } from './components/CompanySlider';
import { About } from './components/About';
import { Projects } from './components/Projects';
import { Blog } from './components/Blog';
import { Testimonials } from './components/Testimonials';
import { Contact } from './components/Contact';
import { FloatingActions } from './components/FloatingActions';
import { AIChatbot } from './components/AIChatbot';
import { InteractiveSkills } from './components/InteractiveSkills';
import { InteractiveTimeline } from './components/InteractiveTimeline';
import { EasterEggs } from './components/EasterEggs';
import { CustomCursor } from './components/CustomCursor';
import { ScrollProgress } from './components/ScrollProgress';
import { ParticleField } from './components/ParticleField';

export default function App() {
  return (
    <div className="min-h-screen">
      <ParticleField />
      <CustomCursor />
      <ScrollProgress />
      <Navigation />
      <Hero />
      <CompanySlider />
      <About />
      <InteractiveSkills />
      <Projects />
      <InteractiveTimeline />
      <Blog />
      <Testimonials />
      <Contact />
      <FloatingActions />
      <AIChatbot />
      <EasterEggs />
    </div>
  );
}