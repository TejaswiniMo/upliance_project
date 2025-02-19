import React from "react";

export function Input({ type = "text", className, ...props }) {
  return <input type={type} className={`border px-3 py-2 rounded ${className}`} {...props} />;
}
