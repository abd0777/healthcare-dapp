import { User, UserCheck, Lock, Zap, Check } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      number: "01",
      icon: User,
      title: "Patient Registration",
      description:
        "Patients securely register their identity and medical history on the blockchain network with cryptographic verification.",
      features: [
        "Identity verification",
        "Medical history upload",
        "Privacy controls",
        "Consent management",
      ],
      mockup: "Patient creates secure digital identity",
      status: "Active",
    },
    {
      number: "02",
      icon: UserCheck,
      title: "Provider Authentication",
      description:
        "Healthcare providers are verified and granted appropriate access levels based on their credentials and patient consent.",
      features: [
        "Credential verification",
        "Role-based access",
        "Multi-factor authentication",
        "Audit logging",
      ],
      mockup: "Doctor accesses patient records",
      status: "Verified",
    },
    {
      number: "03",
      icon: Lock,
      title: "Secure Data Exchange",
      description:
        "Medical data is encrypted and shared between authorized parties using smart contracts and automated consent protocols.",
      features: [
        "End-to-end encryption",
        "Smart contracts",
        "Automated consent",
        "Real-time sync",
      ],
      mockup: "Secure data transmission in progress",
      status: "Encrypted",
    },
    {
      number: "04",
      icon: Zap,
      title: "Automated Processing",
      description:
        "Insurance claims, prescriptions, and treatment approvals are automatically processed using predefined smart contract rules.",
      features: [
        "Automated workflows",
        "Instant approvals",
        "Reduced paperwork",
        "Cost savings",
      ],
      mockup: "Processing insurance claim...",
      status: "Processing",
    },
  ];

  return (
    <section id="how-it-works" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            Simple Process
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            How HealthChain Works
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our streamlined blockchain process ensures secure, efficient, and
            transparent healthcare data management in four simple steps.
          </p>
        </div>

        {/* Steps */}
        <div className="max-w-6xl mx-auto relative">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-20 left-1/2 transform -translate-x-1/2 w-px h-full bg-gradient-to-b from-primary via-primary to-transparent opacity-20" />

          {steps.map((step, index) => (
            <div
              key={index}
              className={`relative mb-16 ${
                index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
              } flex flex-col lg:flex items-center`}
            >
              {/* Step Content */}
              <div
                className={`w-full lg:w-1/2 ${
                  index % 2 === 0 ? "lg:pr-12" : "lg:pl-12"
                } mb-8 lg:mb-0`}
              >
                <div className="bg-card border border-border rounded-lg p-8 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mr-4">
                      <step.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="text-4xl font-bold text-primary/30">
                      {step.number}
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-foreground mb-4">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {step.description}
                  </p>

                  <div className="space-y-3">
                    {step.features.map((feature, i) => (
                      <div key={i} className="flex items-center">
                        <Check className="w-4 h-4 text-primary mr-3 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Step Visualization */}
              <div
                className={`w-full lg:w-1/2 ${
                  index % 2 === 0 ? "lg:pl-12" : "lg:pr-12"
                }`}
              >
                <div className="bg-muted/50 border border-border rounded-lg p-8 text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <step.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h4 className="font-semibold text-foreground mb-2">
                    {step.mockup}
                  </h4>
                  <div className="inline-flex items-center px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                    <div className="w-2 h-2 bg-primary rounded-full mr-2 animate-pulse" />
                    {step.status}
                  </div>
                </div>
              </div>

              {/* Step Number Circle */}
              <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 w-12 h-12 bg-primary rounded-full items-center justify-center text-primary-foreground font-bold text-lg shadow-lg">
                {index + 1}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <p className="text-muted-foreground mb-6">
            Ready to transform your healthcare operations with blockchain?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-primary text-primary-foreground px-8 py-3 rounded-md hover:bg-primary/90 transition-colors">
              Start Implementation
            </button>
            <button className="border border-input bg-background px-8 py-3 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors">
              Technical Documentation
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
