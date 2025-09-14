import Navbar from '../components/Navbar.jsx'; 
import Hero from '../components/Hero.jsx';

function LandingPage() {
  return (
    <div>
      <div className="min-h-screen w-full bg-[#020617] relative">
        {/* Magenta Orb Grid Background */}
        <div
          className="absolute inset-0 z-0"
          style={{
            background: "#020617",
            backgroundImage: `
              linear-gradient(to right, rgba(71,85,105,0.15) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(71,85,105,0.15) 1px, transparent 1px),
              radial-gradient(circle at 50% 60%, rgba(236,72,153,0.15) 0%, rgba(168,85,247,0.05) 40%, transparent 70%)
            `,
            backgroundSize: "40px 40px, 40px 40px, 100% 100%",
          }}
        />

        <Navbar />
        <Hero />

        {/* Image + Description Section */}
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-center gap-12 px-8 py-20 max-w-6xl mx-auto">
          {/* Left: Image */}
          <div className="w-full md:w-1/2">
            <img
              src="/img.jpg"
              alt="Healthcare Illustration"
              className="rounded-xl shadow-lg"
            />
          </div>

          {/* Right: Description */}
          <div className="w-full md:w-1/2 text-center md:text-left">
            <h2 className="text-3xl text-white md:text-4xl font-bold mb-6">
              Blockchain-Powered Healthcare Ledger
            </h2>
            <p className="text-lg text-gray-300 leading-relaxed mb-6">
              HealthLedger leverages blockchain to provide secure, transparent,
              and tamper-proof management of healthcare records. Patients gain
              full control over their data while enabling trusted and seamless
              access for healthcare providers.
            </p>
            <button className="px-6 py-3 bg-pink-500 rounded-lg hover:bg-pink-600 transition">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;