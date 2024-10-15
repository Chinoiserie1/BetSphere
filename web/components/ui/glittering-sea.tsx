"use client";
import { useEffect, useRef } from "react";

class Shape {
  x: number;
  y: number;
  r: number;
  ga: number;
  v: { x: number; y: number };
  l: number;
  sl: number;
  ctx: CanvasRenderingContext2D;

  constructor(ctx: CanvasRenderingContext2D, x: number, y: number) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.r = Math.floor(Math.random() * (25 - 10 + 1) + 10);
    this.ga = Math.random() ** 4;
    this.v = { x: Math.random(), y: -1 };
    this.l = Math.floor(Math.random() * (20 - 0 + 1) + 0);
    this.sl = this.l;
  }

  init(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.r = Math.floor(Math.random() * (25 - 10 + 1) + 10);
    this.ga = Math.random() ** 4;
    this.v = { x: Math.random(), y: -1 };
    this.l = Math.floor(Math.random() * (20 - 0 + 1) + 0);
    this.sl = this.l;
  }

  updateParams() {
    this.l -= 0.5;
    if (this.l < 0) {
      const X = window.innerWidth;
      const Y = window.innerHeight;
      this.init(
        (X * (Math.random() + Math.random())) / 2,
        Math.floor(Math.random() * Y)
      );
    }
  }

  updatePosition() {
    this.x += Math.random() * 0.2;
    this.y -= Math.random() * 0.2;
  }

  draw() {
    this.ctx.save();
    this.ctx.globalCompositeOperation = "lighter";
    this.ctx.globalAlpha = this.ga;
    this.ctx.fillStyle = "white";
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
    this.ctx.fill();
    this.ctx.restore();
  }

  render() {
    this.updatePosition();
    this.updateParams();
    this.draw();
  }
}

const GlitteringSea: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  let timeoutId: NodeJS.Timeout | null = null;
  let shapes: Shape[] = [];
  let X: number;
  let Y: number;
  let shapeNum: number = 300;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const calculateParticleCount = () => {
      X = canvas.width = window.innerWidth;
      Y = canvas.height = window.innerHeight;
      const area = X * Y;
      shapeNum = Math.floor(area / 5000);
      shapes = [];
      for (let i = 0; i < shapeNum; i++) {
        shapes.push(
          new Shape(
            ctx,
            (X * (Math.random() + Math.random())) / 2,
            Math.floor(Math.random() * Y)
          )
        );
      }
    };

    const render = () => {
      ctx.clearRect(0, 0, X, Y);
      for (let i = 0; i < shapes.length; i++) {
        shapes[i].render();
      }
      timeoutId = setTimeout(() => {
        requestAnimationFrame(render);
      }, 50);
    };

    calculateParticleCount();
    render();

    const onResize = () => {
      calculateParticleCount();
    };

    window.addEventListener("resize", onResize);

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="block absolute top-0 left-0 w-full h-full z-0"
    ></canvas>
  );
};

export default GlitteringSea;
