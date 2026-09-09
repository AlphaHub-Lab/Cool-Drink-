import { canAnimate } from "./accessibility";

interface Particle {
  x: number;
  y: number;
  r: number;
  vx: number;
  vy: number;
  rot: number;
  vr: number;
  alpha: number;
}

export function initFruitParticles(
  canvas: HTMLCanvasElement,
  options: { count?: number; gravity?: number } = {}
): () => void {
  const ctx = canvas.getContext("2d");
  if (!ctx) return () => {};

  const count = options.count ?? 50;
  const gravity = options.gravity ?? 0.012;
  let frame = 0;
  let particles: Particle[] = [];
  let width = 0;
  let height = 0;

  const resize = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = canvas.clientWidth;
    height = canvas.clientHeight;
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };

  resize();
  window.addEventListener("resize", resize);

  const randomParticle = (): Particle => ({
    x: Math.random() * width,
    y: Math.random() * height,
    r: 2 + Math.random() * 5,
    vx: (Math.random() - 0.5) * 0.25,
    vy: (Math.random() - 0.5) * 0.25,
    rot: Math.random() * Math.PI,
    vr: (Math.random() - 0.5) * 0.01,
    alpha: 0.12 + Math.random() * 0.32
  });

  particles = Array.from({ length: count }, randomParticle);

  if (!canAnimate()) {
    ctx.clearRect(0, 0, width, height);
    return () => window.removeEventListener("resize", resize);
  }

  const render = () => {
    frame = requestAnimationFrame(render);
    ctx.clearRect(0, 0, width, height);

    for (const p of particles) {
      p.vy += gravity;
      p.x += p.vx;
      p.y += p.vy;
      p.rot += p.vr;

      if (p.y > height + 20) Object.assign(p, randomParticle(), { y: -20 });
      if (p.x < -20) p.x = width + 20;
      if (p.x > width + 20) p.x = -20;

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.globalAlpha = p.alpha;
      ctx.beginPath();
      ctx.ellipse(0, 0, p.r * 1.3, p.r, 0, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255,255,255,1)";
      ctx.fill();
      ctx.restore();
    }
  };

  render();

  return () => {
    cancelAnimationFrame(frame);
    window.removeEventListener("resize", resize);
    ctx.clearRect(0, 0, width, height);
  };
}
