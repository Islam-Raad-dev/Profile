'use client';

import React, { useEffect, useRef } from 'react';
import { PHONE_QUERY, REDUCED_MOTION_QUERY } from '@/lib/media';

const GRID_SPACING = 56;
const GRID_SPACING_MOBILE = 65;
const MOUSE_RADIUS = 150;
const MAX_PULL = 12;
const BASE_DOT_OPACITY = 0.13;
const ACTIVE_DOT_OPACITY = 0.55;
const MAX_LINE_OPACITY = 0.22;
const DOT_RADIUS = 1.25;
const LINE_WIDTH = 0.55;
const LINK_DISTANCE = 75;
const CURSOR_LINK_DISTANCE = 110;
const SPRING_STIFFNESS = 0.07;
const SPRING_DAMPING = 0.85;
const DRIFT_AMPLITUDE = 1.5;
const DRIFT_SPEED = 0.0006;
const POINTER_FADE = 0.08;
const RESIZE_DEBOUNCE_MS = 120;
const MAX_PIXEL_RATIO = 2;
const COLOR_VARIABLE = '--neural-node';

const FULL_CIRCLE = Math.PI * 2;
const NEIGHBOR_OFFSETS: ReadonlyArray<readonly [number, number]> = [
  [1, 0],
  [0, 1],
  [1, 1],
  [-1, 1],
];

type GridNode = {
  originX: number;
  originY: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  phaseX: number;
  phaseY: number;
  proximity: number;
};

function smoothstep(value: number) {
  const clamped = Math.min(Math.max(value, 0), 1);
  return clamped * clamped * (3 - 2 * clamped);
}

export function NeuralGrid() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const canvas = canvasRef.current;
    if (!wrapper || !canvas) return;
    const context = canvas.getContext('2d');
    if (!context) return;
    const ctx = context;

    const reducedMotionMedia = window.matchMedia(REDUCED_MOTION_QUERY);
    const pointer = { clientX: -9999, clientY: -9999, active: false, influence: 0 };

    let nodes: GridNode[] = [];
    let columns = 0;
    let rows = 0;
    let width = 0;
    let height = 0;
    let color = '';
    let frameId = 0;
    let isRendered = true;
    let resizeTimer: ReturnType<typeof setTimeout> | undefined;

    const readColor = () => {
      color =
        getComputedStyle(document.documentElement).getPropertyValue(COLOR_VARIABLE).trim() ||
        getComputedStyle(canvas).color;
    };

    const buildGrid = () => {
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      const pixelRatio = Math.min(window.devicePixelRatio || 1, MAX_PIXEL_RATIO);
      canvas.width = Math.max(1, Math.round(width * pixelRatio));
      canvas.height = Math.max(1, Math.round(height * pixelRatio));
      ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

      const spacing = window.matchMedia(PHONE_QUERY).matches ? GRID_SPACING_MOBILE : GRID_SPACING;
      columns = Math.floor(width / spacing) + 1;
      rows = Math.floor(height / spacing) + 1;
      const offsetX = (width - (columns - 1) * spacing) / 2;
      const offsetY = (height - (rows - 1) * spacing) / 2;

      nodes = [];
      for (let row = 0; row < rows; row++) {
        for (let column = 0; column < columns; column++) {
          const originX = offsetX + column * spacing;
          const originY = offsetY + row * spacing;
          nodes.push({
            originX,
            originY,
            x: originX,
            y: originY,
            vx: 0,
            vy: 0,
            phaseX: Math.random() * FULL_CIRCLE,
            phaseY: Math.random() * FULL_CIRCLE,
            proximity: 0,
          });
        }
      }
    };

    const drawLinks = (pointerX: number, pointerY: number) => {
      for (let row = 0; row < rows; row++) {
        for (let column = 0; column < columns; column++) {
          const node = nodes[row * columns + column];
          for (const [columnStep, rowStep] of NEIGHBOR_OFFSETS) {
            const neighborColumn = column + columnStep;
            const neighborRow = row + rowStep;
            if (neighborColumn < 0 || neighborColumn >= columns || neighborRow >= rows) continue;
            const neighbor = nodes[neighborRow * columns + neighborColumn];
            const proximity = (node.proximity + neighbor.proximity) / 2;
            if (proximity <= 0) continue;
            const distance = Math.hypot(neighbor.x - node.x, neighbor.y - node.y);
            if (distance >= LINK_DISTANCE) continue;
            const distanceFade = 1 - Math.pow(distance / LINK_DISTANCE, 3);
            ctx.globalAlpha = MAX_LINE_OPACITY * proximity * distanceFade;
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(neighbor.x, neighbor.y);
            ctx.stroke();
          }
        }
      }

      for (const node of nodes) {
        const distance = Math.hypot(pointerX - node.x, pointerY - node.y);
        if (distance >= CURSOR_LINK_DISTANCE) continue;
        ctx.globalAlpha =
          MAX_LINE_OPACITY * smoothstep(1 - distance / CURSOR_LINK_DISTANCE) * pointer.influence;
        ctx.beginPath();
        ctx.moveTo(node.x, node.y);
        ctx.lineTo(pointerX, pointerY);
        ctx.stroke();
      }
    };

    const drawDots = () => {
      ctx.globalAlpha = BASE_DOT_OPACITY;
      ctx.beginPath();
      for (const node of nodes) {
        if (node.proximity > 0) continue;
        ctx.moveTo(node.x + DOT_RADIUS, node.y);
        ctx.arc(node.x, node.y, DOT_RADIUS, 0, FULL_CIRCLE);
      }
      ctx.fill();

      for (const node of nodes) {
        if (node.proximity <= 0) continue;
        ctx.globalAlpha = BASE_DOT_OPACITY + (ACTIVE_DOT_OPACITY - BASE_DOT_OPACITY) * node.proximity;
        ctx.beginPath();
        ctx.arc(node.x, node.y, DOT_RADIUS, 0, FULL_CIRCLE);
        ctx.fill();
      }
    };

    const render = (pointerX: number, pointerY: number) => {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = color;
      ctx.strokeStyle = color;
      ctx.lineWidth = LINE_WIDTH;
      if (pointer.influence > 0.001) drawLinks(pointerX, pointerY);
      drawDots();
      ctx.globalAlpha = 1;
    };

    const renderStatic = () => {
      for (const node of nodes) {
        node.x = node.originX;
        node.y = node.originY;
        node.vx = 0;
        node.vy = 0;
        node.proximity = 0;
      }
      pointer.influence = 0;
      render(0, 0);
    };

    const step = (time: number) => {
      const rect = canvas.getBoundingClientRect();
      const pointerX = pointer.clientX - rect.left;
      const pointerY = pointer.clientY - rect.top;
      pointer.influence += ((pointer.active ? 1 : 0) - pointer.influence) * POINTER_FADE;
      const influence = pointer.influence > 0.001 ? pointer.influence : 0;

      for (const node of nodes) {
        const homeX = node.originX + Math.sin(time * DRIFT_SPEED + node.phaseX) * DRIFT_AMPLITUDE;
        const homeY = node.originY + Math.cos(time * DRIFT_SPEED * 0.8 + node.phaseY) * DRIFT_AMPLITUDE;
        let targetX = homeX;
        let targetY = homeY;
        let proximity = 0;

        if (influence > 0) {
          const deltaX = pointerX - homeX;
          const deltaY = pointerY - homeY;
          const distance = Math.hypot(deltaX, deltaY);
          if (distance < MOUSE_RADIUS && distance > 0.001) {
            proximity = smoothstep(1 - distance / MOUSE_RADIUS) * influence;
            const pull = Math.min(distance, MAX_PULL * proximity);
            targetX += (deltaX / distance) * pull;
            targetY += (deltaY / distance) * pull;
          }
        }

        node.vx = (node.vx + (targetX - node.x) * SPRING_STIFFNESS) * SPRING_DAMPING;
        node.vy = (node.vy + (targetY - node.y) * SPRING_STIFFNESS) * SPRING_DAMPING;
        node.x += node.vx;
        node.y += node.vy;
        node.proximity = proximity;
      }

      render(pointerX, pointerY);
    };

    const frame = (time: number) => {
      step(time);
      frameId = requestAnimationFrame(frame);
    };

    const stop = () => {
      if (frameId) cancelAnimationFrame(frameId);
      frameId = 0;
    };

    const start = () => {
      if (frameId || !isRendered || reducedMotionMedia.matches) return;
      frameId = requestAnimationFrame(frame);
    };

    const handleMouseMove = (event: MouseEvent) => {
      pointer.clientX = event.clientX;
      pointer.clientY = event.clientY;
      pointer.active = true;
    };

    const handlePointerExit = () => {
      pointer.active = false;
    };

    const rebuild = () => {
      buildGrid();
      if (reducedMotionMedia.matches) renderStatic();
    };

    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(rebuild, RESIZE_DEBOUNCE_MS);
    };

    const handleMotionPreference = () => {
      if (reducedMotionMedia.matches) {
        stop();
        renderStatic();
      } else {
        start();
      }
    };

    const handleRenderStateChange = (event: Event) => {
      isRendered = !(event as Event & { skipped?: boolean }).skipped;
      if (isRendered) start();
      else stop();
    };

    readColor();
    buildGrid();
    if (reducedMotionMedia.matches) renderStatic();
    else start();

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(canvas);

    const themeObserver = new MutationObserver(() => {
      readColor();
      if (reducedMotionMedia.matches) renderStatic();
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class', 'data-theme'],
    });

    const supportsContentVisibility = 'contentVisibility' in document.documentElement.style;
    let visibilityObserver: IntersectionObserver | undefined;
    if (supportsContentVisibility) {
      wrapper.addEventListener('contentvisibilityautostatechange', handleRenderStateChange);
    } else {
      visibilityObserver = new IntersectionObserver(
        ([entry]) => {
          isRendered = entry.isIntersecting;
          if (isRendered) start();
          else stop();
        },
        { rootMargin: '200px' }
      );
      visibilityObserver.observe(wrapper);
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('blur', handlePointerExit);
    document.documentElement.addEventListener('mouseleave', handlePointerExit);
    reducedMotionMedia.addEventListener('change', handleMotionPreference);

    return () => {
      stop();
      clearTimeout(resizeTimer);
      resizeObserver.disconnect();
      themeObserver.disconnect();
      visibilityObserver?.disconnect();
      wrapper.removeEventListener('contentvisibilityautostatechange', handleRenderStateChange);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('blur', handlePointerExit);
      document.documentElement.removeEventListener('mouseleave', handlePointerExit);
      reducedMotionMedia.removeEventListener('change', handleMotionPreference);
    };
  }, []);

  return (
    <div
      ref={wrapperRef}
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none [content-visibility:auto]"
    >
      <canvas ref={canvasRef} className="block w-full h-full pointer-events-none" />
    </div>
  );
}
