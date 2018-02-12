import Point from '../../common/Point';
import Rect from '../../common/Rect';

export default class Widget {
    protected parent: Widget | null;
    protected canvas: HTMLCanvasElement;
    protected children: Array<Widget>;
    protected offsetRect: Rect;

    constructor(parent: Widget | null, canvas: HTMLCanvasElement | null) {
        this.parent = parent || null;
        if (canvas == null) {
            if (this.parent == null) throw Error("Widget must have canvas!");
            else this.canvas = this.parent.canvas;
        } else {
            this.canvas = canvas;
        }
        this.children = new Array();
        this.offsetRect = new Rect(0, 0, 0, 0);
        if (this.parent != null) this.parent.addChild(this);
        this.eachChild(el=> el.onPaint());
    }
    //
    addChild(child: Widget): void {
        if (!this.hasChild(child)) {
            this.children.push(child);
        }
        child.parent = this;
    }
    removeChild(child: Widget): Widget {
        let i = this.children.indexOf(child);
        return this.children.splice(i, 1)[0];
    }
    hasChild(child: Widget): boolean {
        return this.children.indexOf(child) >= 0;
    }
    //
    protected eachChild(callback: (el: Widget) => void, bottomUp = true): void {
        if (!bottomUp) {
            for (let i = this.children.length - 1; i >= 0; i--) {
                if (callback(this.children[i])) break;
            }
        } else {
            for (let i = 0; i < this.children.length; i++) {
                if (callback(this.children[i])) break;
            }
        }
    }
    // move to front
    public moveChildToTop(child: Widget): void {
        child = this.removeChild(child);
        if (child != null) this.children.push(child);
    }

    // Mouse event system has only one entry that is browser event being
    // passed in at the bottom Widget named View.
    // So, they are declared as protected and can not be called by user directly.
    protected onMouseDown(point: Point): void {
        this.eachChild(function(el) {
            if (el.hitTest(point)) {
                el.onMouseDown(point);
                return true;
            } else {
                return false;
            }
        }, false);
    }
    protected onMouseUp(point: Point): void {
        this.eachChild(function(el) {
            if (el.hitTest(point)) {
                el.onMouseUp(point);
                return true;
            } else {
                return false;
            }
        }, false);
    }
    protected onMouseMove(point) {
        this.eachChild(function(el) {
            return el.onMouseMove(point);
        }, false);
    }
    // 
    /* virtual */ protected onPaint(): void { };
    // bottom-up invoke onPaint
    public redraw(): void {
        this.onPaint();
        this.eachChild(function(el) {
            el.redraw();
        });
    }
    // redraw alias
    public show(): void {
        this.redraw();
    }
    //
    protected hitTest(point: Point): boolean {
        return this.offsetRect.isPointIn(point);
    }
    //
    protected onDestroy(): void {
        this.eachChild(function(el) {
            el.onDestroy();
        });
        this.children = [];
        if (this.parent != null) this.parent.removeChild(this);
    }
}
