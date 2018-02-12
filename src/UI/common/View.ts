import Point from '../../common/Point';
import Widget from './Widget';

declare var document: Document;

export default class View extends Widget {
    constructor(canvas: HTMLCanvasElement) {
        super(null, canvas);
        document.addEventListener("mousedown",  this.globalOnMouseDown );
        document.addEventListener("mousemove",  this.globalOnMouseMove );
        document.addEventListener("mouseup",  this.globalOnMouseUp );
    }
    // mouse coordinate on canvas
    coordinate(e: MouseEvent, dom: HTMLCanvasElement): Point {
        let x = e.pageX - dom.offsetLeft, y = e.pageY - dom.offsetTop;
        return new Point(x, y);
    }
    // trigger mouse event on Widgets, top-down
    // pass browser event into Widgets system
    private globalOnMouseDown = (e: MouseEvent) => {
        super.onMouseDown(this.coordinate(e, this.canvas));
    }
    private globalOnMouseMove = (e: MouseEvent) => {
        super.onMouseMove(this.coordinate(e, this.canvas));
    }
    private globalOnMouseUp = (e: MouseEvent) => {
        super.onMouseUp(this.coordinate(e, this.canvas));
    }
}
