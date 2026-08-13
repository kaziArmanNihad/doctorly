import Hero from "./Hero";
import Feature from "./Feature";
import About from "./About";
import Story from "./Story";
import Valus from "./Valus";
import CTA from "./CTA";
import PulseDivider from "../shared/PulseDivider";

export default function DoctorlyHome() {
  return (
    <div className="min-h-screen w-full bg-[#F6F5F0] font-sans text-[#16241F] antialiased">
      <Hero />
      <PulseDivider className="mt-16" />
      <Feature />
      <PulseDivider className="mt-16" />
      <About />
      <PulseDivider className="mt-16" />
      <Story />
      <PulseDivider className="mt-16" />
      <Valus />
      <PulseDivider className="mt-16" />
      <CTA />
    </div>
  );
}
