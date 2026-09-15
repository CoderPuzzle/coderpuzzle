/**
 * @param {number[]} blocks
 * @param {number} split
 * @return {number}
 */
var minBuildTime = function (blocks, split) {
    const heap = new MinHeap();
    for (const block of blocks) {
        heap.push(block);
    }
    while (heap.size > 1) {
        // Mount the two cheapest subtrees under one new split; heavier
        // work stays shallower, where the fan-out runs in parallel.
        const first = heap.pop();
        const second = heap.pop();
        heap.push(Math.max(first, second) + split);
    }
    return heap.size === 1 ? heap.pop() : 0;
};

class MinHeap {
    constructor() {
        this.values = [];
    }

    get size() {
        return this.values.length;
    }

    push(value) {
        this.values.push(value);
        let i = this.values.length - 1;
        while (i > 0) {
            const parent = (i - 1) >> 1;
            if (this.values[parent] <= this.values[i]) break;
            [this.values[parent], this.values[i]] = [this.values[i], this.values[parent]];
            i = parent;
        }
    }

    pop() {
        const top = this.values[0];
        const last = this.values.pop();
        if (this.values.length > 0) {
            this.values[0] = last;
            let i = 0;
            for (;;) {
                const left = 2 * i + 1;
                const right = 2 * i + 2;
                let smallest = i;
                if (left < this.values.length && this.values[left] < this.values[smallest]) smallest = left;
                if (right < this.values.length && this.values[right] < this.values[smallest]) smallest = right;
                if (smallest === i) break;
                [this.values[smallest], this.values[i]] = [this.values[i], this.values[smallest]];
                i = smallest;
            }
        }
        return top;
    }
}
