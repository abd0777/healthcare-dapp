import { TrendingUp, Clock, Shield, Users } from "lucide-react";

const Results = () => {
  const metrics = [
    {
      icon: TrendingUp,
      value: "87%",
      label: "Reduction in Data Breaches",
      description:
        "Healthcare organizations using our blockchain solution report significantly fewer security incidents",
      trend: "+12% vs last year",
    },
    {
      icon: Clock,
      value: "65%",
      label: "Faster Processing Times",
      description:
        "Automated smart contracts reduce administrative overhead and speed up claim processing",
      trend: "3.2x improvement",
    },
    {
      icon: Shield,
      value: "99.98%",
      label: "Data Integrity Score",
      description:
        "Immutable blockchain records ensure unprecedented data accuracy and auditability",
      trend: "Industry leading",
    },
    {
      icon: Users,
      value: "500K+",
      label: "Patients Protected",
      description:
        "Growing network of healthcare providers securing patient data with blockchain technology",
      trend: "+150% growth",
    },
  ];

  const testimonials = [
    {
      quote:
        "HealthChain has revolutionized how we manage patient data. The security and interoperability are unmatched.",
      author: "Dr. Sarah Chen",
      position: "Chief Medical Officer",
      organization: "Metropolitan Health System",
    },
    {
      quote:
        "We've seen a 40% reduction in administrative costs since implementing HealthChain's blockchain solution.",
      author: "Mark Rodriguez",
      position: "IT Director",
      organization: "Regional Medical Center",
    },
    {
      quote:
        "The patient consent management system has transformed how we handle data sharing across our network.",
      author: "Dr. Emily Watson",
      position: "Privacy Officer",
      organization: "Healthcare Alliance",
    },
  ];

  return (
    <section id="results" className="py-20 bg-muted/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            Proven Results
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Real Impact on Healthcare
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            See how healthcare organizations are transforming their operations
            with blockchain technology
          </p>
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8 mb-20">
          {metrics.map((metric, index) => (
            <div
              key={index}
              className="bg-card border border-border rounded-lg p-6 text-center hover:shadow-lg transition-all duration-300"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <metric.icon className="w-6 h-6 text-primary" />
              </div>
              <div className="text-3xl font-bold text-foreground mb-2">
                {metric.value}
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-3">
                {metric.label}
              </h3>
              <p className="text-muted-foreground text-sm mb-3">
                {metric.description}
              </p>
              <div className="text-xs text-primary font-medium">
                {metric.trend}
              </div>
            </div>
          ))}
        </div>

        <div className="max-w-6xl mx-auto">
          <h3 className="text-2xl md:text-3xl font-bold text-center text-foreground mb-12">
            What Healthcare Leaders Say
          </h3>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-all duration-300"
              >
                <div className="mb-4">
                  <div className="flex text-primary mb-2">
                    {[...Array(5)].map((_, i) => (
                      <span key={i}>★</span>
                    ))}
                  </div>
                  <blockquote className="text-foreground leading-relaxed">
                    "{testimonial.quote}"
                  </blockquote>
                </div>
                <div className="border-t border-border pt-4">
                  <div className="font-semibold text-foreground">
                    {testimonial.author}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {testimonial.position}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {testimonial.organization}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-16">
          <p className="text-muted-foreground mb-6">
            Join hundreds of healthcare organizations already benefiting from
            blockchain technology
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-primary text-primary-foreground px-8 py-3 rounded-md hover:bg-primary/90 transition-colors">
              View Case Studies
            </button>
            <button className="border border-input bg-background px-8 py-3 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors">
              Schedule Demo
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Results;
