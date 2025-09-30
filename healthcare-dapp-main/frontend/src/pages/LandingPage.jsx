import Hero from "../components/Hero";
import Benefits from "../components/Benefits";
import Results from "../components/Results";
import HowItWorks from "../components/HowItWorks";
import CTA from "../components/CTA";

// Renamed export to LandingPage to match App.jsx usage
const LandingPage = () => {
  return (
    <div className="pt-16">
      <Hero />
      <Results />
      <Benefits />
      <HowItWorks />
      <CTA />
    </div>
  );
};

export default LandingPage;
