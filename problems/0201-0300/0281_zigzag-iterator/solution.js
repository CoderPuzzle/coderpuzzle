// Two read positions — one per vector — and a turn flag naming the vector
// that serves next. Nothing is flattened or queued at construction: the
// whole zigzag policy lives in next, which hands the turn to the other
// vector when the one whose turn it is has run dry. hasNext is a pure
// query — one live index anywhere means elements remain — so it never
// mutates state and any number of calls between nexts is harmless.
class ZigzagIterator {
    constructor(v1, v2) {
        // No copies, no queue: only how far each vector has been served
        // (i1, i2) and whose turn is next (0 for v1, 1 for v2).
        this.v1 = v1;
        this.v2 = v2;
        this.i1 = 0;
        this.i2 = 0;
        this.turn = 0;
    }

    next() {
        // A vector whose turn it is may have run dry — it was the shorter
        // one, or its last element was just served — and then the turn
        // passes to the other before anything is read.
        if (this.turn === 0 && this.i1 === this.v1.length) {
            this.turn = 1;
        }
        if (this.turn === 1 && this.i2 === this.v2.length) {
            this.turn = 0;
        }
        let value;
        if (this.turn === 0) {
            value = this.v1[this.i1];
            this.i1++;
        } else {
            value = this.v2[this.i2];
            this.i2++;
        }
        // Serve one element, then hand the turn over unconditionally: the
        // vectors alternate strictly while both still have elements.
        this.turn = 1 - this.turn;
        return value;
    }

    hasNext() {
        // Pure query: the turn flag is irrelevant to whether anything
        // remains — one live index anywhere means yes.
        return this.i1 < this.v1.length || this.i2 < this.v2.length;
    }
}
