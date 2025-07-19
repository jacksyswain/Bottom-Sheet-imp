export function animateSpring(from, to, onUpdate, onComplete) {
  let velocity = 0;
  const stiffness = 0.1;
  const damping = 0.8;

  function step() {
    const force = -stiffness * (from - to);
    velocity += force;
    velocity *= damping;
    from += velocity;

    onUpdate(from);

    if (Math.abs(from - to) > 0.5 || Math.abs(velocity) > 0.5) {
      requestAnimationFrame(step);
    } else {
      onUpdate(to);
      onComplete?.();
    }
  }

  requestAnimationFrame(step);
}