// ============================================================
// ERROR BOUNDARY COMPONENT — VERSION 2025.8
// ADVANCED ERROR HANDLING + FALLBACK UI + AUTO LOGGING
// ============================================================

import { Component } from "react";

// ✅ PRODUCTION-GRADE ERROR BOUNDARY CLASS
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);

    // ✅ LOCAL STATE (O(1) ACCESS)
    this.state = {
      hasError: false,
      error: null,
      info: null,
    };
  }

  // ============================================================
  // LIFECYCLE METHOD: WHEN ERROR OCCURS, UPDATE STATE
  // ============================================================
  static getDerivedStateFromError(error) {
    // ✅ UPDATE STATE SO NEXT RENDER SHOWS FALLBACK UI
    return { hasError: true, error };
  }

  // ============================================================
  // CAPTURE ERROR DETAILS FOR LOGGING / ANALYTICS
  // ============================================================
  componentDidCatch(error, info) {
    console.error("🚨 ERROR BOUNDARY CAUGHT AN ERROR:", error, info);

    // ✅ OPTIONAL: SEND ERROR LOGS TO A REMOTE MONITORING SERVICE
    // Example:
    // fetch("/api/log-error", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ error: error.toString(), info }),
    // }).catch(console.warn);

    this.setState({ info });
  }

  // ============================================================
  // HANDLER: RESET THE ERROR STATE (FOR RETRY)
  // ============================================================
  handleReset = () => {
    // ✅ CLEAR ERROR STATE — RESTORES ORIGINAL CHILD COMPONENTS
    this.setState({ hasError: false, error: null, info: null });
  };

  // ============================================================
  // CUSTOM FALLBACK UI — SIMPLE, YET FRIENDLY
  // ============================================================
  renderFallback() {
    const { error } = this.state;
    const { fallback } = this.props;

    // ✅ IF USER PROVIDED CUSTOM FALLBACK → RENDER THAT
    if (fallback) return fallback({ error, onRetry: this.handleReset });

    // ✅ DEFAULT FALLBACK UI (ACCESSIBLE, CLEAN, MODERN)
    return (
      <div
        style={{
          textAlign: "center",
          marginTop: "10%",
          color: "#f43f5e",
          fontFamily: "Inter, sans-serif",
        }}
      >
        <h1>⚠️ Oops! Something went wrong.</h1>
        {error && (
          <pre
            style={{
              color: "#9ca3af",
              background: "#1f2937",
              padding: "1rem",
              borderRadius: "8px",
              overflowX: "auto",
              maxWidth: "90%",
              margin: "1rem auto",
            }}
          >
            {error.toString()}
          </pre>
        )}
        <button
          onClick={this.handleReset}
          style={{
            backgroundColor: "#3b82f6",
            color: "white",
            border: "none",
            padding: "0.7rem 1.5rem",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "600",
          }}
        >
          🔄 Try Again
        </button>
      </div>
    );
  }

  // ============================================================
  // RENDER METHOD → CONDITIONAL RETURN BASED ON ERROR STATE
  // ============================================================
  render() {
    if (this.state.hasError) {
      return this.renderFallback();
    }

    // ✅ NORMAL RENDERING PATH (CHILD COMPONENTS)
    return this.props.children;
  }
}

export default ErrorBoundary;
