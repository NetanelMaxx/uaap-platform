import React from "react";

// This layout file applies to all child routes (e.g., /sports/basketball)
export default function SportsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // You can add sport-specific navigation or context here later
    <>
      {children}
    </>
  );
}
