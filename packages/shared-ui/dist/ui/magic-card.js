"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion, useMotionTemplate, useMotionValue } from "motion/react";
import { useCallback, useEffect } from "react";
import { cn } from "../lib/utils";
export function MagicCard({ children, className, gradientSize = 200, gradientColor = "#262626", gradientOpacity = 0.8, gradientFrom = "#9E7AFF", gradientTo = "#FE8BBB", }) {
    const mouseX = useMotionValue(-gradientSize);
    const mouseY = useMotionValue(-gradientSize);
    const reset = useCallback(() => {
        mouseX.set(-gradientSize);
        mouseY.set(-gradientSize);
    }, [gradientSize, mouseX, mouseY]);
    const handlePointerMove = useCallback((e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        mouseX.set(e.clientX - rect.left);
        mouseY.set(e.clientY - rect.top);
    }, [mouseX, mouseY]);
    useEffect(() => {
        reset();
    }, [reset]);
    useEffect(() => {
        const handleGlobalPointerOut = (e) => {
            if (!e.relatedTarget) {
                reset();
            }
        };
        const handleVisibility = () => {
            if (document.visibilityState !== "visible") {
                reset();
            }
        };
        window.addEventListener("pointerout", handleGlobalPointerOut);
        window.addEventListener("blur", reset);
        document.addEventListener("visibilitychange", handleVisibility);
        return () => {
            window.removeEventListener("pointerout", handleGlobalPointerOut);
            window.removeEventListener("blur", reset);
            document.removeEventListener("visibilitychange", handleVisibility);
        };
    }, [reset]);
    return (_jsxs("div", { className: cn("group relative rounded-[inherit]", className), onPointerMove: handlePointerMove, onPointerLeave: reset, onPointerEnter: reset, children: [_jsx(motion.div, { className: "pointer-events-none absolute inset-0 rounded-[inherit] bg-border duration-300 group-hover:opacity-100", style: {
                    background: useMotionTemplate `
          radial-gradient(${gradientSize}px circle at ${mouseX}px ${mouseY}px,
          ${gradientFrom}, 
          ${gradientTo}, 
          var(--border) 100%
          )
          `,
                } }), _jsx("div", { className: "absolute inset-px rounded-[inherit] bg-background" }), _jsx(motion.div, { className: "pointer-events-none absolute inset-px rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100", style: {
                    background: useMotionTemplate `
            radial-gradient(${gradientSize}px circle at ${mouseX}px ${mouseY}px, ${gradientColor}, transparent 100%)
          `,
                    opacity: gradientOpacity,
                } }), _jsx("div", { className: "relative", children: children })] }));
}
