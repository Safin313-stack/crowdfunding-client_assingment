import { useEffect } from 'react';

const CustomCursor = () => {
  useEffect(() => {
    const isTouchDevice = window.matchMedia('(max-width: 768px)').matches || 'ontouchstart' in window;
    if (isTouchDevice) return; // keep native cursor on mobile/tablet

    const dot = document.getElementById('custom-cursor');
    const ring = document.getElementById('cursor-ring');
    let ringX = 0, ringY = 0;

    document.body.classList.add('cursor-ready');

    const move = (e) => {
      dot.style.left = `${e.clientX}px`;
      dot.style.top = `${e.clientY}px`;
      ringX = e.clientX;
      ringY = e.clientY;
    };

    const animateRing = () => {
      ring.style.left = `${ringX}px`;
      ring.style.top = `${ringY}px`;
      requestAnimationFrame(animateRing);
    };

    const grow = () => document.body.classList.add('cursor-grow');
    const shrink = () => document.body.classList.remove('cursor-grow');

    window.addEventListener('mousemove', move);
    requestAnimationFrame(animateRing);

    document.querySelectorAll('a, button, .cursor-hover').forEach((el) => {
      el.addEventListener('mouseenter', grow);
      el.addEventListener('mouseleave', shrink);
    });

    return () => {
      window.removeEventListener('mousemove', move);
      document.body.classList.remove('cursor-ready');
    };
  }, []);

  return (
    <>
      <div id="custom-cursor" />
      <div id="cursor-ring" />
    </>
  );
};

export default CustomCursor;
