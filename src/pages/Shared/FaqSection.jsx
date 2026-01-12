import React from "react";
import { motion } from "framer-motion";

const FaqSection = () => {
  const faqs = [
    {
      question: "Can I try AssetMinder for free?",
      answer:
        "Yes! We offer a 14-day free trial for the Professional plan, and the Starter plan is free forever for small teams up to 5 members.",
    },
    {
      question: "Is my data secure?",
      answer:
        "Absolutely. We use bank-grade AES-256 encryption and are SOC2 compliant. Your data is backed up daily.",
    },
    {
      question: "Does it support barcode scanning?",
      answer:
        "Yes, our mobile app (iOS & Android) enables you to scan QR codes and barcodes to instantly retrieve asset details.",
    },
    {
      question: "Can I integrate with my existing ERP?",
      answer:
        "AssetMinder offers seamless API integrations with SAP, Oracle, Microsoft Dynamics, and Slack for notifications.",
    },
    {
      question: "What happens if I exceed my asset limit?",
      answer:
        "We will notify you when you approach the limit. You can easily upgrade your plan from the dashboard without any data loss.",
    },
  ];

  return (
    <section className="py-24 bg-base-100">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-base-content/70">
            Everything you need to know about the product and billing.
          </p>
        </div>

        <div className="join join-vertical w-full">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="collapse collapse-arrow join-item border border-base-300 bg-base-100 mb-2 rounded-xl"
            >
              <input
                type="radio"
                name="my-accordion-4"
                defaultChecked={index === 0}
              />
              <div className="collapse-title text-xl font-medium hover:text-primary transition-colors">
                {faq.question}
              </div>
              <div className="collapse-content">
                <p className="text-base-content/70">{faq.answer}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
