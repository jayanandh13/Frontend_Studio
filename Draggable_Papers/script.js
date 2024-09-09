let highestZ = 1;

class Paper {
  constructor() {
    this.holdingPaper = false;
    this.mouseTouchX = 0;
    this.mouseTouchY = 0;
    this.mouseX = 0;
    this.mouseY = 0;
    this.prevMouseX = 0;
    this.prevMouseY = 0;
    this.velX = 0;
    this.velY = 0;
    this.rotation = Math.random() * 30 - 15;
    this.currentPaperX = 0;
    this.currentPaperY = 0;
    this.rotating = false;
  }

  onMouseMove(e, paper) {
    if (!this.rotating) {
      this.mouseX = e.clientX;
      this.mouseY = e.clientY;

      this.velX = this.mouseX - this.prevMouseX;
      this.velY = this.mouseY - this.prevMouseY;
    }

    const dirX = e.clientX - this.mouseTouchX;
    const dirY = e.clientY - this.mouseTouchY;
    const dirLength = Math.hypot(dirX, dirY);
    const dirNormalizedX = dirX / dirLength;
    const dirNormalizedY = dirY / dirLength;

    const angle = Math.atan2(dirNormalizedY, dirNormalizedX);
    const degrees = (360 + Math.round((angle * 180) / Math.PI)) % 360;

    if (this.rotating) {
      this.rotation = degrees;
    }

    if (this.holdingPaper) {
      if (!this.rotating) {
        this.currentPaperX += this.velX;
        this.currentPaperY += this.velY;
      }
      this.prevMouseX = this.mouseX;
      this.prevMouseY = this.mouseY;

      paper.style.transform = `translateX(${this.currentPaperX}px) translateY(${this.currentPaperY}px) rotateZ(${this.rotation}deg)`;
    }
  }

  onMouseDown(e, paper) {
    if (this.holdingPaper) return;
    this.holdingPaper = true;

    paper.style.zIndex = highestZ++;
    
    this.mouseTouchX = this.mouseX;
    this.mouseTouchY = this.mouseY;
    this.prevMouseX = this.mouseX;
    this.prevMouseY = this.mouseY;

    if (e.button === 2) {
      this.rotating = true;
    }
  }

  onMouseUp() {
    this.holdingPaper = false;
    this.rotating = false;
  }

  init(paper) {
    document.addEventListener('mousemove', (e) => this.onMouseMove(e, paper));
    paper.addEventListener('mousedown', (e) => this.onMouseDown(e, paper));
    window.addEventListener('mouseup', () => this.onMouseUp());
  }
}

const papers = document.querySelectorAll('.paper');
papers.forEach(paper => {
  const p = new Paper();
  p.init(paper);
});
