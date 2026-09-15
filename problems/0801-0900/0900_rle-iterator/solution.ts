// A cursor over the runs of the encoding: the iterator never decodes
// anything — next(n) walks forward while the current run's remaining count
// is smaller than n, spending each exhausted run's remainder on n as it
// passes, then decrements the first run rich enough to supply the n-th
// element and returns that run's value.
class RLEIterator {
    private a: number[];
    private i = 0;

    constructor(encoding: number[]) {
        this.a = encoding;
    }

    next(n: number): number {
        // Walk forward while the current run cannot supply the n-th element;
        // a run of length zero never stops this walk (0 is smaller than any n).
        while (this.i < this.a.length && this.a[this.i] < n) {
            n -= this.a[this.i];
            this.i += 2;
        }
        if (this.i >= this.a.length) {
            // The walk ran off the end: the n-th element does not exist, and
            // every remaining run was consumed along the way.
            return -1;
        }
        this.a[this.i] -= n;
        return this.a[this.i + 1];
    }
}
