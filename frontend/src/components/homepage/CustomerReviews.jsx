import { useState, useEffect } from "react";

const CustomerReviews = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const reviews = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Freelancer",
      avatar: "S",
      rating: 4,
      content:
        "This app completely transformed how I manage my finances. I've saved 30% more since I started using it!",
      color: "bg-blue-500",
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Software Engineer",
      avatar: "M",
      rating: 5,
      content:
        "The AI insights are incredibly accurate. It caught spending patterns I hadn't noticed myself.",
      color: "bg-green-500",
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "Small Business Owner",
      avatar: "E",
      rating: 4,
      content:
        "Budgeting used to be a chore, but now it's actually enjoyable. The visual reports are fantastic.",
      color: "bg-purple-500",
    },
    {
      id: 4,
      name: "David Kim",
      role: "Graduate Student",
      avatar: "D",
      rating: 5,
      content:
        "As a student on a tight budget, this app has been a lifesaver. The saving goals feature keeps me motivated.",
      color: "bg-amber-500",
    },
    {
      id: 5,
      name: "Jessica Williams",
      role: "Marketing Manager",
      avatar: "J",
      rating: 5,
      content:
        "I've tried countless finance apps, but this is the first one that actually made me stick to my budget.",
      color: "bg-pink-500",
    },
  ];

  const nextReview = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length);
  };

  const prevReview = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + reviews.length) % reviews.length
    );
  };

  const goToReview = (index) => {
    if (isTransitioning || index === currentIndex) return;
    setIsTransitioning(true);
    setCurrentIndex(index);
  };

  useEffect(() => {
    if (isTransitioning) {
      const timer = setTimeout(() => {
        setIsTransitioning(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isTransitioning, currentIndex]);

  useEffect(() => {
    const interval = setInterval(() => {
      nextReview();
    }, 5000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isTransitioning]);

  return (
    <section className="py-16 px-4 bg-gradient-to-br from-gray-900 to-gray-800">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Trusted by <span className="text-blue-400">Thousands</span> of Users
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Discover why our users love our personal finance app and how it's
            helping them achieve their financial goals.
          </p>
        </div>

        <div className="relative h-96 md:h-80 mb-10 overflow-hidden rounded-xl">
          {reviews.map((review, index) => (
            <div
              key={review.id}
              className={`absolute inset-0 bg-gray-800/70 backdrop-blur-sm rounded-xl p-8 border border-gray-700 transition-all duration-500 ease-in-out transform
                ${
                  index === currentIndex
                    ? "opacity-100 translate-x-0 z-10"
                    : index < currentIndex
                      ? "opacity-0 -translate-x-full"
                      : "opacity-0 translate-x-full"
                }`}
            >
              <div className="flex mb-6 justify-center">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className={`text-2xl ${i < review.rating ? "text-yellow-400" : "text-gray-600"}`}
                  >
                    ★
                  </span>
                ))}
              </div>

              <p className="text-gray-200 text-center text-lg md:text-xl mb-8 italic px-4">
                "{review.content}"
              </p>

              <div className="flex items-center justify-center">
                <div
                  className={`flex-shrink-0 flex items-center justify-center w-14 h-14 ${review.color} rounded-full text-white font-bold text-xl`}
                >
                  {review.avatar}
                </div>
                <div className="ml-4">
                  <h4 className="text-white font-semibold text-lg">
                    {review.name}
                  </h4>
                  <p className="text-gray-400">{review.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-center space-x-6">
          <button
            onClick={prevReview}
            className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-800 hover:bg-gray-700 transition-all shadow-lg"
            aria-label="Previous review"
          >
            <span className="text-white text-xl font-bold">←</span>
          </button>

          <div className="flex space-x-3">
            {reviews.map((_, index) => (
              <button
                key={index}
                onClick={() => goToReview(index)}
                className={`w-3 h-3 rounded-full transition-all ${index === currentIndex ? "bg-blue-400 scale-125" : "bg-gray-700"}`}
                aria-label={`Go to review ${index + 1}`}
              />
            ))}
          </div>

          <button
            onClick={nextReview}
            className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-800 hover:bg-gray-700 transition-all shadow-lg"
            aria-label="Next review"
          >
            <span className="text-white text-xl font-bold">→</span>
          </button>
        </div>

        <div className="text-center mt-6 text-gray-400">
          {currentIndex + 1} / {reviews.length}
        </div>
      </div>
    </section>
  );
};

export default CustomerReviews;
