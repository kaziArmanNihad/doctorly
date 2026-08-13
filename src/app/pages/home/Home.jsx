import Hero from "./Hero";
import Feature from "./Feature";
import CTA from "./CTA";
import PulseDivider from "../shared/PulseDivider";

export default function DoctorlyHome() {
  return (
    <div className="min-h-screen w-full bg-[#F6F5F0] font-sans text-[#16241F] antialiased">
      <Hero />
      <PulseDivider className="mt-16" />
      <Feature />
      <PulseDivider className="mt-16" />
      <CTA />
    </div>
  );
}
