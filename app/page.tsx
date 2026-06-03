import { Header } from "@/components/layout/Header";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Journey } from "@/components/sections/Journey";
import { Products } from "@/components/sections/Products";
import { Experience } from "@/components/sections/Experience";
import { Education } from "@/components/sections/Education";
import { Expertise } from "@/components/sections/Expertise";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Journey />
        <Products />
        <Experience />
        <Education />
        <Expertise />
      </main>
      <Contact />
    </>
  );
}
