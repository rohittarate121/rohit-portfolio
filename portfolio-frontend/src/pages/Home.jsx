import Hero from "../components/sections/Hero.jsx";
import About from "../components/sections/About.jsx";
import Skills from "../components/sections/Skills.jsx";
import Experience from "../components/sections/Experience.jsx";
import Projects from "../components/sections/Projects.jsx";
import Certifications from "../components/sections/Certifications.jsx";
import Resume from "../components/sections/Resume.jsx";
import CodingProfiles from "../components/sections/CodingProfiles.jsx";
import Contact from "../components/sections/Contact.jsx";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Certifications />
      <Resume />
      <CodingProfiles />
      <Contact />
    </>
  );
}
