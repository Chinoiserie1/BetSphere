"use client";
import { useEffect, useRef } from "react";

const MetaballsAnimation = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl");
    if (!gl) return;

    let width = (canvas.width = window.innerWidth * 0.75);
    let height = (canvas.height = window.innerHeight * 0.75);
    const numMetaballs = 30;
    const metaballs: {
      x: number;
      y: number;
      vx: number;
      vy: number;
      r: number;
    }[] = [];

    let boundaryWidth = width * 0.8;
    let boundaryHeight = height * 0.8;
    let boundaryX = (width - boundaryWidth) / 2;
    let boundaryY = (height - boundaryHeight) / 2;

    // const resizeCanvas = () => {
    //   canvas.width = window.innerWidth * 0.75;
    //   canvas.height = window.innerHeight * 0.75;
    //   gl.viewport(0, 0, canvas.width, canvas.height);
    // };
    const resizeCanvas = () => {
      width = canvas.width = window.innerWidth * 0.75;
      height = canvas.height = window.innerHeight * 0.75;

      boundaryWidth = width * 0.8;
      boundaryHeight = height * 0.8;
      boundaryX = (width - boundaryWidth) / 2;
      boundaryY = (height - boundaryHeight) / 2;

      gl.viewport(0, 0, canvas.width, canvas.height);

      metaballs.forEach((metaball) => {
        metaball.x = Math.max(
          boundaryX + metaball.r,
          Math.min(boundaryX + boundaryWidth - metaball.r, metaball.x)
        );
        metaball.y = Math.max(
          boundaryY + metaball.r,
          Math.min(boundaryY + boundaryHeight - metaball.r, metaball.y)
        );
      });
    };

    resizeCanvas();

    for (let i = 0; i < numMetaballs; i++) {
      const radius = Math.random() * 60 + 10;
      metaballs.push({
        x: Math.random() * (width - 2 * radius) + radius,
        y: Math.random() * (height - 2 * radius) + radius,
        vx: (Math.random() - 0.5) * 3,
        vy: (Math.random() - 0.5) * 3,
        r: radius * 0.75,
      });
    }

    const vertexShaderSrc = `
      attribute vec2 position;
      void main() {
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `;

    const fragmentShaderSrc = `
      precision highp float;
      const float WIDTH = ${width >> 0}.0;
      const float HEIGHT = ${height >> 0}.0;
      uniform vec3 metaballs[${numMetaballs}];
      void main() {
        float x = gl_FragCoord.x;
        float y = gl_FragCoord.y;
        float sum = 0.0;
        for (int i = 0; i < ${numMetaballs}; i++) {
          vec3 metaball = metaballs[i];
          float dx = metaball.x - x;
          float dy = metaball.y - y;
          float radius = metaball.z;
          sum += (radius * radius) / (dx * dx + dy * dy);
        }
        if (sum >= 0.99) {
          gl_FragColor = vec4(mix(vec3(x / WIDTH, y / HEIGHT, 1.0), vec3(0, 0, 0), max(0.0, 1.0 - (sum - 0.99) * 100.0)), 1.0);
          return;
        }
        gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);
      }
    `;

    const compileShader = (src: string, type: number) => {
      const shader = gl.createShader(type);
      if (!shader) throw new Error("Shader creation failed");
      gl.shaderSource(shader, src);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        throw new Error(
          "Shader compile failed: " + gl.getShaderInfoLog(shader)
        );
      }
      return shader;
    };

    const vertexShader = compileShader(vertexShaderSrc, gl.VERTEX_SHADER);
    const fragmentShader = compileShader(fragmentShaderSrc, gl.FRAGMENT_SHADER);
    const program = gl.createProgram() as WebGLProgram;
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    gl.useProgram(program);

    const vertexData = new Float32Array([-1, 1, -1, -1, 1, 1, 1, -1]);
    const vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertexData, gl.STATIC_DRAW);

    const positionHandle = gl.getAttribLocation(program, "position");
    gl.enableVertexAttribArray(positionHandle);
    gl.vertexAttribPointer(positionHandle, 2, gl.FLOAT, false, 2 * 4, 0);

    const metaballsHandle = gl.getUniformLocation(program, "metaballs");

    gl.useProgram(program);

    const loop = () => {
      for (let i = 0; i < numMetaballs; i++) {
        const metaball = metaballs[i];
        metaball.x += metaball.vx;
        metaball.y += metaball.vy;
        // if (metaball.x < metaball.r || metaball.x > width - metaball.r)
        //   metaball.vx *= -1;
        // if (metaball.y < metaball.r || metaball.y > height - metaball.r)
        //   metaball.vy *= -1;
        if (
          metaball.x < boundaryX + metaball.r ||
          metaball.x > boundaryX + boundaryWidth - metaball.r
        ) {
          metaball.vx *= -1;
        }
        if (
          metaball.y < boundaryY + metaball.r ||
          metaball.y > boundaryY + boundaryHeight - metaball.r
        ) {
          metaball.vy *= -1;
        }
      }

      const dataToSendToGPU = new Float32Array(3 * numMetaballs);
      for (let i = 0; i < numMetaballs; i++) {
        const baseIndex = 3 * i;
        const mb = metaballs[i];
        dataToSendToGPU[baseIndex] = mb.x;
        dataToSendToGPU[baseIndex + 1] = mb.y;
        dataToSendToGPU[baseIndex + 2] = mb.r;
      }
      gl.uniform3fv(metaballsHandle, dataToSendToGPU);

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

      requestAnimationFrame(loop);
    };

    loop();

    window.addEventListener("resize", resizeCanvas);

    return () => {
      if (canvas) {
        const ctx = canvas.getContext("webgl");
        if (ctx) ctx.clear(ctx.COLOR_BUFFER_BIT);
      }
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <canvas ref={canvasRef} className="absolute z-1 w-full h-full"></canvas>
  );
};

export default MetaballsAnimation;
