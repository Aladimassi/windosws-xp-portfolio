import { motion } from "framer-motion";
import { useMousePosition } from "../../hooks/useMousePosition";

/** Orbes animés + spotlight qui suit la souris */
export function AnimatedBackground() {
  const { x, y } = useMousePosition();

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Spotlight souris */}
      <div
        className="absolute h-[600px] w-[600px] rounded-full opacity-30 blur-[100px] transition-transform duration-300 ease-out"
        style={{
          background: "radial-gradient(circle, rgba(99,102,241,0.4) 0%, transparent 70%)",
          left: x - 300,
          top: y - 300,
        }}
      />

      {/* Orbes flottants */}
      <motion.div
        className="orb orb-indigo absolute top-[10%] left-[15%] h-72 w-72"
        animate={{ x: [0, 30, -20, 0], y: [0, -40, 20, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="orb orb-violet absolute top-[60%] right-[10%] h-96 w-96"
        animate={{ x: [0, -40, 30, 0], y: [0, 30, -30, 0] }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="orb orb-fuchsia absolute bottom-[10%] left-[40%] h-64 w-64"
        animate={{ x: [0, 20, -30, 0], y: [0, -20, 40, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
