import AboutHero from "./AboutHero";
import AboutStory from "./AboutStory";
import AboutValus from "./AboutValus";
import PulseDivider from "../pages/shared/PulseDivider";
import AboutCTC from "./AboutCTC";

function Page() {
  return (
    <div className="min-h-screen w-full bg-[#F6F5F0] font-sans text-[#16241F] antialiased">
      <AboutHero />
      <PulseDivider />
      <AboutStory />
      <PulseDivider />
      <AboutValus />
      <AboutCTC />
    </div>
  );
}

export default Page;
