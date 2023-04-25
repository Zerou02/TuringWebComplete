export class MouseManager {
  mouseX = 0;
  mouseY = 0;
  constructor() {
    window.addEventListener("mousemove", (e) => {
      this.mouseX = e.x;
      this.mouseY = e.y;
    });
  }
}
