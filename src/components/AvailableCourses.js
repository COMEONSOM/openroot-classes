// ============================================================
// AVAILABLE COURSES — NEXT GEN UX (Somu Edition 🚀)
// ASYNC + STEP FLOW + PREMIUM UI + RAZORPAY READY
// ============================================================

import { useState, useMemo, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Confetti from "react-confetti";
import useWindowSize from "react-use/lib/useWindowSize";
import Lottie from "lottie-react";
import "../styles/AvailableCourses.css";

import FinanceLottie from "../assets/lotties/finance-course.json";
import PromptLottie from "../assets/lotties/prompt_course.json";
import FinanceQR from "../assets/FinanceQR.png";
import PromptQR from "../assets/PromptQR.png";

const COURSE_DATA = Object.freeze([
  {
    id: 1,
    name: "Investing & Finance",
    animation: FinanceLottie,
    qr: FinanceQR,
    description: [
      "Stock Market From Scratch",
      "Mutual Funds",
      "Gold Investments",
      "Lending Systems",
      "Smart Fixed Deposits",
      "Portfolio Building",
      "AI Systems in Finance",
    ],
    duration: "4 Months • 16 Classes",
    price: "1769 INR",
  },
  {
    id: 2,
    name: "Prompt Engineering",
    animation: PromptLottie,
    qr: PromptQR,
    description: [
      "AI Image Generation",
      "Text to Video",
      "Logo Design",
      "Branding",
      "Blog Creation",
      "AI Website Builder",
      "Resume Builder",
    ],
    duration: "2 Months • 8 Classes",
    price: "1249 INR",
  },
]);

const useCourseLookup = () => {
  const map = useMemo(() => new Map(COURSE_DATA.map((c) => [c.id, c])), []);
  const getCourseById = useCallback((id) => map.get(id) ?? null, [map]);
  return { getCourseById };
};

const AvailableCourses = () => {
  const [viewState, setViewState] = useState("list");
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [isPaying, setIsPaying] = useState(false);
  const { width, height } = useWindowSize();
  const { getCourseById } = useCourseLookup();

  const handleCourseClick = useCallback(async (id) => {
    const course = await Promise.resolve(getCourseById(id));
    if (!course) return alert("Course not found");
    setSelectedCourse(course);
    setViewState("details");
    navigator.vibrate?.(30);
  }, [getCourseById]);

  const handleBack = useCallback(() => {
    if (viewState === "qr") return setViewState("details");
    if (viewState === "details") {
      setSelectedCourse(null);
      return setViewState("list");
    }
  }, [viewState]);

  const handlePayClick = useCallback(async () => {
    try {
      if (!selectedCourse) return;
      setIsPaying(true);

      const amount = Number(selectedCourse.price.replace(/\D/g, ""));

      const response = await fetch("http://localhost:5000/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount }),
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
          const verify = await fetch("http://localhost:5000/verify-payment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(response),
          });

          const result = await verify.json();
          if (result.status === "success") {
            setShowConfetti(true);
            setViewState("qr");
            setTimeout(() => setShowConfetti(false), 6000);
          } else {
            alert("Payment failed");
          }
          setIsPaying(false);
        },

        theme: { color: "#7c3aed" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error(err);
      alert("Payment init failed");
      setIsPaying(false);
    }
  }, [selectedCourse]);

  return (
    <div id="available-courses" className="courses-container">
      <h2>🚀 Available Courses</h2>

      {/* ===== STEPPER UI ===== */}
      <div className="course-stepper">
        <div className={viewState === "list" ? "step active" : "step"}>Explore</div>
        <div className={viewState === "details" ? "step active" : "step"}>Overview</div>
        <div className={viewState === "qr" ? "step active" : "step"}>Payment</div>
      </div>

      {/* ===== LIST VIEW ===== */}
      {viewState === "list" && (
        <ul className="course-list">
          {COURSE_DATA.map(({ id, name, animation, duration, price }) => (
            <motion.li
              key={id}
              className="course-item premium-card"
              whileHover={{ y: -6, scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleCourseClick(id)}
            >
              <Lottie animationData={animation} loop className="course-thumbnail" />
              <h4>{name}</h4>
              <p>{duration}</p>
              <span className="price-chip">💰 {price}</span>
            </motion.li>
          ))}
        </ul>
      )}

      {/* ===== DETAILS VIEW ===== */}
      <AnimatePresence>
        {viewState === "details" && selectedCourse && (
          <motion.section
            className="course-details"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            <button className="back-button" onClick={handleBack}>← Back</button>

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
              <button className="price">💰 {selectedCourse.price}</button>

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

      {/* ===== QR / SUCCESS VIEW ===== */}
      <AnimatePresence>
        {viewState === "qr" && selectedCourse && (
          <motion.section
            className="qr-section"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
          >
            <button className="back-button" onClick={handleBack}>← Back</button>

            <h3>🎉 Payment Successful!</h3>
            <p>You unlocked <strong>{selectedCourse.name}</strong></p>

            <img src={selectedCourse.qr} alt="QR" className="qr-code" />

            <p className="motivator">You’re investing in yourself 🚀</p>

            {showConfetti && <Confetti width={width} height={height} />}
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AvailableCourses;
