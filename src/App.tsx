import { useState } from 'react';
import { RoleSelector, UserRole } from './components/RoleSelector';
import { RoleIndicator } from './components/RoleIndicator';
import { RoleBasedWelcome } from './components/RoleBasedWelcome';
import { NepalTheme } from './components/NepalTheme';
import { DevOpsConsole } from './components/DevOpsConsole';
import { BackendDatabase } from './components/BackendDatabase';
import { FestivalBanner } from './components/FestivalBanner';
import { ParticleField } from './components/ParticleField';
import { CustomCursor } from './components/CustomCursor';
import { ScrollProgress } from './components/ScrollProgress';
import { Navigation } from './components/Navigation';
import { HiringBanner } from './components/HiringBanner';
import { Hero } from './components/Hero';
import { AvailabilityStatus } from './components/AvailabilityStatus';
import { CompanySlider } from './components/CompanySlider';
import { About } from './components/About';
import { QuickStats } from './components/QuickStats';
import { InteractiveSkills } from './components/InteractiveSkills';
import { Projects } from './components/Projects';
import { InteractiveTimeline } from './components/InteractiveTimeline';
import { WhyHireMe } from './components/WhyHireMe';
import { Blog } from './components/Blog';
import { Testimonials } from './components/Testimonials';
import { VisitorActions } from './components/VisitorActions';
import { Contact } from './components/Contact';
import { FloatingActions } from './components/FloatingActions';
import { AIChatbot } from './components/AIChatbot';
import { EasterEggs } from './components/EasterEggs';

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
      showDevOpsConsole: false,
      showBackendDatabase: false,
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
      showDevOpsConsole: false,
      showBackendDatabase: false,
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
      showDevOpsConsole: false,
      showBackendDatabase: false,
    },
    devops: {
      showHiringBanner: false,
      showAvailabilityStatus: false,
      showCompanySlider: false,
      showAbout: false,
      showQuickStats: false,
      showInteractiveSkills: false,
      showProjects: false,
      showInteractiveTimeline: false,
      showWhyHireMe: false,
      showBlog: false,
      showTestimonials: false,
      showVisitorActions: false,
      showDevOpsConsole: true,
      showBackendDatabase: false,
    },
    backend: {
      showHiringBanner: false,
      showAvailabilityStatus: true,
      showCompanySlider: false,
      showAbout: false,
      showQuickStats: false,
      showInteractiveSkills: false,
      showProjects: false,
      showInteractiveTimeline: false,
      showWhyHireMe: false,
      showBlog: false,
      showTestimonials: false,
      showVisitorActions: false,
      showDevOpsConsole: false,
      showBackendDatabase: true,
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
      showDevOpsConsole: false,
      showBackendDatabase: false,
    },
  };

  const config = sections[userRole];

  return (
    <div className="min-h-screen overflow-x-hidden bg-slate-950">
      <NepalTheme />
      <ParticleField />
      <CustomCursor />
      <ScrollProgress />
      <Navigation />
      {config.showHiringBanner && <HiringBanner />}
      <FestivalBanner showHiringBanner={config.showHiringBanner} />
      <RoleIndicator role={userRole} onChangeRole={handleChangeRole} />
      
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
      {config.showDevOpsConsole && <DevOpsConsole />}
      {config.showBackendDatabase && (
        <div className="px-4 sm:px-6 lg:px-8 py-12">
          <BackendDatabase />
        </div>
      )}
      <Contact />
      <FloatingActions />
      <AIChatbot />
      <EasterEggs />
    </div>
  );
}