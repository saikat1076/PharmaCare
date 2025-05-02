import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import Title from "./Shared/Title";

const faqs = [
  {
    question: "What types of medications are available at PharmaCare?",
    answer: "PharmaCare provides a comprehensive selection of medications, including prescription drugs, over-the-counter medications, and wellness products to support your health needs.",
  },
  {
    question: "Does PharmaCare offer injectable medications?",
    answer: "Yes, PharmaCare supplies a range of injectable medications, dispensed with thorough prescription verification and professional guidance.",
  },
  {
    question: "Are discounts available for regular customers?",
    answer: "PharmaCare values its loyal customers and offers exclusive discounts and rewards through our loyalty program.",
  },
  {
    question: "What payment methods does PharmaCare accept?",
    answer: "We accept a variety of payment methods, including mobile banking apps, credit/debit cards, and cash on delivery for your convenience.",
  },
  {
    question: "Is a prescription required for antibiotics or antihypertensive medications?",
    answer: "Yes, a valid prescription is required for all prescription medications, including antibiotics and antihypertensives, to ensure safe dispensing.",
  },
  {
    question: "Does PharmaCare deliver outside Dhaka?",
    answer: "PharmaCare proudly offers nationwide delivery services, including regions beyond Dhaka, to ensure access to medications across Bangladesh.",
  },
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="max-w-5xl mx-auto px-6 py-12">
      <Title
        subHeading="Frequently Asked Questions"
        heading="Your Trusted Online Pharmacy"
      />
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            className="border border-gray-200 rounded-lg shadow-sm overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full flex justify-between items-center p-5 text-left text-lg font-medium text-gray-900 bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
            >
              <span>{faq.question}</span>
              {openIndex === index ? (
                <FaChevronUp className="text-blue-600" />
              ) : (
                <FaChevronDown className="text-gray-500" />
              )}
            </button>
            <AnimatePresence>
              {openIndex === index && (
                <motion.div
                  className="p-5 bg-white text-gray-600 leading-relaxed"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {faq.answer}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default FAQSection;