export default class Layout {
    public padding: number;
    public cell: number;
    public chessRadius: number;
    public fontSize: number;
    public width: number;
    public height: number;
    public offsetWidth: number;
    public offsetHeight: number;
    constructor(
        padding: number,
        cell: number,
        chessRadius: number,
        fontSize: number,
        width: number,
        height: number,
        offsetWidth: number,
        offsetHeight: number
    ) {
        this.padding = padding;
        this.cell = cell;
        this.chessRadius = chessRadius;
        this.fontSize = fontSize;
        this.width = width;
        this.height = height;
        this.offsetWidth = offsetWidth;
        this.offsetHeight = offsetHeight;
    }
}