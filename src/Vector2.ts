export class Vector2 {
  x: number;
  y: number;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  getLength() {
    return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
  }

  angleTo(vec: Vector2) {
    return Math.acos(
      (this.x * vec.x + this.y * vec.y) / (this.getLength() * vec.getLength())
    );
  }

  uNormalizeSelf() {
    let length = this.getLength();
    this.x = this.x / length;
    this.y = this.y / length;
  }
}
