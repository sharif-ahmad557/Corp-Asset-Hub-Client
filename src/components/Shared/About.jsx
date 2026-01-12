import React from "react";
import { Link } from "react-router-dom"; // Added for navigation
import { motion } from "framer-motion";
import {
  FaRocket,
  FaLightbulb,
  FaUsers,
  FaShieldAlt,
  FaLinkedinIn,
  FaTwitter,
  FaGlobe,
  FaCheckCircle,
} from "react-icons/fa";

// Data
const teamMembers = [
  {
    name: "Alex Johnson",
    role: "CEO & Founder",
    bio: "Visionary leader with 15+ years in SaaS and logistics.",
    img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400",
  },
  {
    name: "Sarah Williams",
    role: "Head of Product",
    bio: "Product strategist obsessed with user experience.",
    img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400",
  },
  {
    name: "Michael Chen",
    role: "Lead Engineer",
    bio: "Full-stack wizard ensuring 99.9% uptime.",
    img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400",
  },
  {
    name: "Emily Davis",
    role: "Marketing Director",
    bio: "Creative mind bridging the gap between tech and people.",
    img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400",
  },
];

const values = [
  {
    icon: <FaLightbulb />,
    title: "Innovation First",
    desc: "We don't just follow trends; we set them. Continuous improvement is in our DNA.",
  },
  {
    icon: <FaShieldAlt />,
    title: "Uncompromised Security",
    desc: "Your data is our most valuable asset. We treat it with the highest level of protection.",
  },
  {
    icon: <FaUsers />,
    title: "Customer Obsession",
    desc: "We build for you. Every feature, every update is driven by user feedback.",
  },
];

// --- Animation Variants ---
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const About = () => {
  return (
    <div className="bg-base-100 min-h-screen overflow-x-hidden pt-16">
      {/* 1. Hero Section with Zoom Effect */}
      <div className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1600&auto=format&fit=crop')",
          }}
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          transition={{ duration: 10, ease: "linear" }}
        ></motion.div>
        {/* Dark Overlay with Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-base-100 z-10"></div>

        <div className="relative z-20 text-center max-w-4xl px-6">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="inline-block py-1 px-3 rounded-full bg-blue-500/20 text-blue-400 font-bold tracking-widest uppercase text-xs mb-4 border border-blue-500/30 backdrop-blur-sm"
          >
            Since 2024
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight"
          >
            Redefining <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-violet-400">
              Asset Management
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-gray-200 text-xl max-w-2xl mx-auto leading-relaxed"
          >
            <strong>AssetMinder</strong> is more than just a tool. It's a
            complete ecosystem designed to bring clarity to your inventory
            chaos.
          </motion.p>
        </div>
      </div>

      {/* 2. Our Story Section (Slide In) */}
      <section className="py-24 px-6 lg:px-16 max-w-7xl mx-auto overflow-hidden">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <motion.div
            className="flex-1"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="h-1 w-10 bg-primary rounded-full"></span>
              <span className="text-primary font-bold uppercase tracking-wider text-sm">
                Our Story
              </span>
            </div>
            <h2 className="text-4xl font-bold mb-6 text-base-content">
              From Chaos to{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-violet-600">
                Clarity
              </span>
            </h2>
            <p className="text-base-content/70 text-lg leading-relaxed mb-6">
              It started with a simple problem: "Where is that laptop?" <br />
              <br />
              In 2024, our founders realized that businesses were losing
              millions annually due to poor asset tracking. Spreadsheets were
              error-prone, and existing software was too clunky.
            </p>
            <p className="text-base-content/70 text-lg leading-relaxed">
              Thus, <strong>AssetMinder</strong> was born. We combined modern
              cloud technology with intuitive design to create a platform that
              HR and IT managers actually enjoy using.
            </p>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                "Smart Tracking",
                "AI Insights",
                "Cloud Sync",
                "Secure Data",
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 font-medium text-base-content/80"
                >
                  <FaCheckCircle className="text-success text-xl" /> {item}
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="flex-1 relative w-full"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="relative z-10 rounded-2xl overflow-hidden shadow-2xl border border-base-200"
            >
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&auto=format&fit=crop"
                alt="Office Culture"
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-blue-600/10 mix-blend-overlay"></div>
            </motion.div>

            {/* Animated Blobs */}
            <motion.div
              animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
              className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-600/10 rounded-full blur-3xl -z-0"
            ></motion.div>
            <motion.div
              animate={{ y: [0, 20, 0], x: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 7, ease: "easeInOut" }}
              className="absolute -top-10 -left-10 w-40 h-40 bg-violet-600/10 rounded-full blur-3xl -z-0"
            ></motion.div>
          </motion.div>
        </div>
      </section>

      {/* 3. Core Values (Staggered Cards) */}
      <section className="bg-base-200 py-24 relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-16 relative z-10">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl font-bold mb-4 text-base-content"
            >
              Our Core Values
            </motion.h2>
            <p className="text-base-content/60 max-w-2xl mx-auto text-lg">
              The principles that guide every line of code we write and every
              decision we make.
            </p>
          </div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {values.map((item, idx) => (
              <motion.div
                key={idx}
                variants={fadeInUp}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                // Req #3: Consistent Card Design
                className="bg-base-100 p-8 rounded-2xl shadow-xl border-t-4 border-primary h-full flex flex-col"
              >
                <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-xl flex items-center justify-center text-2xl mb-6 shadow-sm">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-base-content">
                  {item.title}
                </h3>
                <p className="text-base-content/70 leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 4. Stats Section (Scale Up) */}
      <section className="py-20 bg-gradient-to-r from-blue-900 to-violet-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center relative z-10">
          {[
            { label: "Active Users", value: "10K+" },
            { label: "Companies", value: "500+" },
            { label: "Assets Tracked", value: "1M+" },
            { label: "Uptime", value: "99.9%" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, type: "spring", stiffness: 100 }}
            >
              <h3 className="text-4xl lg:text-5xl font-extrabold mb-2">
                {stat.value}
              </h3>
              <p className="text-blue-200 uppercase tracking-wider text-sm font-semibold">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 5. Team Section (Staggered + Image Zoom) */}
      <section className="py-24 max-w-7xl mx-auto px-6 lg:px-16">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="badge badge-primary badge-outline mb-4 font-semibold px-4 py-3"
          >
            LEADERSHIP
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
            className="text-3xl font-bold mb-4 text-base-content"
          >
            Meet the Minds
          </motion.h2>
          <p className="text-base-content/60 text-lg">
            The passionate people behind AssetMinder.
          </p>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {teamMembers.map((member, idx) => (
            <motion.div
              key={idx}
              variants={fadeInUp}
              className="group bg-base-100 rounded-2xl shadow-xl overflow-hidden border border-base-200 h-full flex flex-col"
            >
              <div className="relative overflow-hidden h-64 w-full">
                <motion.img
                  src={member.img}
                  alt={member.name}
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4 text-white">
                  {/* Functional placeholders for social links */}
                  <div className="p-2 bg-white/20 rounded-full hover:bg-blue-600 transition-colors cursor-pointer">
                    <FaLinkedinIn />
                  </div>
                  <div className="p-2 bg-white/20 rounded-full hover:bg-blue-400 transition-colors cursor-pointer">
                    <FaTwitter />
                  </div>
                </div>
              </div>
              <div className="p-6 text-center flex-grow flex flex-col justify-center">
                <h3 className="text-xl font-bold mb-1 text-base-content">
                  {member.name}
                </h3>
                <p className="text-primary font-semibold text-xs mb-3 uppercase tracking-wide">
                  {member.role}
                </p>
                <p className="text-base-content/60 text-sm italic">
                  "{member.bio}"
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* 6. CTA Section (Pop Up) */}
      <section className="py-20 px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto bg-base-200 rounded-3xl p-10 lg:p-16 text-center border border-base-300 shadow-2xl relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl group-hover:bg-blue-500/20 transition-colors duration-500"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-violet-500/10 rounded-full blur-3xl group-hover:bg-violet-500/20 transition-colors duration-500"></div>

          <h2 className="text-3xl lg:text-4xl font-bold mb-6 relative z-10 text-base-content">
            Ready to streamline your operations?
          </h2>
          <p className="text-lg text-base-content/70 mb-8 max-w-xl mx-auto relative z-10">
            Join thousands of companies using <strong>AssetMinder</strong> to
            manage their inventory efficiently.
          </p>
          <Link
            to="/join-hr"
            className="btn btn-primary btn-lg rounded-full px-8 bg-gradient-to-r from-blue-600 to-violet-600 border-none text-white shadow-lg hover:shadow-blue-500/40 relative z-10 hover:scale-105 transition-transform"
          >
            Get Started Today
          </Link>
        </motion.div>
      </section>
    </div>
  );
};

export default About;
