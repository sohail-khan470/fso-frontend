// components/Spinner.js
import React from "react";

export default function Spinner() {
  return (
    <div style={overlayStyle}>
      <div style={spinnerStyle} />
    </div>
  );
}

// Inline styles
const overlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(255, 255, 255, 0.7)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 999,
};

const spinnerStyle = {
  width: "60px",
  height: "60px",
  border: "6px solid #ddd",
  borderTop: "6px solid #0070f3",
  borderRadius: "50%",
  animation: "spin 0.8s linear infinite",
  // Need to inject keyframes manually
  animationName: "spin",
};

// Add keyframes to the document once (for inline)
if (typeof window !== "undefined") {
  const style = document.createElement("style");
  style.innerHTML = `
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
  `;
  document.head.appendChild(style);
}
