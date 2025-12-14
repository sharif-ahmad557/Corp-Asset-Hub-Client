import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaPaperPlane,
  FaLinkedinIn,
  FaTwitter,
  FaFacebookF,
  FaInstagram,
  FaChevronDown,
} from "react-icons/fa";

const Contact = () => {
  const [activeAccordion, setActiveAccordion] = useState(null);

  const toggleAccordion = (index) => {
    setActiveAccordion(activeAccordion === index ? null : index);
  };

  const contactInfo = [
    {
      icon: <FaEnvelope />,
      title: "Chat to us",
      desc: "Our friendly team is here to help.",
      linkText: "support@assetverse.com",
      linkUrl: "mailto:support@assetverse.com",
      color: "blue",
    },
    {
      icon: <FaMapMarkerAlt />,
      title: "Visit us",
      desc: "Come say hello at our office HQ.",
      linkText: "100 Smith Street, Collingwood VIC 3066 AU",
      linkUrl: "#",
      color: "violet",
    },
    {
      icon: <FaPhoneAlt />,
      title: "Call us",
      desc: "Mon-Fri from 8am to 5pm.",
      linkText: "+1 (555) 000-0000",
      linkUrl: "tel:+15550000000",
      color: "pink",
    },
  ];

  const faqs = [
    {
      question: "How long does it take to get a response?",
      answer:
        "We typically respond to all inquiries within 2-4 business hours. For urgent matters, please call our support line directly.",
    },
    {
      question: "Do you offer custom enterprise solutions?",
      answer:
        "Yes! We specialize in custom asset management solutions for large enterprises. Contact our sales team for a tailored demo.",
    },
    {
      question: "Is there a free trial available?",
      answer:
        "Absolutely. You can try our 'Basic' package for free for 14 days. No credit card required to start.",
    },
  ];

  return (
    <div className="min-h-screen bg-base-100 relative overflow-hidden pt-28 pb-20">
      {/* --- Background Elements --- */}
      <div className="absolute top-0 inset-x-0 h-96 bg-gradient-to-b from-base-200/50 to-transparent -z-10"></div>
      <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute top-40 -left-20 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* --- Header Section --- */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-primary font-semibold tracking-wide uppercase text-sm mb-3"
          >
            Contact Us
          </motion.h2>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl lg:text-5xl font-bold mb-6"
          >
            We’d love to hear from you
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-base-content/70"
          >
            Our team is always here to chat. Whether you have a question about
            features, pricing, or anything else, we're ready to answer all your
            questions.
          </motion.p>
        </div>

        {/* --- Contact Cards Grid --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {contactInfo.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-base-100 p-8 rounded-2xl shadow-lg border border-base-200 text-center group hover:shadow-2xl transition-all duration-300"
            >
              <div
                className={`w-14 h-14 mx-auto bg-${item.color}-100 dark:bg-${item.color}-900/20 text-${item.color}-600 rounded-xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform duration-300`}
              >
                {item.icon}
              </div>
              <h3 className="text-xl font-bold mb-2">{item.title}</h3>
              <p className="text-base-content/60 mb-6 text-sm">{item.desc}</p>
              <a
                href={item.linkUrl}
                className="text-primary font-bold hover:underline"
              >
                {item.linkText}
              </a>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* --- Left: FAQ Section --- */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-3xl font-bold mb-8">
              Frequently asked questions
            </h3>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="collapse collapse-arrow bg-base-200/50 rounded-xl border border-base-200"
                >
                  <input
                    type="radio"
                    name="my-accordion-2"
                    defaultChecked={index === 0}
                  />
                  <div className="collapse-title text-lg font-medium">
                    {faq.question}
                  </div>
                  <div className="collapse-content">
                    <p className="text-base-content/70">{faq.answer}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12">
              <h4 className="font-bold text-lg mb-4">
                Follow us on social media
              </h4>
              <div className="flex gap-4">
                {[FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram].map(
                  (Icon, idx) => (
                    <a
                      key={idx}
                      href="#"
                      className="btn btn-circle btn-outline hover:bg-primary hover:text-white hover:border-primary transition-all"
                    >
                      <Icon className="text-lg" />
                    </a>
                  )
                )}
              </div>
            </div>
          </motion.div>

          {/* --- Right: Contact Form --- */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-base-100 p-8 rounded-3xl shadow-2xl border border-base-200 relative"
          >
            <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
              <FaPaperPlane className="text-9xl text-primary transform rotate-12" />
            </div>

            <form className="space-y-6 relative z-10">
              <div className="grid grid-cols-2 gap-6">
                <div className="form-control">
                  <label className="label-text font-bold mb-2 block">
                    First name
                  </label>
                  <input
                    type="text"
                    placeholder="John"
                    className="input input-bordered w-full bg-base-200/30 focus:bg-base-100"
                  />
                </div>
                <div className="form-control">
                  <label className="label-text font-bold mb-2 block">
                    Last name
                  </label>
                  <input
                    type="text"
                    placeholder="Doe"
                    className="input input-bordered w-full bg-base-200/30 focus:bg-base-100"
                  />
                </div>
              </div>

              <div className="form-control">
                <label className="label-text font-bold mb-2 block">Email</label>
                <input
                  type="email"
                  placeholder="you@company.com"
                  className="input input-bordered w-full bg-base-200/30 focus:bg-base-100"
                />
              </div>

              <div className="form-control">
                <label className="label-text font-bold mb-2 block">
                  Message
                </label>
                <textarea
                  className="textarea textarea-bordered h-32 w-full bg-base-200/30 focus:bg-base-100"
                  placeholder="How can we help you?"
                ></textarea>
              </div>

              <button className="btn btn-primary w-full h-12 text-lg rounded-xl shadow-lg shadow-primary/20">
                Send Message
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
