// 2d point
export default class Point {
    // coordinate
    x: number;
    y: number;
    constructor (x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }
    clone(): Point{
      return new Point(this.x, this.y);
    }
    moveBy (dx:number, dy:number):void {
        this.x += dx;
        this.y += dy;
    }
    moveTo (x:number, y:number):void {
        this.x = x;
        this.y = y;
    }
    equals(point: Point): boolean {
        return this.x === point.x && this.y === point.y;
    }
    toString(): string{
        return "(" + this.x + ", " + this.y + ")";
    }
}
