import { Shield, Activity, Lock, ArrowRight } from "lucide-react";
import Button from "../components/Button";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-background overflow-hidden">
      {/* Background Elements - Reduced opacity and size for light theme */}
      <div className="absolute top-20 left-10 w-48 h-48 bg-primary/5 rounded-full blur-3xl animate-float" />
      <div
        className="absolute bottom-20 right-10 w-64 h-64 bg-secondary/10 rounded-full blur-3xl animate-float"
        style={{ animationDelay: "1s" }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 animate-fade-in">
            Revolutionize Healthcare with{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
              Blockchain
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto animate-slide-up">
            Secure, transparent, and interoperable healthcare data management
            powered by cutting-edge blockchain technology. Transform patient
            care with immutable records and smart contract automation.
          </p>

          {/* CTA Buttons */}
          <div
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-slide-up"
            style={{ animationDelay: "0.2s" }}
          >
            <Button size="lg" className="text-lg px-8 py-4 h-auto">
              Explore Features
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="text-lg px-8 py-4 h-auto"
            >
              Request Demo
            </Button>
          </div>

          {/* Trust Indicators */}
          <div
            className="flex items-center justify-center gap-4 mb-16 animate-slide-up"
            style={{ animationDelay: "0.4s" }}
          >
            <div className="flex -space-x-2">
              {["JD", "AM", "SK", "RN"].map((initials, i) => (
                <div
                  key={i}
                  className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-primary-foreground text-sm font-medium border-2 border-background"
                >
                  {initials}
                </div>
              ))}
            </div>
            <p className="text-muted-foreground">
              <span className="font-semibold text-foreground">500+</span>{" "}
              healthcare providers trust us
            </p>
          </div>
        </div>

        {/* Feature Cards */}
        <div
          className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto animate-slide-up"
          style={{ animationDelay: "0.6s" }}
        >
          {[
            {
              icon: Shield,
              title: "Immutable Security",
              description:
                "Patient data protected by cryptographic hashing and distributed ledger technology",
            },
            {
              icon: Activity,
              title: "Smart Contracts",
              description:
                "Automated workflows for insurance claims, prescriptions, and treatment protocols",
            },
            {
              icon: Lock,
              title: "Access Control",
              description:
                "Granular permissions ensuring only authorized personnel can access sensitive data",
            },
          ].map((feature, i) => (
            <div
              key={i}
              className="bg-card/90 backdrop-blur-sm border border-border/70 rounded-lg p-6 hover:bg-card transition-all duration-300"
            >
              <feature.icon className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div
          className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto mt-20 animate-slide-up"
          style={{ animationDelay: "0.8s" }}
        >
          {[
            { number: "99.9%", label: "Uptime Reliability" },
            { number: "500+", label: "Healthcare Partners" },
            { number: "2M+", label: "Patient Records Secured" },
            { number: "40%", label: "Faster Processing" },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                {stat.number}
              </div>
              <div className="text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
