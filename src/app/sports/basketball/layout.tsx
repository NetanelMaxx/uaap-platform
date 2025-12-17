import React from "react";

export default function BasketballLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="bg-black min-h-screen text-white">
      {children}
    </section>
  );
}
