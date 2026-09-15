/**
 * @param {number[][]} queries
 * @param {number} k
 * @return {number[]}
 */
var resultsArray = function (queries, k) {
    // Bounded max-heap of the k smallest distances seen so far. Distances
    // peak at |x| + |y| <= 2 * 10^9, far below Number.MAX_SAFE_INTEGER
    // (2^53 - 1), so plain numbers compare exactly.
    const heap = new MaxHeap();
    const result = [];
    for (const [x, y] of queries) {
        const d = Math.abs(x) + Math.abs(y);
        if (heap.size() < k) {
            heap.push(d);
        } else if (heap.peek() > d) {
            heap.pop();
            heap.push(d);
        }
        result.push(heap.size() === k ? heap.peek() : -1);
    }
    return result;
};

class MaxHeap {
    constructor() {
        this.a = [];
    }
    size() {
        return this.a.length;
    }
    peek() {
        return this.a[0];
    }
    push(v) {
        this.a.push(v);
        let i = this.a.length - 1;
        while (i > 0) {
            const p = (i - 1) >> 1;
            if (this.a[p] >= this.a[i]) break;
            [this.a[p], this.a[i]] = [this.a[i], this.a[p]];
            i = p;
        }
    }
    pop() {
        const top = this.a[0];
        const last = this.a.pop();
        if (this.a.length) {
            this.a[0] = last;
            this.siftDown(0);
        }
        return top;
    }
    siftDown(i) {
        const n = this.a.length;
        while (true) {
            let l = 2 * i + 1,
                r = l + 1,
                m = i;
            if (l < n && this.a[l] > this.a[m]) m = l;
            if (r < n && this.a[r] > this.a[m]) m = r;
            if (m === i) break;
            [this.a[m], this.a[i]] = [this.a[i], this.a[m]];
            i = m;
        }
    }
}
