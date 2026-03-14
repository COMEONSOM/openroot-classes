// ============================================================
// AVAILABLE COURSES — NEXT GEN UX
// CLEAN VERSION (QR REMOVED)
// VERSION 2026.5
// ============================================================

import { useState, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Confetti from "react-confetti";
import useWindowSize from "react-use/lib/useWindowSize";
import Lottie from "lottie-react";
import "../styles/AvailableCourses.css";

import FinanceLottie from "../assets/lotties/finance-course.json";
import PromptLottie from "../assets/lotties/prompt_course.json";

const API_URL =
  process.env.REACT_APP_API_URL || "https://openroot-classes.onrender.com";

// ============================================================
// COURSE DATA
// ============================================================

const COURSE_DATA = Object.freeze([
  {
    id: 1,
    name: "Investing & Finance",
    animation: FinanceLottie,

    description: [
      "Stock Market From Zero (Demat, Buy/Sell, Basics, Fundamentals)",
      "How to Research Companies & Analyze Stocks",
      "Mutual Funds, Gold & Smart Fixed Deposit Strategies",
      "Portfolio Building & Long-Term Wealth Planning",
      "AI Tools in Finance for Smarter Decisions",
      "Real-World Investing Mindset & Practical Frameworks",
    ],

    duration: "1 Month • 8 Classes • 2 Classes / Week",
    totalFee: 650,
    priceLabel: "Total Fee: ₹650 • One-Time Payment",
  },

  {
    id: 2,
    name: "Prompt Engineering",
    animation: PromptLottie,

    description: [
      "Prompt Engineering Basics — How to write clear prompts to control AI output",
      "AI Image Generation using ChatGPT, Gemini, Grok and other tools",
      "Image Editing with AI — background change, object removal, enhancement",
      "Text → Image → Video workflow and AI video generation pipeline",
      "Talking Characters and AI animated videos with audio integration",
      "AI Music and Sound generation for videos and content",
      "YouTube Content Creation — thumbnails, loop videos, animated shorts",
      "Professional Work Skills — Email writing, PPT, Resume, and documents using AI",
      "Building a Digital CV Website using HTML, CSS and JavaScript",
      "Using VS Code and understanding project structure",
      "GitHub basics — version control and publishing your code online",
      "Deploying your website live using GitHub Pages",
      "Introduction to React and modern web app structure",
      "Understanding databases, LocalStorage, and cloud basics (Firebase overview)",
      "Practical projects to build confidence with AI and web tools",
      "Career guidance — freelancing, content creation, tech learning path"
    ],

    duration: "1 Month • 8 Classes • 2 Classes / Week",
    totalFee: 850,
    priceLabel: "Total Fee: ₹850 • One-Time Payment",
  },
]);

// ============================================================
// FAST LOOKUP
// ============================================================

const useCourseLookup = () => {
  const map = useMemo(() => new Map(COURSE_DATA.map((c) => [c.id, c])), []);

  const getCourseById = useCallback((id) => {
    return map.get(id) ?? null;
  }, [map]);

  return { getCourseById };
};

// ============================================================
// MAIN COMPONENT
// ============================================================

const AvailableCourses = () => {
  const [viewState, setViewState] = useState("list");
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [isPaying, setIsPaying] = useState(false);

  const { width, height } = useWindowSize();
  const { getCourseById } = useCourseLookup();

  // COURSE CLICK
  const handleCourseClick = useCallback(
    async (id) => {
      const course = await Promise.resolve(getCourseById(id));

      if (!course) {
        alert("Course not found");
        return;
      }

      setSelectedCourse(course);
      setViewState("details");
      navigator.vibrate?.(30);
    },
    [getCourseById]
  );

  // BACK BUTTON
  const handleBack = useCallback(() => {
    if (viewState === "qr") {
      setViewState("details");
      return;
    }

    if (viewState === "details") {
      setSelectedCourse(null);
      setViewState("list");
    }
  }, [viewState]);

  // PAYMENT
  const handlePayClick = useCallback(async () => {
    try {
      if (!selectedCourse) return;

      setIsPaying(true);

      const amountInRupees = selectedCourse.totalFee;

      const response = await fetch(`${API_URL}/create-order`, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          amount: amountInRupees,
        }),
      });

      const order = await response.json();

      if (!order.id) throw new Error("Order failed");

      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY,

        amount: order.amount,
        currency: "INR",

        name: "Openroot Classes",
        description: selectedCourse.name,

        order_id: order.id,

        handler: async (response) => {
          try {
            const verify = await fetch(`${API_URL}/verify-payment`, {
              method: "POST",

              headers: {
                "Content-Type": "application/json",
              },

              body: JSON.stringify(response),
            });

            const result = await verify.json();

            if (result.status === "success") {
              setShowConfetti(true);
              setViewState("success");

              setTimeout(() => {
                setShowConfetti(false);
              }, 6000);
            } else {
              alert("Payment failed");
            }
          } catch (err) {
            console.error("VERIFY ERROR:", err);
            alert("Payment verification failed");
          } finally {
            setIsPaying(false);
          }
        },

        modal: {
          ondismiss: () => {
            setIsPaying(false);
          },
        },

        theme: {
          color: "#7c3aed",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("PAYMENT INIT ERROR:", err);
      alert("Payment initialization failed");
      setIsPaying(false);
    }
  }, [selectedCourse]);

  return (
    <div id="available-courses" className="courses-container">
      <h2>🚀 Available Courses</h2>

      <div className="course-stepper">
        <div className={viewState === "list" ? "step active" : "step"}>
          Explore
        </div>

        <div className={viewState === "details" ? "step active" : "step"}>
          Overview
        </div>

        <div className={viewState === "success" ? "step active" : "step"}>
          Payment
        </div>
      </div>

      {/* LIST */}
      {viewState === "list" && (
        <ul className="course-list">
          {COURSE_DATA.map((course) => (
            <motion.li
              key={course.id}
              className="course-item premium-card"
              whileHover={{ y: -6, scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleCourseClick(course.id)}
            >
              <Lottie
                animationData={course.animation}
                loop
                className="course-thumbnail"
              />

              <h4>{course.name}</h4>
              <p>{course.duration}</p>

              <span className="price-chip">
                💰 {course.priceLabel}
              </span>
            </motion.li>
          ))}
        </ul>
      )}

      {/* DETAILS */}
      <AnimatePresence>
        {viewState === "details" && selectedCourse && (
          <motion.section
            className="course-details"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            <button className="back-button" onClick={handleBack}>
              ← Back
            </button>

            <h3>{selectedCourse.name}</h3>

            <p className="duration">{selectedCourse.duration}</p>

            <div className="highlights-grid">
              {selectedCourse.description.map((line, i) => (
                <motion.div
                  key={i}
                  className="highlight-card"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  ✅ {line}
                </motion.div>
              ))}
            </div>

            <div className="price-and-pay">
              <button className="price">
                💰 {selectedCourse.priceLabel}
              </button>

              <motion.button
                className="pay-button glowing"
                onClick={handlePayClick}
                disabled={isPaying}
                whileHover={{ scale: 1.08 }}
              >
                {isPaying ? "Processing..." : "🔒 Secure Checkout"}
              </motion.button>

              <div className="trust-badges">
                🔒 Secure Payments • 💳 UPI / Cards • ✅ Refund Policy
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* SUCCESS */}
      <AnimatePresence>
        {viewState === "success" && selectedCourse && (
          <motion.section
            className="qr-section"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
          >
            <h3>🎉 Payment Successful!</h3>

            <p>
              You successfully enrolled in{" "}
              <strong>{selectedCourse.name}</strong>
            </p>

            <p className="motivator">
              Welcome to Openroot 🚀
            </p>

            {showConfetti && (
              <Confetti width={width} height={height} />
            )}
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AvailableCourses;