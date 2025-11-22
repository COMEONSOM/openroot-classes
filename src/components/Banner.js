// ============================================================
// OPENROOT BANNER 🚀
// - ES2023+ FEATURES + ASYNC/AWAIT
// - DSA-STYLE HELPERS (O(1) NAVIGATION)
// - EDGE-CASE SAFE + ACCESSIBLE
// VERSION 2025.8
// ============================================================

import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  useMemo,
} from "react";
import PropTypes from "prop-types";
import banner1 from "../assets/banner1.avif";
import banner2 from "../assets/banner2.avif";
import banner3 from "../assets/banner3.avif";
import "../styles/Banner.css";

// ============================================================
// UTILITY: ASYNC SLEEP (O(1) TIME/SPACE)
// USED TO DEFER OPERATIONS WITHOUT BLOCKING MAIN THREAD
// ============================================================
const sleep = (ms = 0) =>
  new Promise((resolve) => {
    // DEFENSIVE: ENSURE NON-NEGATIVE DELAY
    const safeMs = Number.isFinite(ms) && ms > 0 ? ms : 0;
    setTimeout(resolve, safeMs);
  });

// ============================================================
// UTILITY: INDEX CLAMPER FOR CIRCULAR BUFFER (O(1))
// THIS IS BASICALLY MODULO WITH SAFETY FOR NEGATIVE INDEX
// ============================================================
const clampIndex = (index, length) => {
  if (!Number.isInteger(length) || length <= 0) return 0;
  return ((index % length) + length) % length;
};

// ============================================================
// DEFAULT BANNERS (FALLBACK DATA)
// ============================================================
const DEFAULT_BANNERS = Object.freeze([
  { id: 1, image: banner1, alt: "Banner 1" },
  { id: 2, image: banner2, alt: "Banner 2" },
  { id: 3, image: banner3, alt: "Banner 3" },
]);

// ============================================================
// NORMALIZE INPUT BANNERS (O(n))
// - ENSURES ARRAY SHAPE
// - FILTERS OUT BAD ITEMS WITHOUT CRASHING UI
// ============================================================
const normalizeBanners = (inputBanners) => {
  if (!Array.isArray(inputBanners) || inputBanners.length === 0) {
    console.warn("BANNER: INVALID OR EMPTY BANNERS PROP, USING DEFAULT.");
    return DEFAULT_BANNERS;
  }

  const cleaned = inputBanners
    .filter((b) => b && typeof b.image === "string")
    .map((b, idx) => ({
      id:
        b.id ??
        // FALLBACK ID IF MISSING
        `banner-${idx}`,
      image: b.image,
      alt: b.alt ?? `Banner ${idx + 1}`,
    }));

  if (cleaned.length === 0) {
    console.warn("BANNER: ALL PROVIDED BANNERS INVALID, USING DEFAULT.");
    return DEFAULT_BANNERS;
  }

  return cleaned;
};

// ============================================================
// MAIN COMPONENT
// ============================================================
export default function Banner({
  banners: incomingBanners = DEFAULT_BANNERS,
  autoRotateMs = 6000,
}) {
  // ==========================================================
  // NORMALIZED BANNER DATA (MEMOIZED O(n) ONLY ON PROP CHANGE)
  // ==========================================================
  const banners = useMemo(
    () => normalizeBanners(incomingBanners),
    [incomingBanners]
  );

  const slideCount = banners.length;

  // ==========================================================
  // EDGE CASE: NO SLIDES → RENDER PLACEHOLDER (O(1))
// ==========================================================
  if (slideCount === 0) {
    return (
      <section className="home-banner" aria-label="No Content Banner">
        <div className="banner-slide">
          <div
            style={{
              width: "100%",
              padding: "40px 20px",
              textAlign: "center",
              fontWeight: 600,
            }}
          >
            NO BANNERS AVAILABLE
          </div>
        </div>
      </section>
    );
  }

  // ==========================================================
  // STATE + REFS
  // currentIndex: CURRENT VISIBLE SLIDE (O(1) UPDATE)
  // isPaused:     AUTO-ROTATE PAUSED DUE TO HOVER/INTERACTION
  // ==========================================================
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const intervalRef = useRef(null);
  const pointerStartXRef = useRef(null);
  const prefersReducedMotionRef = useRef(false);

  // ==========================================================
  // EFFECT: DETECT REDUCED MOTION PREFERENCE ONCE (O(1))
// ==========================================================
  useEffect(() => {
    try {
      const mq = window.matchMedia?.("(prefers-reduced-motion: reduce)");
      prefersReducedMotionRef.current = mq?.matches ?? false;
    } catch {
      prefersReducedMotionRef.current = false;
    }
  }, []);

  // ==========================================================
  // CLEAR INTERVAL HELPER (O(1))
// ==========================================================
  const clearAutoRotate = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  // ==========================================================
  // START AUTO ROTATE (O(1))
// - RESPECT REDUCED MOTION
// - SKIP IF ONLY ONE SLIDE
// - USE ASYNC/AWAIT + SLEEP FOR DEFERRED START
// ==========================================================
  const startAutoRotate = useCallback(
    async (delayMs = autoRotateMs) => {
      clearAutoRotate();

      // IF USER PREFERS REDUCED MOTION, DO NOT AUTO ROTATE
      if (prefersReducedMotionRef.current) return;
      if (!Number.isFinite(delayMs) || delayMs <= 0) return;
      if (slideCount <= 1) return;

      // ASYNC DEFERRAL ENSURES CONSISTENT STATE AFTER USER ACTION
      await sleep(0);

      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => clampIndex(prev + 1, slideCount));
      }, delayMs);
    },
    [autoRotateMs, clearAutoRotate, slideCount]
  );

  // ==========================================================
  // EFFECT: CONTROL AUTO ROTATE BASED ON PAUSE FLAG (O(1))
// ==========================================================
  useEffect(() => {
    if (!isPaused) {
      void startAutoRotate();
    } else {
      clearAutoRotate();
    }

    return () => {
      clearAutoRotate();
    };
  }, [isPaused, startAutoRotate, clearAutoRotate]);

  // ==========================================================
  // NAVIGATION HELPERS (ALL O(1))
// ==========================================================
  const goToIndex = useCallback(
    (targetIndex) => {
      // DEFENSIVE CHECKS TO AVOID NaN
      const safeTarget = Number.isInteger(targetIndex) ? targetIndex : 0;
      setCurrentIndex(clampIndex(safeTarget, slideCount));
    },
    [slideCount]
  );

  const goNext = useCallback(() => {
    goToIndex(currentIndex + 1);
  }, [goToIndex, currentIndex]);

  const goPrev = useCallback(() => {
    goToIndex(currentIndex - 1);
  }, [goToIndex, currentIndex]);

  // ==========================================================
  // POINTER SWIPE HANDLERS (O(1) PER EVENT)
// SLIDING WINDOW STYLE: ONLY TRACK START + END X
// ==========================================================
  const handlePointerDown = (e) => {
    try {
      pointerStartXRef.current = e.clientX ?? e.touches?.[0]?.clientX ?? null;
    } catch {
      pointerStartXRef.current = null;
    }
  };

  const handlePointerUp = async (e) => {
    if (pointerStartXRef.current == null) return;

    const endX = e.clientX ?? e.changedTouches?.[0]?.clientX ?? null;
    if (endX == null) {
      pointerStartXRef.current = null;
      return;
    }

    const delta = pointerStartXRef.current - endX;

    // SWIPE THRESHOLD
    if (Math.abs(delta) > 50) {
      if (delta > 0) goNext();
      else goPrev();
      setIsPaused(true);
      // SMALL DEFER, THEN RESUME AUTO ROTATE
      await sleep(800);
      setIsPaused(false);
    }

    pointerStartXRef.current = null;
  };

  // ==========================================================
  // HOVER HANDLERS (O(1))
// ==========================================================
  const handleMouseEnter = () => {
    setIsPaused(true);
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
  };

  // ==========================================================
  // KEYBOARD NAVIGATION (O(1))
// ==========================================================
  const handleKeyDown = (e) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      goPrev();
      setIsPaused(true);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      goNext();
      setIsPaused(true);
    }
  };

  // ==========================================================
  // RENDER
  // ==========================================================
  return (
    <section
      className="home-banner"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onKeyDown={handleKeyDown}
      tabIndex={0} // MAKES BANNER FOCUSABLE FOR KEYBOARD USERS
      role="region"
      aria-roledescription="carousel"
      aria-label="Homepage Banner"
    >
      {/* SLIDES WRAPPER — TRANSLATEX FOR NETFLIX-STYLE SLIDE */}
      <div
        className="banner-container"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
          transition: "transform 0.6s ease-in-out",
        }}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onTouchStart={handlePointerDown}
        onTouchEnd={handlePointerUp}
      >
        {banners.map(({ id, image, alt }, idx) => (
          <div
            key={id ?? idx}
            className="banner-slide"
            aria-hidden={currentIndex !== idx}
          >
            <img
              src={image}
              alt={alt}
              className="banner-image"
              draggable={false}
            />
          </div>
        ))}
      </div>

      {/* ARROW CONTROLS */}
      <button
        type="button"
        className="arrow left-arrow"
        aria-label="Previous banner"
        onClick={() => {
          goPrev();
          setIsPaused(true);
        }}
      >
        ‹
      </button>

      <button
        type="button"
        className="arrow right-arrow"
        aria-label="Next banner"
        onClick={() => {
          goNext();
          setIsPaused(true);
        }}
      >
        ›
      </button>

      {/* DOTS (PAGINATION) */}
      <div
        className="dots-container"
        role="tablist"
        aria-label="Banner Pagination"
      >
        {banners.map((_, idx) => (
          <button
            key={idx}
            type="button"
            role="tab"
            aria-selected={currentIndex === idx}
            className={`dot ${currentIndex === idx ? "active" : ""}`}
            onClick={async () => {
              goToIndex(idx);
              setIsPaused(true);
              await sleep(800);
              setIsPaused(false);
            }}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
}

// ============================================================
// PROP TYPES
// ============================================================
Banner.propTypes = {
  // ARRAY OF BANNERS (OPTIONAL)
  banners: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      image: PropTypes.string.isRequired,
      alt: PropTypes.string,
    })
  ),
  // AUTO ROTATE INTERVAL IN MS (OPTIONAL)
  autoRotateMs: PropTypes.number,
};

// ============================================================
// COMPLEXITY NOTES (HIGH LEVEL)
// ------------------------------------------------------------
// - NORMALIZEBANNERS: O(n) TIME, O(n) SPACE (n = SLIDE COUNT)
// - RENDER MAPPING:    O(n) TIME PER RENDER
// - NAVIGATION OPS:    O(1) TIME (USING CLAMPINDEX AS CIRCULAR BUFFER)
// - AUTO-ROTATE TICK:  O(1) STATE UPDATE + RECONCILE
// - MEMORY:            O(n) TO HOLD BANNERS ARRAY
// THIS IS EFFECTIVELY A CIRCULAR QUEUE / RING BUFFER OVER SLIDES.
// ============================================================
