import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToWaitlist = () => {
    const waitlistSection = document.querySelector('#waitlist-section');
    if (waitlistSection) {
      waitlistSection.scrollIntoView({ behavior: 'smooth' });
      // Add highlight class to input
      const emailInput = document.querySelector('#waitlist-email');
      if (emailInput) {
        emailInput.classList.add('highlight-input');
        // Remove the class after animation completes
        setTimeout(() => {
          emailInput.classList.remove('highlight-input');
        }, 2000);
      }
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/80 backdrop-blur-lg shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <span className="text-2xl font-bold text-gray-800">studibudi</span>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <a
              href="#features"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Features
            </a>
            <Button
              variant="default"
              className="bg-primary hover:bg-primary-hover transition-colors"
              onClick={scrollToWaitlist}
            >
              Join Now
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};