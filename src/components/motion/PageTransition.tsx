import { motion } from "framer-motion";
import { useMotionAllowed, EASE_OUT, EASE_IN_OUT, T_BASE, T_FAST } from "@/lib/motion";

/* ============================================================
   Page transition, the paper turn.
   Out: shift up 12px and fade over 180ms.
   In:  fade and settle from 12px below over 320ms.
   The header stays put throughout, so navigation never feels
   like a reload. Under reduced motion this is a plain cross-fade,
   and content is never delayed from becoming readable.
   ============================================================ */

export function PageTransition({ children }: { children: React.ReactNode }) {
  const allowed = useMotionAllowed();

  if (!allowed) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 1 }} transition={{ duration: 0.01 }}>
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0, transition: { duration: T_BASE, ease: EASE_OUT } }}
      exit={{ opacity: 0, y: -12, transition: { duration: T_FAST, ease: EASE_IN_OUT } }}
    >
      {children}
    </motion.div>
  );
}
