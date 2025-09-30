import {
  Shield,
  Zap,
  Users,
  Globe,
  Lock,
  TrendingUp,
  Clock,
  Award,
} from "lucide-react";

const Benefits = () => {
  const benefits = [
    {
      icon: Shield,
      title: "Enhanced Security",
      description:
        "Military-grade encryption and immutable blockchain records ensure your healthcare data is protected against breaches and unauthorized access.",
      features: [
        "256-bit encryption",
        "Immutable audit trails",
        "Zero-knowledge proofs",
        "Multi-signature security",
      ],
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description:
        "Process transactions and access patient records in real-time with our optimized blockchain infrastructure and smart caching systems.",
      features: [
        "Sub-second queries",
        "Real-time sync",
        "Edge computing",
        "Optimized protocols",
      ],
      color: "from-yellow-500 to-orange-500",
    },
    {
      icon: Users,
      title: "Seamless Collaboration",
      description:
        "Enable secure data sharing between healthcare providers, patients, and authorized parties with granular permission controls.",
      features: [
        "Role-based access",
        "Consent management",
        "Cross-platform sync",
        "API integrations",
      ],
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: Globe,
      title: "Global Interoperability",
      description:
        "Connect with healthcare systems worldwide using standardized protocols and ensure data portability across borders and platforms.",
      features: [
        "HL7 FHIR support",
        "Cross-border compliance",
        "Multi-language support",
        "Universal standards",
      ],
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: Lock,
      title: "Privacy by Design",
      description:
        "Built with privacy-first principles, ensuring patient data remains confidential while enabling necessary healthcare operations.",
      features: [
        "HIPAA compliant",
        "GDPR ready",
        "Data minimization",
        "Pseudonymization",
      ],
      color: "from-red-500 to-rose-500",
    },
    {
      icon: TrendingUp,
      title: "Cost Effective",
      description:
        "Reduce administrative overhead and operational costs through automation and elimination of intermediaries in healthcare processes.",
      features: [
        "Reduced paperwork",
        "Automated billing",
        "Lower admin costs",
        "Efficient workflows",
      ],
      color: "from-indigo-500 to-blue-500",
    },
    {
      icon: Clock,
      title: "24/7 Availability",
      description:
        "Access your healthcare data anytime, anywhere with our globally distributed blockchain network ensuring maximum uptime.",
      features: [
        "99.9% uptime SLA",
        "Global redundancy",
        "Disaster recovery",
        "Mobile access",
      ],
      color: "from-teal-500 to-cyan-500",
    },
    {
      icon: Award,
      title: "Certified Excellence",
      description:
        "Meet the highest industry standards and regulatory requirements with our certified blockchain healthcare platform.",
      features: [
        "SOC 2 Type II",
        "ISO 27001",
        "FDA guidelines",
        "Regular audits",
      ],
      color: "from-amber-500 to-yellow-500",
    },
  ];

  return (
    <section id="benefits" className="py-20 bg-muted/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Why Choose Blockchain for Healthcare?
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover the transformative benefits of implementing blockchain
            technology in your healthcare infrastructure.
          </p>
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="group bg-card border border-border rounded-lg p-8 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex items-center mb-6">
                <div
                  className={`w-12 h-12 rounded-lg bg-gradient-to-r ${benefit.color} p-2.5 mr-4`}
                >
                  <benefit.icon className="w-full h-full text-white" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">
                  {benefit.title}
                </h3>
              </div>

              <p className="text-muted-foreground mb-6 leading-relaxed">
                {benefit.description}
              </p>

              <div className="space-y-2">
                {benefit.features.map((feature, i) => (
                  <div key={i} className="flex items-center text-sm">
                    <div
                      className={`w-2 h-2 rounded-full bg-gradient-to-r ${benefit.color} mr-3`}
                    />
                    <span className="text-muted-foreground">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
