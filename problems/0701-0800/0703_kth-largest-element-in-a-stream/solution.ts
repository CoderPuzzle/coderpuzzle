// Min-heap holding exactly the k largest scores seen so far: the heap
// minimum is the kth largest element of the whole pool.
class KthLargest {
    private k: number;
    private heap: number[];

    constructor(k: number, nums: number[]) {
        this.k = k;
        this.heap = [];
        for (const value of nums) {
            this.push(value);
        }
        while (this.heap.length > k) {
            this.pop();
        }
    }

    add(val: number): number {
        // Push first, then evict: a value smaller than the root pops right
        // back out, so no comparison branch is needed.
        this.push(val);
        if (this.heap.length > this.k) {
            this.pop();
        }
        return this.heap[0];
    }

    private push(value: number): void {
        this.heap.push(value);
        let index = this.heap.length - 1;
        while (index > 0) {
            const parent = (index - 1) >> 1;
            if (this.heap[index] >= this.heap[parent]) {
                break;
            }
            [this.heap[index], this.heap[parent]] = [this.heap[parent], this.heap[index]];
            index = parent;
        }
    }

    private pop(): void {
        const last = this.heap.length - 1;
        this.heap[0] = this.heap[last];
        this.heap.length = last;
        let index = 0;
        for (;;) {
            const left = 2 * index + 1;
            if (left >= last) {
                break;
            }
            let smallest = left;
            const right = left + 1;
            if (right < last && this.heap[right] < this.heap[left]) {
                smallest = right;
            }
            if (this.heap[smallest] >= this.heap[index]) {
                break;
            }
            [this.heap[index], this.heap[smallest]] = [this.heap[smallest], this.heap[index]];
            index = smallest;
        }
    }
}
