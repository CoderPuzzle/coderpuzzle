// Two coordinates — a row pointer and a column pointer — advanced lazily
// over the vector exactly as it stands: the pair is only moved onto a live
// element when a call needs one, so construction does no work beyond
// remembering the input. hasNext owns the skipping: it walks row past every
// row col has exhausted (empty from the start, or fully served), which lets
// next read vec[row][col] without any special cases.
class Vector2D {
    private vec: number[][];
    private row: number;
    private col: number;

    constructor(vec: number[][]) {
        // No flattened copy here — that laziness is the problem. An empty
        // (or exhausted) row is stepped over only when a call forces it.
        this.vec = vec;
        this.row = 0;
        this.col = 0;
    }

    next(): number {
        // Establish the invariant before reading: after this call the
        // coordinates are guaranteed to sit on a live element.
        this.hasNext();
        const value = this.vec[this.row][this.col];
        // Step within the row; once it runs dry, the next hasNext() moves
        // on to the next row instead.
        this.col++;
        return value;
    }

    hasNext(): boolean {
        // The invariant repair: skip rows already drained, zeroing the
        // column pointer as each new row is entered.
        while (this.row < this.vec.length && this.col === this.vec[this.row].length) {
            this.row++;
            this.col = 0;
        }
        return this.row < this.vec.length;
    }
}
