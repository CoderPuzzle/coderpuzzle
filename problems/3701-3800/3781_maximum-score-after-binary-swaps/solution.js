/**
 * @param {number[]} nums
 * @param {string} s
 * @return {number}
 */
var maximumScore = function (nums, s) {
    // Sweep left to right pushing every value as a candidate final slot;
    // the '1' met at index i claims the best slot offered so far. The
    // score peaks at 10^5 * 10^9 = 10^14, far below 2^53 - 1, so plain
    // numbers add exactly.
    const heap = new MaxHeap();
    let ans = 0;
    for (let i = 0; i < nums.length; i++) {
        heap.push(nums[i]);
        if (s[i] === "1") {
            ans += heap.pop();
        }
    }
    return ans;
};

class MaxHeap {
    constructor() {
        this.a = [];
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
