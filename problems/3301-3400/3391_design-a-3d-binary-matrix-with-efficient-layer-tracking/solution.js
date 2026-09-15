// Layer one-counts live in an array beside a max-heap of (count, x)
// pairs; every count change pushes a fresh pair, so the top always
// holds the largest live count with ties broken toward the larger
// index, and pairs left stale by later changes are discarded only when
// they surface at the top. The cell grid answers set and unset in O(1)
// and keeps repeated sets or unsets from skewing the counts. Each call
// costs O(log) heap work.
class MinHeap {
    constructor(less) {
        this.data = [];
        this.less = less;
    }

    get top() {
        return this.data[0];
    }

    push(item) {
        const data = this.data;
        data.push(item);
        let index = data.length - 1;
        while (index > 0) {
            const parent = (index - 1) >> 1;
            if (!this.less(data[index], data[parent])) break;
            [data[index], data[parent]] = [data[parent], data[index]];
            index = parent;
        }
    }

    pop() {
        const data = this.data;
        const top = data[0];
        const last = data.pop();
        if (data.length) {
            data[0] = last;
            let index = 0;
            for (;;) {
                let smallest = index;
                const left = 2 * index + 1;
                const right = left + 1;
                if (left < data.length && this.less(data[left], data[smallest])) {
                    smallest = left;
                }
                if (right < data.length && this.less(data[right], data[smallest])) {
                    smallest = right;
                }
                if (smallest === index) break;
                [data[index], data[smallest]] = [data[smallest], data[index]];
                index = smallest;
            }
        }
        return top;
    }
}

// A min-heap under this ordering is a max-heap on (count, x): the top
// is the largest count, ties broken toward the largest index.
const largestCountLargestIndex = (a, b) => a[0] > b[0] || (a[0] === b[0] && a[1] > b[1]);

class Matrix3D {
    constructor(n) {
        this.n = n;
        this.counts = new Array(n).fill(0);
        this.cells = Array.from({ length: n }, () => new Uint8Array(n * n));
        this.heap = new MinHeap(largestCountLargestIndex);
        for (let x = 0; x < n; ++x) this.heap.push([0, x]);
    }

    setCell(x, y, z) {
        const row = this.cells[x];
        if (row[y * this.n + z]) return;
        row[y * this.n + z] = 1;
        ++this.counts[x];
        this.heap.push([this.counts[x], x]);
    }

    unsetCell(x, y, z) {
        const row = this.cells[x];
        if (!row[y * this.n + z]) return;
        row[y * this.n + z] = 0;
        --this.counts[x];
        this.heap.push([this.counts[x], x]);
    }

    largestMatrix() {
        const heap = this.heap;
        // The live pair of the true maximum is always present, so the
        // stale entries above it run out.
        while (heap.top[0] !== this.counts[heap.top[1]]) heap.pop();
        return heap.top[1];
    }
}
