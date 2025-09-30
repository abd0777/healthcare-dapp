import { Mail, Phone, MapPin, ArrowRight } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-muted/30 border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="md:col-span-1">
            <h3 className="text-2xl font-bold text-primary mb-4">
              HealthChain
            </h3>
            <p className="text-muted-foreground mb-4">
              Transforming healthcare through secure, transparent blockchain
              technology.
            </p>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>contact@healthchain.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>San Francisco, CA</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-1">
            <h4 className="font-semibold text-foreground mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a
                  href="#benefits"
                  className="hover:text-primary transition-colors"
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="#how-it-works"
                  className="hover:text-primary transition-colors"
                >
                  How It Works
                </a>
              </li>
              <li>
                <a
                  href="#results"
                  className="hover:text-primary transition-colors"
                >
                  Results
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  className="hover:text-primary transition-colors"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="hover:text-primary transition-colors"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="md:col-span-1">
            <h4 className="font-semibold text-foreground mb-4">Resources</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Documentation
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  API Reference
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Case Studies
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  White Papers
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Support
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="md:col-span-1">
            <h4 className="font-semibold text-foreground mb-4">Stay Updated</h4>
            <p className="text-sm text-muted-foreground mb-4">
              Get the latest updates on blockchain healthcare innovations.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-3 py-2 text-sm border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <button className="bg-primary text-primary-foreground px-3 py-2 rounded-md hover:bg-primary/90 transition-colors">
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border mt-12 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © 2024 HealthChain. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-muted-foreground mt-4 md:mt-0">
            <a href="#" className="hover:text-primary transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              HIPAA Compliance
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
