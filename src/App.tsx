import { useState, lazy, Suspense } from 'react';
import { RoleSelector, UserRole } from './components/RoleSelector';
import { RoleIndicator } from './components/RoleIndicator';
import { ParticleField } from './components/ParticleField';
import { CustomCursor } from './components/CustomCursor';
import { ScrollProgress } from './components/ScrollProgress';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { LazySection } from './components/LazySection';
import { LoadingDots } from './components/LoadingSpinner';

// Lazy load heavy components
const RoleBasedWelcome = lazy(() => import('./components/RoleBasedWelcome').then(m => ({ default: m.RoleBasedWelcome })));
const NepalTheme = lazy(() => import('./components/NepalTheme').then(m => ({ default: m.NepalTheme })));
const DevOpsConsole = lazy(() => import('./components/DevOpsConsole').then(m => ({ default: m.DevOpsConsole })));
const BackendDatabase = lazy(() => import('./components/BackendDatabase').then(m => ({ default: m.BackendDatabase })));
const FestivalBanner = lazy(() => import('./components/FestivalBanner').then(m => ({ default: m.FestivalBanner })));
const HiringBanner = lazy(() => import('./components/HiringBanner').then(m => ({ default: m.HiringBanner })));
const AvailabilityStatus = lazy(() => import('./components/AvailabilityStatus').then(m => ({ default: m.AvailabilityStatus })));
const CompanySlider = lazy(() => import('./components/CompanySlider').then(m => ({ default: m.CompanySlider })));
const About = lazy(() => import('./components/About').then(m => ({ default: m.About })));
const QuickStats = lazy(() => import('./components/QuickStats').then(m => ({ default: m.QuickStats })));
const InteractiveSkills = lazy(() => import('./components/InteractiveSkills').then(m => ({ default: m.InteractiveSkills })));
const Projects = lazy(() => import('./components/Projects').then(m => ({ default: m.Projects })));
const InteractiveTimeline = lazy(() => import('./components/InteractiveTimeline').then(m => ({ default: m.InteractiveTimeline })));
const WhyHireMe = lazy(() => import('./components/WhyHireMe').then(m => ({ default: m.WhyHireMe })));
const Blog = lazy(() => import('./components/Blog').then(m => ({ default: m.Blog })));
const Testimonials = lazy(() => import('./components/Testimonials').then(m => ({ default: m.Testimonials })));
const VisitorActions = lazy(() => import('./components/VisitorActions').then(m => ({ default: m.VisitorActions })));
const Contact = lazy(() => import('./components/Contact').then(m => ({ default: m.Contact })));
const FloatingActions = lazy(() => import('./components/FloatingActions').then(m => ({ default: m.FloatingActions })));
const AIChatbot = lazy(() => import('./components/AIChatbot').then(m => ({ default: m.AIChatbot })));
const EasterEggs = lazy(() => import('./components/EasterEggs').then(m => ({ default: m.EasterEggs })));

export default function App() {
  const [userRole, setUserRole] = useState<UserRole>(null);
  const [isHiringBannerDismissed, setIsHiringBannerDismissed] = useState(false);

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
      <Suspense fallback={null}>
        <NepalTheme />
      </Suspense>
      <ParticleField />
      <CustomCursor />
      <ScrollProgress />
      <Navigation />
      
      <Suspense fallback={null}>
        {config.showHiringBanner && !isHiringBannerDismissed && (
          <HiringBanner onDismiss={() => setIsHiringBannerDismissed(true)} />
        )}
        <FestivalBanner showHiringBanner={config.showHiringBanner && !isHiringBannerDismissed} />
      </Suspense>
      
      <RoleIndicator role={userRole} onChangeRole={handleChangeRole} />
      
      <Hero />
      
      <Suspense fallback={<LoadingDots />}>
        <RoleBasedWelcome role={userRole} />
      </Suspense>
      
      <Suspense fallback={<LoadingDots />}>
        {config.showAvailabilityStatus && (
          <LazySection>
            <AvailabilityStatus />
          </LazySection>
        )}
        
        {config.showCompanySlider && (
          <LazySection>
            <CompanySlider />
          </LazySection>
        )}
        
        {config.showAbout && (
          <LazySection>
            <About />
          </LazySection>
        )}
        
        {config.showQuickStats && (
          <LazySection>
            <QuickStats />
          </LazySection>
        )}
        
        {config.showInteractiveSkills && (
          <LazySection>
            <InteractiveSkills />
          </LazySection>
        )}
        
        {config.showProjects && (
          <LazySection>
            <Projects />
          </LazySection>
        )}
        
        {config.showInteractiveTimeline && (
          <LazySection>
            <InteractiveTimeline />
          </LazySection>
        )}
        
        {config.showWhyHireMe && (
          <LazySection>
            <WhyHireMe />
          </LazySection>
        )}
        
        {config.showBlog && (
          <LazySection>
            <Blog />
          </LazySection>
        )}
        
        {config.showTestimonials && (
          <LazySection>
            <Testimonials />
          </LazySection>
        )}
        
        {config.showVisitorActions && (
          <LazySection>
            <VisitorActions />
          </LazySection>
        )}
        
        {config.showDevOpsConsole && (
          <LazySection>
            <DevOpsConsole />
          </LazySection>
        )}
        
        {config.showBackendDatabase && (
          <LazySection>
            <div className="px-4 sm:px-6 lg:px-8 py-12">
              <BackendDatabase />
            </div>
          </LazySection>
        )}
        
        <LazySection>
          <Contact />
        </LazySection>
        
        <FloatingActions />
        <AIChatbot />
        <EasterEggs />
      </Suspense>
    </div>
  );
}