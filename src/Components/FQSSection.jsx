import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaPlus, FaMinus } from "react-icons/fa";
import Title from "./Shared/Title";

const faqs = [
  {
    question: "What kind of medicines are available at PharmaCare?",
    answer: "PharmaCare offers a wide range of medicines, including prescription drugs, OTC medications, and wellness products.",
  },
  {
    question: "Are injectable medicines available at PharmaCare?",
    answer: "Yes, we provide a variety of injectable medicines with proper guidance and prescription verification.",
  },
  {
    question: "Do regular customers get any discount on the medicine price?",
    answer: "Yes, we offer special discounts and loyalty rewards for our regular customers.",
  },
  {
    question: "Can I pay through mobile banking app/credit card?",
    answer: "Yes, we accept payments via mobile banking, credit/debit cards, and cash on delivery.",
  },
  {
    question: "Do I need a prescription for antibiotics or antihypertensive drugs?",
    answer: "Yes, prescription drugs require a valid prescription before purchase.",
  },
  {
    question: "Do you deliver outside Dhaka?",
    answer: "Currently, we provide deliveries across Bangladesh, including areas outside Dhaka.",
  },
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="mx-auto px-8">
      <Title subHeading='Frequently Asked Questions' heading='Best Online Medicine Shop'></Title>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            className="border rounded-lg shadow-lg overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full flex justify-between items-center p-4 text-left text-lg font-semibold bg-gray-100 hover:bg-blue-50 transition"
            >
              {faq.question}
              {openIndex === index ? <FaMinus className="text-blue-600" /> : <FaPlus className="text-gray-600" />}
            </button>
            {openIndex === index && (
              <motion.div
                className="p-4 bg-white text-gray-700"
                initial={{ height: 0 }}
                animate={{ height: "auto" }}
                transition={{ duration: 0.3 }}
              >
                {faq.answer}
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default FAQSection;
