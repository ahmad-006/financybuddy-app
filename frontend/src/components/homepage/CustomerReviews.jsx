// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";

const CustomerReviews = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userCount, setUserCount] = useState(10000);
  const [ratingCount, setRatingCount] = useState(4.0);
  const [satisfactionCount, setSatisfactionCount] = useState(80);
  const ref = useRef(null);

  const reviews = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Financial Analyst",
      content:
        "This platform transformed how I manage both personal and client finances. The insights are incredibly accurate.",
      rating: 5,
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Tech Entrepreneur",
      content:
        "The AI-powered recommendations helped optimize our company's cash flow management significantly.",
      rating: 5,
    },
    {
      id: 3,
      name: "Emma Rodriguez",
      role: "Portfolio Manager",
      content:
        "Elegant design meets powerful functionality. This is exactly what the finance industry needed.",
      rating: 5,
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % reviews.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [reviews.length]);

  useEffect(() => {
    const node = ref.current;
    let observer;
    let animationFrame;

    const animateValue = (start, end, duration, setter) => {
      let startTimestamp = null;
      const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = progress * (end - start) + start;
        setter(value);
        if (progress < 1) {
          animationFrame = requestAnimationFrame(step);
        }
      };
      animationFrame = requestAnimationFrame(step);
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateValue(10000, 50000, 2000, (v) => setUserCount(Math.floor(v)));
          animateValue(4.0, 4.9, 2000, (v) => setRatingCount(parseFloat(v.toFixed(1))));
          animateValue(80, 98, 2000, (v) => setSatisfactionCount(Math.floor(v)));
          if (node) {
            observer.unobserve(node);
          }
        }
      });
    };

    observer = new IntersectionObserver(observerCallback, { threshold: 0.3 });

    if (node) {
      observer.observe(node);
    }

    return () => {
      if (node) {
        observer.unobserve(node);
      }
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, []);

  return (
    <section ref={ref} className="py-16 px-4 bg-white">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gray-100 border border-gray-200 mb-6">
            <span className="text-gray-600 text-sm font-medium">
              TRUSTED BY EXPERTS
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            What Our Clients Say
          </h2>
        </motion.div>

        <div className="relative h-64 mb-10 mx-2">
          {reviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, x: index === currentIndex ? 100 : -100 }}
              animate={{
                opacity: index === currentIndex ? 1 : 0,
                x:
                  index === currentIndex
                    ? 0
                    : index < currentIndex
                      ? -100
                      : 100,
              }}
              transition={{ duration: 0.5 }}
              className={`absolute inset-0 bg-gray-50 rounded-xl p-6 border border-gray-200 ${index === currentIndex ? "" : "pointer-events-none"}`}
            >
              <div className="flex justify-center mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <span key={i} className="text-xl text-yellow-400 mx-1">
                    ★
                  </span>
                ))}
              </div>

              <blockquote className="text-lg text-gray-700 text-center mb-6 italic leading-relaxed">
                "{review.content}"
              </blockquote>

              <div className="text-center">
                <div className="font-semibold text-gray-900">{review.name}</div>
                <div className="text-gray-600 text-sm">{review.role}</div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="flex items-center justify-center space-x-4 mb-8"
        >
          <button
            onClick={() =>
              setCurrentIndex(
                (prev) => (prev - 1 + reviews.length) % reviews.length
              )
            }
            className="w-10 h-10 rounded-full bg-white border border-gray-300 hover:border-gray-400 transition-all duration-300 flex items-center justify-center shadow-sm"
          >
            <span className="text-gray-600 text-lg">←</span>
          </button>

          <div className="flex space-x-2">
            {reviews.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${index === currentIndex ? "bg-blue-600 scale-125" : "bg-gray-300"}`}
              />
            ))}
          </div>

          <button
            onClick={() =>
              setCurrentIndex((prev) => (prev + 1) % reviews.length)
            }
            className="w-10 h-10 rounded-full bg-white border border-gray-300 hover:border-gray-400 transition-all duration-300 flex items-center justify-center shadow-sm"
          >
            <span className="text-gray-600 text-lg">→</span>
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="grid grid-cols-3 gap-4 max-w-md mx-auto pt-8 border-t border-gray-200"
        >
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900 mb-1">
              {userCount.toLocaleString()}+
            </div>
            <div className="text-gray-600 text-xs">Users</div>
          </div>

          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900 mb-1">
              {ratingCount}/5
            </div>
            <div className="text-gray-600 text-xs">Rating</div>
          </div>

          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900 mb-1">
              {satisfactionCount}%
            </div>
            <div className="text-gray-600 text-xs">Satisfaction</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CustomerReviews;
