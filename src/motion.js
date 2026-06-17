// Shared Framer Motion presets — mirrors the original's entrance/hover feel.
// Easing [0.16, 1, 0.3, 1] = "easeOutExpo"-style, the signature Framer reveal curve.

export const EASE = [0.16, 1, 0.3, 1];

// Fade + slide up, used for almost every section element
export const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE },
  },
};

// Container that staggers its children's reveal
export const stagger = (gap = 0.08, delay = 0) => ({
  hidden: {},
  show: {
    transition: { staggerChildren: gap, delayChildren: delay },
  },
});

// Subtle scale-in for cards/panels
export const scaleIn = {
  hidden: { opacity: 0, scale: 0.96, y: 30 },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE },
  },
};

// Standard whileInView viewport config (reveal once, a bit before fully on screen)
export const viewport = { once: true, margin: '-80px' };

// Hover spring for interactive cards/buttons
export const hoverLift = {
  whileHover: { y: -6, transition: { type: 'spring', stiffness: 300, damping: 20 } },
};
