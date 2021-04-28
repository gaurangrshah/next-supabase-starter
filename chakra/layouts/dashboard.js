import React from "react";

export function DashboardLayout({ children }) {
  return children;
}

/**
 * @NOTE: session is passed down into the protected component so that it's value is already evaluated in the browser context, otherwise it remains null in the child component
 */
