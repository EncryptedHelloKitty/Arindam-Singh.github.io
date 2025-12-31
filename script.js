// STAR BACKGROUND
const canvas = document.getElementById("stars");
const ctx = canvas.getContext("2d");

let w, h, stars;
function resize() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
  stars = Array.from({length: 120}, () => ({
    x: Math.random()*w,
    y: Math.random()*h,
    r: Math.random()*1.5,
    v: Math.random()*0.3
  }));
}
resize();
window.onresize = resize;

function animate() {
  ctx.clearRect(0,0,w,h);
  ctx.fillStyle = "#00ff9c";
  stars.forEach(s => {
    s.y += s.v;
    if (s.y > h) s.y = 0;
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI*2);
    ctx.fill();
  });
  requestAnimationFrame(animate);
}
animate();

// TYPING HEADINGS
const headers = document.querySelectorAll(".type");

const obs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting || e.target.dataset.done) return;
    e.target.dataset.done = true;
    const text = e.target.dataset.text;
    let i = 0;
    e.target.textContent = "";
    const cursor = document.createElement("span");
    cursor.textContent = "|";
    e.target.appendChild(cursor);

    function type() {
      if (i < text.length) {
        e.target.insertBefore(document.createTextNode(text[i++]), cursor);
        setTimeout(type, 60);
      } else {
        cursor.remove();
      }
    }
    type();
  });
}, { threshold: 0.4 });

headers.forEach(h => obs.observe(h));
