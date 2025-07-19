
import { useEffect } from 'react';

export function useDrag(ref, onDragEnd, onDragMove) {
  useEffect(() => {
    let startY = 0;
    let currentY = 0;
    let dragging = false;

    const handleMouseDown = (e) => {
      dragging = true;
      startY = e.clientY || e.touches?.[0]?.clientY;
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchmove', handleMouseMove);
      document.addEventListener('touchend', handleMouseUp);
    };

    const handleMouseMove = (e) => {
      if (!dragging) return;
      currentY = e.clientY || e.touches?.[0]?.clientY;
      const delta = currentY - startY;
      onDragMove?.(delta);
    };

    const handleMouseUp = () => {
      dragging = false;
      onDragEnd(currentY - startY);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleMouseMove);
      document.removeEventListener('touchend', handleMouseUp);
    };

    const el = ref.current;
    el.addEventListener('mousedown', handleMouseDown);
    el.addEventListener('touchstart', handleMouseDown);

    return () => {
      el.removeEventListener('mousedown', handleMouseDown);
      el.removeEventListener('touchstart', handleMouseDown);
    };
  }, [ref, onDragEnd, onDragMove]);
}