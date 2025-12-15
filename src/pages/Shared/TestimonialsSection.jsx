import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaQuoteRight,
  FaStar,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

const TestimonialsSection = () => {
  const testimonials = [
    {
      id: 1,
      name: "Sarah Jenkins",
      role: "CTO, TechFlow Logistics",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop",
      text: "AssetVerse has completely transformed how we track our hardware. The predictive maintenance feature alone saved us over $50k in the first quarter.",
    },
    {
      id: 2,
      name: "David Ross",
      role: "Operations Manager, BuildCorp",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
      text: "The UI is incredibly intuitive. I didn't have to train my staff for weeks. The mobile scanning feature is a game-changer for our field agents.",
    },
    {
      id: 3,
      name: "Emily Chen",
      role: "Director of Procurement, Zenith Inc.",
      image:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop",
      text: "Finally, an asset management system that scales with us. The API integration with our existing ERP was seamless and robust.",
    },
    {
      id: 4,
      name: "Michael Chang",
      role: "Head of IT, NextGen Solutions",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop",
      text: "Security was our main concern, and AssetVerse's role-based access control is top-notch. Highly recommended for enterprise use.",
    },
    {
      id: 5,
      name: "Lisa Wong",
      role: "Logistics Lead, SwiftMove",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop",
      text: "The real-time dashboard is addictive. I can see exactly where every asset is globally without making a single phone call.",
    },
    {
      id: 6,
      name: "James Carter",
      role: "CEO, Carter Industries",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop",
      text: "We reduced asset loss by 40% within the first six months. The ROI on this software is evident from day one.",
    },
    {
      id: 7,
      name: "Sophia Martinez",
      role: "HR Director, GlobalTech",
      image:
        "https://images.unsplash.com/photo-1554151228-14d9def656ec?q=80&w=200&auto=format&fit=crop",
      text: "Asset allocation used to be a nightmare during onboarding. Now, new employees get their gear assigned automatically.",
    },
    {
      id: 8,
      name: "William Turner",
      role: "Facility Manager, UrbanSpace",
      image:
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=200&auto=format&fit=crop",
      text: "Tracking furniture and equipment across 50 office locations is now manageable. The QR code generation is super fast.",
    },
    {
      id: 9,
      name: "Olivia Kim",
      role: "Finance Analyst, FinCorp",
      image:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&auto=format&fit=crop",
      text: "Depreciation calculation is automatic now. It saves our finance team roughly 20 hours every month during audits.",
    },
    {
      id: 10,
      name: "Daniel Lee",
      role: "IT Admin, CreativeStudio",
      image:
        "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=200&auto=format&fit=crop",
      text: "The support team is amazing. Any issue we faced was resolved within hours. A truly customer-centric company.",
    },
  ];

  // --- Logic for Carousel ---
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerScreen, setItemsPerScreen] = useState(3);

  // Responsive Check & Boundary Fix
  useEffect(() => {
    const handleResize = () => {
      let items = 1;
      if (window.innerWidth < 768) items = 1;
      else if (window.innerWidth < 1024) items = 2;
      else items = 3;

      setItemsPerScreen(items);

      // Fix: Ensure current index doesn't go out of bounds when resizing
      const maxIdx = testimonials.length - items;
      if (currentIndex > maxIdx) {
        setCurrentIndex(maxIdx > 0 ? maxIdx : 0);
      }
    };

    handleResize(); // Initial call
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [currentIndex, testimonials.length]);

  const maxIndex = Math.max(0, testimonials.length - itemsPerScreen);

  // Auto Play
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 5000);
    return () => clearInterval(interval);
  }, [currentIndex, itemsPerScreen, maxIndex]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
  };

  const handleDotClick = (index) => {
    if (index > maxIndex) setCurrentIndex(maxIndex);
    else setCurrentIndex(index);
  };

  return (
    <section
      className="py-24 bg-base-100 relative overflow-hidden"
      id="testimonials"
    >
      {/* Background Decor */}
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold mb-4"
          >
            Trusted by Industry{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-violet-600">
              Leaders
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="text-base-content/70 text-lg"
          >
            See how AssetVerse is helping teams around the world.
          </motion.p>
        </div>

        {/* Carousel Container */}
        <div className="relative group">
          {/* Main Slider Window */}
          <div className="overflow-hidden py-10 -my-10 px-2">
            <motion.div
              className="flex gap-6"
              animate={{ x: `-${currentIndex * (100 / itemsPerScreen)}%` }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              drag="x"
              dragConstraints={{
                right: 0,
                left: -((testimonials.length - itemsPerScreen) * 400),
              }}
              onDragEnd={(e, { offset }) => {
                const swipe = offset.x;
                if (swipe < -50) handleNext();
                else if (swipe > 50) handlePrev();
              }}
            >
              {testimonials.map((item) => (
                <motion.div
                  key={item.id}
                  className={`flex-shrink-0 w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]`}
                >
                  <div className="bg-base-200 p-8 rounded-2xl relative h-full flex flex-col hover:shadow-xl transition-all duration-300 border border-transparent hover:border-primary/20 group-hover:scale-[0.99] hover:!scale-100">
                    {/* Quote Icon */}
                    <FaQuoteRight className="absolute top-6 right-6 text-6xl text-primary/5" />

                    {/* Stars */}
                    <div className="flex gap-1 text-yellow-400 mb-6">
                      {[...Array(5)].map((_, i) => (
                        <FaStar key={i} />
                      ))}
                    </div>

                    {/* Text */}
                    <p className="text-base-content/80 mb-8 italic relative z-10 leading-relaxed flex-grow">
                      "{item.text}"
                    </p>

                    {/* Author Info */}
                    <div className="flex items-center gap-4 mt-auto">
                      <div className="avatar">
                        <div className="w-12 h-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                          <img src={item.image} alt={item.name} />
                        </div>
                      </div>
                      <div>
                        <h4 className="font-bold text-sm md:text-base">
                          {item.name}
                        </h4>
                        <p className="text-xs text-primary font-semibold uppercase tracking-wide">
                          {item.role}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* FIX: Wrapper div handles positioning, Button handles click animation */}
          <div className="absolute left-4 top-1/2 -translate-y-1/2 z-20 hidden md:block">
            <button
              onClick={handlePrev}
              className="btn btn-circle btn-primary shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300"
              aria-label="Previous Slide"
            >
              <FaChevronLeft />
            </button>
          </div>

          <div className="absolute right-4 top-1/2 -translate-y-1/2 z-20 hidden md:block">
            <button
              onClick={handleNext}
              className="btn btn-circle btn-primary shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300"
              aria-label="Next Slide"
            >
              <FaChevronRight />
            </button>
          </div>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: maxIndex + 1 }).map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                currentIndex === index
                  ? "w-8 bg-primary"
                  : "w-2.5 bg-base-300 hover:bg-primary/50"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            ></button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
