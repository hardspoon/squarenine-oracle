import React, { useEffect, useState } from 'react';
import { useSpring, animated } from '@react-spring/web';

export const CursorEffect: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  // React Spring animation for cursor follower
  const cursorSpring = useSpring({
    transform: `translate3d(${mousePosition.x}px, ${mousePosition.y}px, 0)`,
    scale: isHovering ? 1.5 : 1,
    opacity: isHovering ? 0.8 : 0.6,
    config: { tension: 300, friction: 30 },
  });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.matches('button, .grid-cell, .mystical-button, .cursor-hover')) {
        setIsHovering(true);
      }
    };

    const handleMouseLeave = () => {
      setIsHovering(false);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseenter', handleMouseEnter, true);
    document.addEventListener('mouseleave', handleMouseLeave, true);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter, true);
      document.removeEventListener('mouseleave', handleMouseLeave, true);
    };
  }, []);

  return (
    <animated.div
      style={{
        ...cursorSpring,
        left: '-12px',
        top: '-12px',
        background: 'radial-gradient(circle, rgba(99, 102, 241, 0.6) 0%, rgba(245, 158, 11, 0.4) 100%)',
      }}
      className="fixed pointer-events-none z-50 w-6 h-6 rounded-full mix-blend-difference"
    />
  );
};
