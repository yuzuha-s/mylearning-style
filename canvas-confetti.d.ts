declare module 'canvas-confetti' {
  interface ConfettiOptions {
    startVelocity?: number;
    spread?: number;
    ticks?: number;
    zIndex?: number;
    particleCount?: number;
    origin?: {
      x?: number;
      y?: number;
    };
  }

  function confetti(options?: ConfettiOptions): Promise<void>;

  export default confetti;
}
