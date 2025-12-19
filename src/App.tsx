import { useState } from 'react';
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
import { HiringBanner } from './components/HiringBanner';
import { QuickStats } from './components/QuickStats';
import { WhyHireMe } from './components/WhyHireMe';
import { AvailabilityStatus } from './components/AvailabilityStatus';
import { VisitorActions } from './components/VisitorActions';
import { RoleSelector, UserRole } from './components/RoleSelector';
import { RoleIndicator } from './components/RoleIndicator';
import { RoleBasedWelcome } from './components/RoleBasedWelcome';
import { NepalTheme } from './components/NepalTheme';

export default function App() {
  const [userRole, setUserRole] = useState<UserRole>(null);

  const handleRoleSelect = (role: UserRole) => {
    setUserRole(role);
  };

  const handleChangeRole = () => {
    setUserRole(null);
  };

  // Show role selector if no role is selected
  if (!userRole) {
    return <RoleSelector onSelectRole={handleRoleSelect} />;
  }

  // Define which sections to show based on role
  const sections = {
    'hiring-manager': {
      showHiringBanner: true,
      showAvailabilityStatus: true,
      showCompanySlider: true,
      showAbout: true,
      showQuickStats: true,
      showInteractiveSkills: true,
      showProjects: true,
      showInteractiveTimeline: true,
      showWhyHireMe: true,
      showBlog: false,
      showTestimonials: true,
      showVisitorActions: false,
    },
    developer: {
      showHiringBanner: false,
      showAvailabilityStatus: true,
      showCompanySlider: true,
      showAbout: true,
      showQuickStats: true,
      showInteractiveSkills: true,
      showProjects: true,
      showInteractiveTimeline: true,
      showWhyHireMe: false,
      showBlog: true,
      showTestimonials: true,
      showVisitorActions: true,
    },
    designer: {
      showHiringBanner: false,
      showAvailabilityStatus: true,
      showCompanySlider: true,
      showAbout: true,
      showQuickStats: false,
      showInteractiveSkills: true,
      showProjects: true,
      showInteractiveTimeline: false,
      showWhyHireMe: false,
      showBlog: true,
      showTestimonials: true,
      showVisitorActions: true,
    },
    visitor: {
      showHiringBanner: false,
      showAvailabilityStatus: false,
      showCompanySlider: true,
      showAbout: true,
      showQuickStats: false,
      showInteractiveSkills: true,
      showProjects: true,
      showInteractiveTimeline: false,
      showWhyHireMe: false,
      showBlog: true,
      showTestimonials: true,
      showVisitorActions: true,
    },
  };

  const config = sections[userRole];

  return (
    <div className="min-h-screen overflow-x-hidden">
      <NepalTheme />
      <ParticleField />
      <CustomCursor />
      <ScrollProgress />
      <Navigation />
      <RoleIndicator role={userRole} onChangeRole={handleChangeRole} />
      
      {config.showHiringBanner && <HiringBanner />}
      <Hero />
      <RoleBasedWelcome role={userRole} />
      {config.showAvailabilityStatus && <AvailabilityStatus />}
      {config.showCompanySlider && <CompanySlider />}
      {config.showAbout && <About />}
      {config.showQuickStats && <QuickStats />}
      {config.showInteractiveSkills && <InteractiveSkills />}
      {config.showProjects && <Projects />}
      {config.showInteractiveTimeline && <InteractiveTimeline />}
      {config.showWhyHireMe && <WhyHireMe />}
      {config.showBlog && <Blog />}
      {config.showTestimonials && <Testimonials />}
      {config.showVisitorActions && <VisitorActions />}
      <Contact />
      <FloatingActions />
      <AIChatbot />
      <EasterEggs />
    </div>
  );
}