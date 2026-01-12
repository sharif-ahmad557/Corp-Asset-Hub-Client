import React from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaPaperPlane,
  FaLinkedinIn,
  FaTwitter,
  FaFacebookF,
  FaInstagram,
} from "react-icons/fa";

const Contact = () => {
  // Handler for form submission
  const handleMessage = (e) => {
    e.preventDefault();
    const form = e.target;
    toast.success("Message sent successfully! We'll get back to you soon.");
    form.reset();
  };

  const contactInfo = [
    {
      icon: <FaEnvelope />,
      title: "Chat to us",
      desc: "Our friendly team is here to help.",
      linkText: "support@assetminder.com",
      linkUrl: "mailto:support@assetminder.com",
      colorClass: "text-blue-600 bg-blue-100 dark:bg-blue-900/30",
    },
    {
      icon: <FaMapMarkerAlt />,
      title: "Visit us",
      desc: "Come say hello at our office HQ.",
      linkText: "Gulshan Avenue, Dhaka-1212, BD",
      linkUrl: "https://maps.google.com",
      colorClass: "text-violet-600 bg-violet-100 dark:bg-violet-900/30",
    },
    {
      icon: <FaPhoneAlt />,
      title: "Call us",
      desc: "Mon-Fri from 8am to 5pm.",
      linkText: "+880 1234 567 890",
      linkUrl: "tel:+8801234567890",
      colorClass: "text-pink-600 bg-pink-100 dark:bg-pink-900/30",
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
        "Absolutely. You can try our 'Starter' package for free for 14 days. No credit card required to start.",
    },
  ];

  return (
    <div className="min-h-screen bg-base-100 relative overflow-hidden pt-28 pb-20">
      {/* --- Background Elements --- */}
      <div className="absolute top-0 inset-x-0 h-96 bg-gradient-to-b from-base-200/50 to-transparent -z-10"></div>
      <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-40 -left-20 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* --- Header Section --- */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="badge badge-primary badge-outline mb-4 font-semibold px-4 py-3 uppercase tracking-wide"
          >
            Contact Us
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
            className="text-4xl lg:text-5xl font-bold mb-6 text-base-content"
          >
            We’d love to hear from you
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
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
              viewport={{ once: true }}
              className="bg-base-100 p-8 rounded-2xl shadow-lg border border-base-200 text-center group hover:shadow-2xl transition-all duration-300 flex flex-col items-center h-full"
            >
              <div
                className={`w-14 h-14 ${item.colorClass} rounded-xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform duration-300 shadow-sm`}
              >
                {item.icon}
              </div>
              <h3 className="text-xl font-bold mb-2 text-base-content">
                {item.title}
              </h3>
              <p className="text-base-content/60 mb-6 text-sm flex-grow">
                {item.desc}
              </p>
              <a
                href={item.linkUrl}
                target={item.linkUrl.startsWith("http") ? "_blank" : "_self"}
                rel="noreferrer"
                className="text-primary font-bold hover:underline"
              >
                {item.linkText}
              </a>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mb-24">
          {/* --- Left: FAQ Section --- */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold mb-8 text-base-content">
              Frequently asked questions
            </h3>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="collapse collapse-arrow bg-base-200/50 rounded-xl border border-base-300 hover:border-primary/30 transition-colors"
                >
                  <input
                    type="radio"
                    name="my-accordion-2"
                    defaultChecked={index === 0}
                  />
                  <div className="collapse-title text-lg font-medium text-base-content">
                    {faq.question}
                  </div>
                  <div className="collapse-content">
                    <p className="text-base-content/70">{faq.answer}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12">
              <h4 className="font-bold text-lg mb-4 text-base-content">
                Follow us on social media
              </h4>
              <div className="flex gap-4">
                {[
                  { Icon: FaFacebookF, link: "https://facebook.com" },
                  { Icon: FaTwitter, link: "https://twitter.com" },
                  { Icon: FaLinkedinIn, link: "https://linkedin.com" },
                  { Icon: FaInstagram, link: "https://instagram.com" },
                ].map((social, idx) => (
                  <a
                    key={idx}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-circle btn-outline hover:bg-primary hover:text-white hover:border-primary transition-all"
                  >
                    <social.Icon className="text-lg" />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* --- Right: Contact Form --- */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-base-100 p-8 rounded-3xl shadow-2xl border border-base-200 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
              <FaPaperPlane className="text-9xl text-primary transform rotate-12" />
            </div>

            <form onSubmit={handleMessage} className="space-y-6 relative z-10">
              <div className="grid grid-cols-2 gap-6">
                <div className="form-control">
                  <label className="label-text font-bold mb-2 block text-base-content">
                    First name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="John"
                    className="input input-bordered w-full bg-base-200/50 focus:bg-base-100 focus:border-primary transition-colors"
                  />
                </div>
                <div className="form-control">
                  <label className="label-text font-bold mb-2 block text-base-content">
                    Last name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Doe"
                    className="input input-bordered w-full bg-base-200/50 focus:bg-base-100 focus:border-primary transition-colors"
                  />
                </div>
              </div>

              <div className="form-control">
                <label className="label-text font-bold mb-2 block text-base-content">
                  Email
                </label>
                <input
                  type="email"
                  required
                  placeholder="you@company.com"
                  className="input input-bordered w-full bg-base-200/50 focus:bg-base-100 focus:border-primary transition-colors"
                />
              </div>

              <div className="form-control">
                <label className="label-text font-bold mb-2 block text-base-content">
                  Message
                </label>
                <textarea
                  required
                  className="textarea textarea-bordered h-32 w-full bg-base-200/50 focus:bg-base-100 focus:border-primary transition-colors resize-none"
                  placeholder="How can we help you?"
                ></textarea>
              </div>

              <button
                type="submit"
                className="btn btn-primary w-full h-12 text-lg rounded-xl shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-shadow"
              >
                Send Message
              </button>
            </form>
          </motion.div>
        </div>

        {/* --- MAP SECTION --- */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="w-full h-[400px] rounded-3xl overflow-hidden shadow-xl border border-base-200 relative"
        >
          {/* Overlay for better theme integration (optional) */}
          <div className="absolute inset-0 pointer-events-none border-4 border-base-100/50 rounded-3xl z-10"></div>

          <iframe
            title="Office Location"
            width="100%"
            height="100%"
            style={{ border: 0, filter: "grayscale(20%) contrast(1.1)" }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            // Using Gulshan, Dhaka coordinates for embedding
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.066487673551!2d90.40925231498136!3d23.78063658457448!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c7715a40c603%3A0xec01cd75f33139f5!2sGulshan%20Ave%2C%20Dhaka%201212!5e0!3m2!1sen!2sbd!4v1646736782209!5m2!1sen!2sbd"
          ></iframe>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;
