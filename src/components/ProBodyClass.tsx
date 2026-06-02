"use client";

import { useEffect } from "react";

/** Adds the `pro-body` class so the dotted overlay is dropped on pro screens. */
export default function ProBodyClass() {
  useEffect(() => {
    document.body.classList.add("pro-body");
    return () => document.body.classList.remove("pro-body");
  }, []);
  return null;
}
