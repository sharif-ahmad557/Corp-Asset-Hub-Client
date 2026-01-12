import React from "react";
import { motion } from "framer-motion";
import { FaUserPlus, FaBoxOpen, FaChartLine } from "react-icons/fa";

const HowItWorks = () => {
  const steps = [
    {
      id: 1,
      title: "Create Account",
      desc: "Sign up as an HR Manager or Employee in less than 2 minutes.",
      icon: <FaUserPlus />,
    },
    {
      id: 2,
      title: "Add Assets",
      desc: "Import your inventory via CSV or scan barcodes to add items instantly.",
      icon: <FaBoxOpen />,
    },
    {
      id: 3,
      title: "Track & Optimize",
      desc: "Assign assets to teams, track locations, and get lifecycle reports.",
      icon: <FaChartLine />,
    },
  ];

  return (
    <section className="py-24 bg-base-200">
      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="badge badge-primary badge-outline mb-4 font-semibold px-4 py-3"
          >
            WORKFLOW
          </motion.div>
          <h2 className="text-4xl font-bold mb-4 text-base-content">
            Get Started in <span className="text-primary">3 Easy Steps</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connecting Line (Desktop Only) */}
          <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-1 bg-gradient-to-r from-blue-600/20 to-violet-600/20 -z-0 border-t-2 border-dashed border-base-content/20"></div>

          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              viewport={{ once: true }}
              className="relative z-10 flex flex-col items-center text-center"
            >
              <div className="w-24 h-24 rounded-full bg-base-100 border-4 border-base-200 shadow-xl flex items-center justify-center text-3xl text-primary mb-6 group hover:scale-110 transition-transform duration-300">
                {step.icon}
              </div>
              <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
              <p className="text-base-content/70 max-w-xs">{step.desc}</p>

              {/* Step Number Badge */}
              <div className="absolute top-0 right-1/3 md:right-10 bg-primary text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shadow-lg">
                {step.id}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
