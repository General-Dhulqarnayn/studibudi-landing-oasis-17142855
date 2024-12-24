import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export const CTA = () => {
  return (
    <section className="py-20 bg-primary">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-white mb-6"
          >
            Ready to join your perfect community?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-white/90 mb-10"
          >
            Start connecting with like-minded students today and build lasting
            relationships.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Button
              size="lg"
              className="bg-white text-primary hover:bg-gray-50 px-8 py-6 text-lg"
            >
              Get Started Now
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};