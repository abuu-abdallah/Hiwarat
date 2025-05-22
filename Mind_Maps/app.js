function toggle(wrapper) {
    event.stopPropagation();
    const toggleIcon = wrapper.querySelector(".toggle");
    const branch = wrapper.parentElement.querySelector("ul");
    if (!branch || !toggleIcon) return;

    const isVisible = branch.classList.contains("visible");

    if (isVisible) {
      // Collapse
      branch.style.maxHeight = branch.scrollHeight + "px"; // ensure it's set first
      requestAnimationFrame(() => {
        branch.style.transition = "max-height 1s ease-out";
        branch.style.maxHeight = "0";
      });
      toggleIcon.textContent = "►";
      branch.classList.remove("visible");
    } else {
      // Expand
      branch.classList.add("visible");
      branch.style.maxHeight = "0";
      requestAnimationFrame(() => {
        const scrollHeight = branch.scrollHeight;
        branch.style.transition = "max-height 1s ease-in";
        branch.style.maxHeight = scrollHeight + "px";
      });
      toggleIcon.textContent = "▼";
    }

    // Reset after animation
    branch.addEventListener("transitionend", function cleanup() {
      if (branch.classList.contains("visible")) {
        branch.style.maxHeight = "none"; // let it auto-expand
      } else {
        branch.style.maxHeight = null;
      }
      branch.style.transition = "";
      branch.removeEventListener("transitionend", cleanup);
    });
  }
  const btn = document.getElementById('fullscreen-btn');
    function updateFullscreenButton() {
      if (document.fullscreenElement) {
        /*btn.innerHTML = "> <";*/
        btn.innerHTML = '<img src="assets/images/exit-fullscreen.png" alt="Full Screen" height=15px width=15px>';
        btn.title = "Exit Full Screen";
      } else {
        btn.innerHTML = '<img src="assets/images/fullscreen.png" alt="Full Screen" height=15px width=15px>';
        btn.title = "Full Screen";

      }
    }
    
    btn.addEventListener('click', () => {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
      } else {
        document.exitFullscreen();
      }
    });

    document.addEventListener('fullscreenchange', updateFullscreenButton);

    const zoomInBtn = document.getElementById('zoom-in-btn');
const zoomOutBtn = document.getElementById('zoom-out-btn');
const mindmapElement = document.querySelector('.mindmap');

let currentScale = 1;

function applyScale() {
mindmapElement.style.transform = `scale(${currentScale})`;
}

zoomInBtn.addEventListener('click', () => {
currentScale = Math.min(currentScale + 0.1, 3);
applyScale();
});

zoomOutBtn.addEventListener('click', () => {
currentScale = Math.max(currentScale - 0.1, 0.3);
applyScale();
});
// Replace your current panning code with this:
const container = document.getElementById('zoom-container');
const mindmap = container.querySelector('.mindmap');

let isDragging = false;
let startX, startY;
let offsetX = 0;
let offsetY = 0;

function updateTransform() {
mindmap.style.transform = `translate(${offsetX}px, ${offsetY}px) scale(${currentScale})`;
}

container.addEventListener('mousedown', (e) => {
if (e.target.closest('.node-wrapper')) return; // Don't drag when clicking nodes
isDragging = true;
container.classList.add('dragging');
startX = e.clientX - offsetX;
startY = e.clientY - offsetY;
e.preventDefault();
});

container.addEventListener('mousemove', (e) => {
if (!isDragging) return;
offsetX = e.clientX - startX;
offsetY = e.clientY - startY;
updateTransform();
e.preventDefault();
});

container.addEventListener('mouseup', () => {
isDragging = false;
container.classList.remove('dragging');
});

container.addEventListener('mouseleave', () => {
isDragging = false;
container.classList.remove('dragging');
});

// Reset position when zooming
function applyScale() {
mindmap.style.transform = `translate(${offsetX}px, ${offsetY}px) scale(${currentScale})`;
}
// Define three random colors
const branchColors = ['#0097B1', '#365241', '#FCA105'];


function assignColorToBranch(liElement, color = null) {
    // Choose a new color if not passed down
    if (!color) {
      color = branchColors[Math.floor(Math.random() * branchColors.length)];
    }

    // Apply color to the node
    const nodeWrapper = liElement.querySelector(':scope > .node-wrapper');
    if (nodeWrapper) {
      const node = nodeWrapper.querySelector('.node');
      const toggle = nodeWrapper.querySelector('.toggle');

      if (node) node.style.backgroundColor = color;
      if (toggle) {
        toggle.style.color = color;
        toggle.style.fontWeight = 'bold'; // Optional: make it pop
      }
    }

    // Apply color to children recursively
    const childLis = liElement.querySelectorAll(':scope > ul > li');
    childLis.forEach(childLi => assignColorToBranch(childLi, color));
  }

  window.addEventListener('DOMContentLoaded', () => {
    const rootLi = document.querySelector('.node.root')?.closest('li');
    if (!rootLi) return;

    const topLevelBranches = rootLi.querySelectorAll(':scope > ul > li');
    topLevelBranches.forEach(li => assignColorToBranch(li));
  });