// Min-heap of numbers as a plain array: both halves use it — the smaller
// half stores negated values, so its top is the largest of the small half.
function heapPush(heap: number[], value: number): void {
    heap.push(value);
    let index = heap.length - 1;
    while (index > 0) {
        const parent = (index - 1) >> 1;
        if (heap[parent] <= heap[index]) {
            break;
        }
        [heap[parent], heap[index]] = [heap[index], heap[parent]];
        index = parent;
    }
}

function heapPop(heap: number[]): number {
    const top = heap[0];
    const last = heap.pop()!;
    if (heap.length > 0) {
        heap[0] = last;
        let index = 0;
        for (;;) {
            const left = 2 * index + 1;
            const right = left + 1;
            let smallest = index;
            if (left < heap.length && heap[left] < heap[smallest]) {
                smallest = left;
            }
            if (right < heap.length && heap[right] < heap[smallest]) {
                smallest = right;
            }
            if (smallest === index) {
                break;
            }
            [heap[smallest], heap[index]] = [heap[index], heap[smallest]];
            index = smallest;
        }
    }
    return top;
}

class MedianFinder {
    private low: number[]; // smaller half, min-heap of negated values
    private high: number[]; // larger half, min-heap

    constructor() {
        this.low = [];
        this.high = [];
    }

    // The halves stay within one element of each other, so the median is
    // either the small half's top (odd count) or the average of both tops.
    addNum(num: number): void {
        heapPush(this.low, -num);
        // Route through both heaps: the largest of the small half crosses
        // over, then rebalance if the large half grew too big.
        heapPush(this.high, -heapPop(this.low));
        if (this.high.length > this.low.length) {
            heapPush(this.low, -heapPop(this.high));
        }
    }

    findMedian(): number {
        if (this.low.length > this.high.length) {
            return -this.low[0];
        }
        return (-this.low[0] + this.high[0]) / 2;
    }
}
