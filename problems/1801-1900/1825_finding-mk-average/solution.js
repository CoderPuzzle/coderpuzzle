// Two Fenwick trees indexed by value — one of counts, one of sums — hold
// the current m-wide window, alongside the window itself in arrival
// order. addElement inserts the new value and, once the window is full,
// removes the value that just slid out; both are O(log V). A query
// descends the count tree twice to read off the combined value of the j
// smallest elements for j = k and j = m - k, so the trimmed middle sum
// is S(m-k) - S(k) and the answer is that sum floor-divided by m - 2k,
// or -1 while the stream is still shorter than m. Sums reach 10^5 *
// 10^5 = 10^10, far below 2^53, so Number arithmetic is exact.
const LIMIT = 100000;

class MKAverage {
    constructor(m, k) {
        this.m = m;
        this.k = k;
        this.counts = new Array(LIMIT + 1).fill(0);
        this.sums = new Array(LIMIT + 1).fill(0);
        this.window = [];
        this.head = 0;
        this.size = 0;
    }

    _update(tree, value, delta) {
        for (; value <= LIMIT; value += value & -value) tree[value] += delta;
    }

    addElement(num) {
        this.window.push(num);
        this._update(this.counts, num, 1);
        this._update(this.sums, num, num);
        this.size++;
        if (this.size > this.m) {
            // The window holds exactly the last m elements: evict the oldest.
            const old = this.window[this.head++];
            this._update(this.counts, old, -1);
            this._update(this.sums, old, -old);
            this.size--;
        }
    }

    _smallestSum(j) {
        // Descend the count tree to the value holding the j-th smallest
        // element, accumulating the sums of fully covered buckets.
        let index = 0;
        let taken = 0;
        let total = 0;
        for (let step = 1 << 16; step; step >>= 1) {
            const next = index + step;
            if (next <= LIMIT && taken + this.counts[next] < j) {
                index = next;
                taken += this.counts[next];
                total += this.sums[next];
            }
        }
        return total + (index + 1) * (j - taken);
    }

    calculateMKAverage() {
        if (this.size < this.m) return -1;
        const middle = this._smallestSum(this.m - this.k) - this._smallestSum(this.k);
        // Stripping the remainder before dividing stays exact integer work.
        const span = this.m - 2 * this.k;
        return (middle - (middle % span)) / span;
    }
}
