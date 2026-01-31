import { useRef, useCallback, useEffect, useState } from 'react';
import type { RefObject } from 'react';
import type { Point, Tool } from '../types';

const INITIAL_WIDTH = 3840;
const INITIAL_HEIGHT = 2160;
const EDGE_MARGIN = 120;
const GROWTH_STEP = 1024;

type UseCanvasOptions = {
  scrollContainerRef?: RefObject<HTMLDivElement | null>;
};

export const useCanvas = (tool: Tool, options?: UseCanvasOptions) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isDrawingRef = useRef(false);
  const lastPointRef = useRef<Point | null>(null);
  const velocityRef = useRef(0);
  const [canvasSize, setCanvasSize] = useState({
    width: INITIAL_WIDTH,
    height: INITIAL_HEIGHT,
  });
  const scrollContainerRef = options?.scrollContainerRef;

  const getContext = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    return canvas.getContext('2d');
  }, []);

  const getPoint = useCallback((e: MouseEvent | TouchEvent): Point => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    if ('touches' in e) {
      return {
        x: (e.touches[0].clientX - rect.left) * scaleX,
        y: (e.touches[0].clientY - rect.top) * scaleY,
      };
    }

    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    };
  }, []);

  const drawChalkLine = useCallback((ctx: CanvasRenderingContext2D, from: Point, to: Point) => {
    const distance = Math.sqrt(Math.pow(to.x - from.x, 2) + Math.pow(to.y - from.y, 2));
    const angle = Math.atan2(to.y - from.y, to.x - from.x);
    
    velocityRef.current = velocityRef.current * 0.7 + distance * 0.3;
    const speed = Math.min(velocityRef.current, 50);
    
    const baseWidth = 6;
    const pressureWidth = baseWidth + (speed * 0.1);
    
    const steps = Math.max(1, Math.floor(distance));

    for (let i = 0; i < steps; i++) {
      const t = i / steps;
      const x = from.x + (to.x - from.x) * t;
      const y = from.y + (to.y - from.y) * t;

      if (Math.random() > 0.15) {
        const perpAngle = angle + Math.PI / 2;
        const numParticles = 4 + Math.floor(Math.random() * 6);
        
        for (let j = 0; j < numParticles; j++) {
          const spread = (Math.random() - 0.5) * pressureWidth * 2;
          const perpOffset = Math.cos(perpAngle) * spread;
          const perpOffsetY = Math.sin(perpAngle) * spread;
          
          const jitter = (Math.random() - 0.5) * 3;
          const px = x + perpOffset + jitter;
          const py = y + perpOffsetY + jitter;

          const distFromCenter = Math.abs(spread) / pressureWidth;
          const edgeFade = 1 - Math.pow(distFromCenter, 2);
          const alpha = (0.15 + Math.random() * 0.4) * edgeFade;
          
          if (alpha < 0.05) continue;

          const brightness = 200 + Math.floor(Math.random() * 55);
          ctx.fillStyle = `rgba(${brightness}, ${brightness}, ${brightness}, ${alpha})`;
          
          const size = 0.5 + Math.random() * 2.5;
          
          ctx.beginPath();
          ctx.arc(px, py, size, 0, Math.PI * 2);
          ctx.fill();
        }

        if (Math.random() > 0.7) {
          const dustCount = 1 + Math.floor(Math.random() * 3);
          for (let d = 0; d < dustCount; d++) {
            const dustX = x + (Math.random() - 0.5) * 20;
            const dustY = y + (Math.random() - 0.5) * 20;
            const dustAlpha = 0.05 + Math.random() * 0.1;
            const dustSize = 0.3 + Math.random() * 1;
            
            ctx.fillStyle = `rgba(255, 255, 255, ${dustAlpha})`;
            ctx.beginPath();
            ctx.arc(dustX, dustY, dustSize, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }

      if (Math.random() > 0.85) {
        const gapLength = 2 + Math.random() * 4;
        const skipSteps = Math.min(gapLength, steps - i - 1);
        i += skipSteps;
      }
    }
  }, []);

  const resizeCanvas = useCallback((nextWidth: number, nextHeight: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (canvas.width === nextWidth && canvas.height === nextHeight) return;

    const prev = document.createElement('canvas');
    prev.width = canvas.width;
    prev.height = canvas.height;
    const prevCtx = prev.getContext('2d');
    if (prevCtx) {
      prevCtx.drawImage(canvas, 0, 0);
    }

    canvas.width = nextWidth;
    canvas.height = nextHeight;
    setCanvasSize({ width: nextWidth, height: nextHeight });

    const ctx = canvas.getContext('2d');
    if (ctx && prevCtx) {
      ctx.drawImage(prev, 0, 0);
    }
  }, []);

  const maybeGrowCanvas = useCallback((point: Point) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let nextWidth = canvas.width;
    let nextHeight = canvas.height;

    if (point.x > canvas.width - EDGE_MARGIN) {
      nextWidth = canvas.width + GROWTH_STEP;
    }

    if (point.y > canvas.height - EDGE_MARGIN) {
      nextHeight = canvas.height + GROWTH_STEP;
    }

    if (nextWidth !== canvas.width || nextHeight !== canvas.height) {
      resizeCanvas(nextWidth, nextHeight);
    }
  }, [resizeCanvas]);

  const maybeAutoScroll = useCallback((point: Point) => {
    const container = scrollContainerRef?.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const { scrollLeft, scrollTop, clientWidth, clientHeight } = container;
    const maxScrollLeft = Math.max(0, canvas.width - clientWidth);
    const maxScrollTop = Math.max(0, canvas.height - clientHeight);

    let nextLeft = scrollLeft;
    let nextTop = scrollTop;

    if (point.x > scrollLeft + clientWidth - EDGE_MARGIN) {
      nextLeft = Math.min(point.x - clientWidth + EDGE_MARGIN, maxScrollLeft);
    } else if (point.x < scrollLeft + EDGE_MARGIN) {
      nextLeft = Math.max(point.x - EDGE_MARGIN, 0);
    }

    if (point.y > scrollTop + clientHeight - EDGE_MARGIN) {
      nextTop = Math.min(point.y - clientHeight + EDGE_MARGIN, maxScrollTop);
    } else if (point.y < scrollTop + EDGE_MARGIN) {
      nextTop = Math.max(point.y - EDGE_MARGIN, 0);
    }

    if (nextLeft !== scrollLeft || nextTop !== scrollTop) {
      container.scrollTo({ left: nextLeft, top: nextTop });
    }
  }, [scrollContainerRef]);

  const erase = useCallback((ctx: CanvasRenderingContext2D, point: Point, lastPoint: Point | null) => {
    const radius = 45;
    
    ctx.save();
    ctx.globalCompositeOperation = 'destination-out';
    
    if (lastPoint) {
      const distance = Math.sqrt(Math.pow(point.x - lastPoint.x, 2) + Math.pow(point.y - lastPoint.y, 2));
      const steps = Math.max(1, Math.floor(distance / 10));
      
      for (let i = 0; i <= steps; i++) {
        const t = i / steps;
        const x = lastPoint.x + (point.x - lastPoint.x) * t;
        const y = lastPoint.y + (point.y - lastPoint.y) * t;
        
        for (let j = 0; j < 6; j++) {
          const offsetX = (Math.random() - 0.5) * 40;
          const offsetY = (Math.random() - 0.5) * 20;
          const r = radius * (0.7 + Math.random() * 0.5);
          
          ctx.beginPath();
          ctx.arc(x + offsetX, y + offsetY, r, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    } else {
      for (let i = 0; i < 6; i++) {
        const offsetX = (Math.random() - 0.5) * 40;
        const offsetY = (Math.random() - 0.5) * 20;
        ctx.beginPath();
        ctx.arc(point.x + offsetX, point.y + offsetY, radius + Math.random() * 15, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    
    ctx.restore();
  }, []);

  const startDrawing = useCallback((e: MouseEvent | TouchEvent) => {
    e.preventDefault();
    isDrawingRef.current = true;
    velocityRef.current = 0;
    lastPointRef.current = getPoint(e);
  }, [getPoint]);

  const draw = useCallback((e: MouseEvent | TouchEvent) => {
    e.preventDefault();
    if (!isDrawingRef.current) return;

    const ctx = getContext();
    if (!ctx) return;

    const currentPoint = getPoint(e);
    const lastPoint = lastPointRef.current;

    maybeGrowCanvas(currentPoint);
    maybeAutoScroll(currentPoint);

    if (lastPoint) {
      if (tool === 'chalk') {
        drawChalkLine(ctx, lastPoint, currentPoint);
      } else {
        erase(ctx, currentPoint, lastPoint);
      }
    }

    lastPointRef.current = currentPoint;
  }, [tool, getContext, getPoint, drawChalkLine, erase, maybeGrowCanvas, maybeAutoScroll]);

  const stopDrawing = useCallback(() => {
    isDrawingRef.current = false;
    lastPointRef.current = null;
    velocityRef.current = 0;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleMouseDown = (e: MouseEvent) => startDrawing(e);
    const handleMouseMove = (e: MouseEvent) => draw(e);
    const handleMouseUp = () => stopDrawing();
    const handleMouseLeave = () => stopDrawing();

    const handleTouchStart = (e: TouchEvent) => startDrawing(e);
    const handleTouchMove = (e: TouchEvent) => draw(e);
    const handleTouchEnd = () => stopDrawing();

    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseup', handleMouseUp);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    canvas.addEventListener('touchstart', handleTouchStart, { passive: false });
    canvas.addEventListener('touchmove', handleTouchMove, { passive: false });
    canvas.addEventListener('touchend', handleTouchEnd);

    return () => {
      canvas.removeEventListener('mousedown', handleMouseDown);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseup', handleMouseUp);
      canvas.removeEventListener('mouseleave', handleMouseLeave);

      canvas.removeEventListener('touchstart', handleTouchStart);
      canvas.removeEventListener('touchmove', handleTouchMove);
      canvas.removeEventListener('touchend', handleTouchEnd);
    };
  }, [startDrawing, draw, stopDrawing]);

  return { canvasRef, canvasSize };
};
