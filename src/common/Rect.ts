import Point from './Point';

// Axis-Parallel Rectangle
export default class Rect {
    // bound
    left: number;
    top: number;
    right: number;
    bottom: number;
    constructor (left=0, top=0, right=0, bottom=0) {
        this.left = left;
        this.top = top
        this.right = right;
        this.bottom = bottom
    }
    get width (): number {
        return this.right - this.left;
    }
    get height(): number {
        return this.bottom - this.top;
    }
    moveBy (dx:number, dy:number): void {
        this.left += dx;
        this.right += dx;
        this.top += dy;
        this.bottom += dy;
    }
    moveTo(x: number, y: number): void {
        this.right = x + this.width;
        this.bottom = y + this.height;
        this.left = x;
        this.top = y;
    }
    isPointIn(point: Point): boolean {
        return this.left <= point.x && this.right > point.x && this.top <= point.y && this.bottom > point.y;
    }
    isOverlap(rc: Rect): boolean {
        return !(this.left >= rc.right || this.right <= rc.left || this.top >= rc.bottom || this.bottom <= rc.top);
    }
    equals(rc: Rect): boolean {
        return this.left == rc.left && this.top == rc.top && this.right == rc.right && this.bottom == rc.bottom;
    }
    toString ():string {
        return "[" + this.left + ", " + this.top + ", " + this.right + ", " + this.bottom + "]";
    }
}
