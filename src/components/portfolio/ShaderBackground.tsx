'use client';

import { useRef, useEffect, useState } from 'react';

const VERT = `
  attribute vec2 a_position;
  varying vec2 vUv;
  void main() {
    vUv = a_position * 0.5 + 0.5;
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`;

const FRAG = `
  precision highp float;
  uniform float uTime;
  uniform vec2 uResolution;
  uniform vec2 uMouse;
  varying vec2 vUv;

  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec3 permute(vec3 x) { return mod289(((x * 34.0) + 1.0) * x); }

  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                        -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0))
      + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy),
      dot(x12.zw, x12.zw)), 0.0);
    m = m * m;
    m = m * m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  void main() {
    vec2 uv = vUv;
    float aspect = uResolution.x / uResolution.y;
    vec2 p = (uv - 0.5) * vec2(aspect, 1.0);

    vec2 mouse = (uMouse - 0.5) * vec2(aspect, 1.0);
    float mouseDist = length(p - mouse);
    float mouseInfluence = smoothstep(0.5, 0.0, mouseDist) * 0.3;

    float t = uTime * 0.15;
    float n1 = snoise(p * 1.5 + vec2(t, t * 0.7));
    float n2 = snoise(p * 3.0 - vec2(t * 0.5, t * 0.3) + n1 * 0.5);
    float n3 = snoise(p * 5.0 + vec2(t * 0.2, -t * 0.4) + n2 * 0.3);

    float noise = n1 * 0.5 + n2 * 0.3 + n3 * 0.2 + mouseInfluence;

    vec3 darkBase = vec3(0.02, 0.02, 0.04);
    vec3 color1 = vec3(0.08, 0.12, 0.22);
    vec3 color2 = vec3(0.15, 0.05, 0.20);
    vec3 color3 = vec3(0.05, 0.18, 0.15);
    vec3 color4 = vec3(0.20, 0.10, 0.05);

    vec3 col = darkBase;
    col += color1 * smoothstep(-0.2, 0.8, noise) * 0.6;
    col += color2 * smoothstep(0.0, 1.0, n2) * 0.4;
    col += color3 * smoothstep(0.1, 0.9, n3) * 0.3;
    col += color4 * smoothstep(-0.5, 0.5, sin(noise * 3.14159 + t)) * 0.2;

    float gridX = smoothstep(0.98, 1.0, sin(uv.x * 40.0));
    float gridY = smoothstep(0.98, 1.0, sin(uv.y * 40.0));
    float grid = max(gridX, gridY) * 0.04;
    col += vec3(grid) * (0.5 + 0.5 * sin(noise * 2.0));

    float vignette = 1.0 - smoothstep(0.3, 1.2, length(p * 0.8));
    col *= vignette;

    float grain = fract(sin(dot(uv * uTime * 0.01, vec2(12.9898, 78.233))) * 43758.5453);
    col += (grain - 0.5) * 0.015;

    gl_FragColor = vec4(col, 1.0);
  }
`;

function createShader(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error(gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

function createProgram(gl: WebGLRenderingContext, vertSrc: string, fragSrc: string) {
  const vert = createShader(gl, gl.VERTEX_SHADER, vertSrc);
  const frag = createShader(gl, gl.FRAGMENT_SHADER, fragSrc);
  if (!vert || !frag) return null;

  const program = gl.createProgram();
  if (!program) return null;
  gl.attachShader(program, vert);
  gl.attachShader(program, frag);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error(gl.getProgramInfoLog(program));
    return null;
  }
  return program;
}

export default function ShaderBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl', {
      antialias: false,
      alpha: false,
      preserveDrawingBuffer: false,
      powerPreference: 'high-performance',
    });
    if (!gl) {
      setHasError(true);
      return;
    }

    const program = createProgram(gl, VERT, FRAG);
    if (!program) {
      setHasError(true);
      return;
    }

    // Full-screen quad
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW
    );

    const posLoc = gl.getAttribLocation(program, 'a_position');
    const timeLoc = gl.getUniformLocation(program, 'uTime');
    const resLoc = gl.getUniformLocation(program, 'uResolution');
    const mouseLoc = gl.getUniformLocation(program, 'uMouse');

    // Mouse tracking
    const mouse = { x: 0.5, y: 0.5 };
    const target = { x: 0.5, y: 0.5 };
    const onMouseMove = (e: MouseEvent) => {
      target.x = e.clientX / window.innerWidth;
      target.y = 1.0 - e.clientY / window.innerHeight;
    };
    window.addEventListener('mousemove', onMouseMove);

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 1.5);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = window.innerWidth + 'px';
      canvas.style.height = window.innerHeight + 'px';
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();
    window.addEventListener('resize', resize);

    let animId: number;
    let startTime = performance.now();

    const render = () => {
      animId = requestAnimationFrame(render);

      const elapsed = (performance.now() - startTime) * 0.001;
      mouse.x += (target.x - mouse.x) * 0.05;
      mouse.y += (target.y - mouse.y) * 0.05;

      gl.useProgram(program);
      gl.enableVertexAttribArray(posLoc);
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

      gl.uniform1f(timeLoc, elapsed);
      gl.uniform2f(resLoc, canvas.width, canvas.height);
      gl.uniform2f(mouseLoc, mouse.x, mouse.y);

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    };

    try {
      render();
    } catch {
      setHasError(true);
    }

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', resize);
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
    };
  }, []);

  if (hasError) {
    return <div className="fixed inset-0 -z-10 bg-[#050510]" />;
  }

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10"
      style={{ background: '#050510' }}
    />
  );
}