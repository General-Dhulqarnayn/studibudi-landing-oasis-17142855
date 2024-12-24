import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { WaitlistForm } from "./WaitlistForm";

export const Hero = () => {
  return (
    <section className="pt-32 pb-20 px-6 min-h-screen flex items-center bg-gradient-to-b from-white to-muted">
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-block px-4 py-1 mb-6 text-sm font-medium text-primary bg-primary/10 rounded-full"
          >
            Join the Community
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight"
          >
            Find Your Tribe,
            <br />
            Build Your Network
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-gray-600 mb-10"
          >
            Connect with like-minded students for fun, friendships, and future
            opportunities.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button
              size="lg"
              className="bg-primary hover:bg-primary-hover text-white px-8 py-6 text-lg transition-all transform hover:scale-105"
            >
              Get Started
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-2 px-8 py-6 text-lg hover:bg-gray-50 transition-all"
            >
              Explore Communities
            </Button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16 max-w-2xl mx-auto"
        >
          <WaitlistForm />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-16 max-w-5xl mx-auto"
        >
          <img
            src="/lovable-uploads/d909017e-47d3-4383-b7af-3895d7fd23a9.png"
            alt="Group of diverse students studying together outside campus building"
            className="w-full h-auto rounded-2xl shadow-2xl animate-float"
          />
        </motion.div>
      </div>
    </section>
  );
};