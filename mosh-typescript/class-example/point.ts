export class Point {
  private _x: number; // applied access modifier
  public _y: number;

  constuctor(x?: number, y?: number) {
    this._x = x;
    this._y = y;
  }
  draw() {
    console.log('X: ' + this._x + ", Y: " + this._y)
  }

  get x() {          // Getter
    return this._x;
  }

  set x(value) {         // Setter
    this._x = value;
  }
}