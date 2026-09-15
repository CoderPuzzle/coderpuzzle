/**
 * @param {number} n
 * @return {number}
 */
var nthUglyNumber = function (n) {
    // Frontier of the generation process: a min-heap seeded with 1, so the
    // smallest not-yet-emitted ugly number is always at its top.
    const heap = new MinHeap();
    heap.push(1);
    // The heap is a frontier, not a set: pushing every successor would
    // enqueue duplicates (6 = 2·3 = 3·2), so seen gates each push.
    const seen = new Set([1]);
    for (let i = 1; i < n; i++) {
        const value = heap.pop();
        for (const factor of [2, 3, 5]) {
            const multiple = value * factor;
            if (!seen.has(multiple)) {
                seen.add(multiple);
                heap.push(multiple);
            }
        }
    }
    // After n-1 pops the heap top is the n-th ugly number in order.
    return heap.top();
};

// Array-backed binary min-heap (sift-up on push, sift-down on pop).
class MinHeap {
    constructor() {
        this.a = [];
    }
    top() {
        return this.a[0];
    }
    push(x) {
        const a = this.a;
        a.push(x);
        // Sift the new leaf up past larger parents.
        let i = a.length - 1;
        while (i > 0) {
            const parent = (i - 1) >> 1;
            if (a[parent] <= a[i]) break;
            [a[parent], a[i]] = [a[i], a[parent]];
            i = parent;
        }
    }
    pop() {
        const a = this.a;
        const top = a[0];
        const last = a.pop();
        if (a.length > 0) {
            a[0] = last;
            // Sift the promoted root down past smaller children.
            let i = 0;
            while (true) {
                const l = 2 * i + 1,
                    r = l + 1;
                let m = i;
                if (l < a.length && a[l] < a[m]) m = l;
                if (r < a.length && a[r] < a[m]) m = r;
                if (m === i) break;
                [a[m], a[i]] = [a[i], a[m]];
                i = m;
            }
        }
        return top;
    }
}
