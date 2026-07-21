// Custom cursor with smooth interpolation
const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursor-follower');

let mouseX = 0, mouseY = 0;
let cursorX = 0, cursorY = 0;
let followerX = 0, followerY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function animateCursor() {
  // Cursor follows mouse directly with slight smoothing
  cursorX += (mouseX - cursorX) * 0.5;
  cursorY += (mouseY - cursorY) * 0.5;
  if(cursor) {
      cursor.style.left = cursorX + 'px';
      cursor.style.top = cursorY + 'px';
  }
  
  // Follower has more lag for a trailing effect
  followerX += (mouseX - followerX) * 0.15;
  followerY += (mouseY - followerY) * 0.15;
  if(follower) {
      follower.style.left = followerX + 'px';
      follower.style.top = followerY + 'px';
  }
  
  requestAnimationFrame(animateCursor);
}

animateCursor();

// Scale up cursor on interactive elements
const interactiveElements = document.querySelectorAll('a, button, .menu-card, input');
interactiveElements.forEach(el => {
  el.addEventListener('mouseenter', () => {
    if(cursor) cursor.classList.add('hover');
    if(follower) follower.classList.add('hover');
  });
  el.addEventListener('mouseleave', () => {
    if(cursor) cursor.classList.remove('hover');
    if(follower) follower.classList.remove('hover');
  });
});

// Hide cursor when leaving window
document.addEventListener('mouseleave', () => {
  if(cursor) cursor.style.opacity = '0';
  if(follower) follower.style.opacity = '0';
});
document.addEventListener('mouseenter', () => {
  if(cursor) cursor.style.opacity = '1';
  if(follower) follower.style.opacity = '1';
});
