import { motion } from "framer-motion";
import { Users, Sparkles, Globe } from "lucide-react";

const features = [
  {
    icon: Users,
    title: "Connect with Peers",
    description:
      "Find and connect with students who share your interests and academic goals.",
  },
  {
    icon: Sparkles,
    title: "Discover Opportunities",
    description:
      "Access exclusive events, workshops, and networking opportunities.",
  },
  {
    icon: Globe,
    title: "Global Community",
    description:
      "Join a diverse community of students from around the world.",
  },
];

export const Features = () => {
  return (
    <section id="features" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-primary font-medium"
          >
            Features
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-gray-900 mt-2"
          >
            Everything you need to succeed
          </motion.h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <feature.icon className="w-12 h-12 text-primary mb-6" />
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};