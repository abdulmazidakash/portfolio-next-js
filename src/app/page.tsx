

import AboutMe from "@/components/AboutMe";
import ContactInformation from "@/components/modules/contact/ContactInformation";
import Education from "@/components/modules/education/Education";
import SkillsSection from "@/components/modules/skills/SkillsSection";
import Projects from "@/components/modules/projects/projects";
import Hero from "@/components/modules/hero/Hero";

export default function Home() {
  return (
    <div className="pt-16 container mx-auto">
      <Hero />
      <AboutMe />
      <Projects />
      <SkillsSection />
      <Education />
      <ContactInformation />
    </div>
  );
}