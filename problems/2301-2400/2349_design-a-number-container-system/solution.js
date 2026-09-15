class NumberContainers {
    constructor() {
        // index -> number currently filling it
        this.slots = new Map();
        // number -> every index ever filled with it; stale entries are
        // discarded only when find() reaches them
        this.candidates = new Map();
    }

    change(index, number) {
        if (this.slots.get(index) === number) {
            return;
        }
        this.slots.set(index, number);
        let heap = this.candidates.get(number);
        if (heap === undefined) {
            heap = [];
            this.candidates.set(number, heap);
        }
        // sift the new index up to restore the min-heap order
        heap.push(index);
        let child = heap.length - 1;
        while (child > 0) {
            const parent = (child - 1) >> 1;
            if (heap[parent] <= heap[child]) {
                break;
            }
            [heap[parent], heap[child]] = [heap[child], heap[parent]];
            child = parent;
        }
    }

    find(number) {
        const heap = this.candidates.get(number);
        if (heap === undefined) {
            return -1;
        }
        // the top is the answer unless that index has since been refilled
        while (heap.length > 0 && this.slots.get(heap[0]) !== number) {
            this.popTop(heap);
        }
        return heap.length > 0 ? heap[0] : -1;
    }

    popTop(heap) {
        const top = heap[0];
        const last = heap.pop();
        if (heap.length > 0) {
            heap[0] = last;
            let parent = 0;
            for (;;) {
                const left = 2 * parent + 1;
                const right = left + 1;
                let smallest = parent;
                if (left < heap.length && heap[left] < heap[smallest]) {
                    smallest = left;
                }
                if (right < heap.length && heap[right] < heap[smallest]) {
                    smallest = right;
                }
                if (smallest === parent) {
                    break;
                }
                [heap[parent], heap[smallest]] = [heap[smallest], heap[parent]];
                parent = smallest;
            }
        }
        return top;
    }
}
