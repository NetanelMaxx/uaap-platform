"use client";

import React from 'react'

type ButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>

export const PrevButton: React.FC<ButtonProps> = (props) => {
  const { children, ...restProps } = props

  return (
    <button
      className="absolute top-1/2 left-4 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white rounded-full p-2 z-10 transition-colors"
      type="button"
      {...restProps}
    >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
      {children}
    </button>
  )
}

export const NextButton: React.FC<ButtonProps> = (props) => {
  const { children, ...restProps } = props

  return (
    <button
      className="absolute top-1/2 right-4 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white rounded-full p-2 z-10 transition-colors"
      type="button"
      {...restProps}
    >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
      {children}
    </button>
  )
}
