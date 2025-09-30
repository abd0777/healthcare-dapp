import { ArrowRight, Shield, Headphones, Calendar } from "lucide-react";
import Button from "../components/Button";

const CTA = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-primary/10 via-primary/5 to-secondary/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          {/* Trust Indicators */}
          <div className="flex items-center justify-center gap-8 mb-8">
            <div className="flex items-center gap-2">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-xl">
                    ★
                  </span>
                ))}
              </div>
              <span className="text-muted-foreground">4.9/5</span>
            </div>
            <div className="text-muted-foreground">
              <span className="font-semibold text-foreground">500+</span>{" "}
              Healthcare Partners
            </div>
            <div className="text-muted-foreground">
              <span className="font-semibold text-foreground">2M+</span> Records
              Secured
            </div>
          </div>

          {/* Main Heading */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Ready to Secure Your Healthcare Data?
          </h2>

          <p className="text-xl text-muted-foreground mb-12 max-w-3xl mx-auto">
            Join leading healthcare organizations using blockchain technology to
            protect patient data, streamline operations, and improve patient
            outcomes.
          </p>

          {/* Benefits List */}
          <div className="flex flex-wrap justify-center gap-8 mb-12">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary" />
              <span className="text-muted-foreground">HIPAA Compliant</span>
            </div>
            <div className="flex items-center gap-2">
              <Headphones className="w-5 h-5 text-primary" />
              <span className="text-muted-foreground">24/7 Support</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" />
              <span className="text-muted-foreground">30-Day Free Trial</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button size="lg" className="text-lg px-8 py-4 h-auto">
              Start Your Free Trial
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="text-lg px-8 py-4 h-auto"
            >
              Schedule a Demo
            </Button>
          </div>

          {/* Additional Info */}
          <p className="text-sm text-muted-foreground">
            No setup fees • Cancel anytime • Implementation support included
          </p>
        </div>
      </div>
    </section>
  );
};

export default CTA;
