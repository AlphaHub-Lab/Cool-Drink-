"use client";

import { useEffect } from "react";
import { initSharedScroll } from "@/animations/registry";

/** Legacy wrapper. Layout already mounts AnimationEngine — do not add a second Lenis. */
export default function SmoothScrolling() {
  useEffect(() => {
    return initSharedScroll();
  }, []);
  return null;
}
