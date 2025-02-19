import React from "react";

export function Label({ children, htmlFor }) {
  return <label htmlFor={htmlFor} className="block font-semibold">{children}</label>;
}
