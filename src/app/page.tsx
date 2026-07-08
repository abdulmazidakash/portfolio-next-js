import ContactInformation from "@/components/modules/contact/ContactInformation";
import Education from "@/components/modules/education/Education";
import SkillsSection from "@/components/modules/skills/SkillsSection";
import Projects from "@/components/modules/projects/projects";
import Hero from "@/components/modules/hero/Hero";
import AboutMe from "@/components/modules/about/AboutMe";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-white dark:bg-slate-950 transition-colors duration-500">
      {/* Radial Glow */}
      <div
        className="fixed inset-0 pointer-events-none opacity-10 dark:opacity-5"
        style={{
          backgroundImage:
            "radial-gradient(circle at 50% 0%, #3b82f6 0%, transparent 60%)",
        }}
      />

      {/* Grid */}
      <div
        className="fixed inset-0 pointer-events-none opacity-10 dark:opacity-5"
        style={{
          backgroundImage:
            "linear-gradient(rgba(100,100,100,.15) 1px, transparent 1px), linear-gradient(90deg, rgba(100,100,100,.15) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10">
        <Hero />
        <AboutMe />
        <SkillsSection />
        <Projects />
        <Education />
        <ContactInformation />
      </div>
    </main>
  );
}