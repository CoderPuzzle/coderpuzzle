// A fixed ring buffer plus a running sum: next writes the incoming value
// over the window's oldest slot, folds the evicted value out of the sum
// and the new one in, and returns sum / count — the sum stays an exact
// integer and only the final step is a division.
class MovingAverage {
    private window: number[];
    private total = 0;
    private head = 0;
    private count = 0;

    constructor(size: number) {
        this.window = new Array(size).fill(0);
    }

    next(val: number): number {
        // The head slot holds the oldest value once the window is full;
        // before that the window is still filling and nothing evicts.
        if (this.count < this.window.length) {
            this.count++;
        } else {
            this.total -= this.window[this.head];
        }
        this.window[this.head] = val;
        this.total += val;
        this.head = (this.head + 1) % this.window.length;
        return this.total / this.count;
    }
}
