import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { CTA } from "@/components/CTA";
import { WaitlistForm } from "@/components/WaitlistForm";

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <WaitlistForm />
      <Hero />
      <Features />
      <CTA />
    </div>
  );
};

export default Index;