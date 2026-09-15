// Every statistic lives in its own incrementally maintained structure: a
// queue holds arrival order, a running sum serves the mean, two heaps
// split the live values into a lower and an upper half so the median is
// always at a top, and a (count, value) heap answers the mode. Removals
// are FIFO and arbitrary for a heap, so an erased value is only marked in
// a delayed counter and discarded when it surfaces at a top; rebalancing
// counts only live entries, and the mode heap's stale entries are skipped
// lazily the same way. Each call costs O(log n) amortized. The running
// sum reaches 10^5 * 10^9 = 10^14, below 2^53, so plain numbers hold it
// exactly.
class MinHeap<T> {
    private data: T[] = [];
    constructor(private less: (a: T, b: T) => boolean) {}

    get size(): number {
        return this.data.length;
    }

    get top(): T {
        return this.data[0];
    }

    push(item: T): void {
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

    pop(): T {
        const data = this.data;
        const top = data[0];
        const last = data.pop()!;
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

const byCountThenValue = (a: [number, number], b: [number, number]): boolean =>
    a[0] < b[0] || (a[0] === b[0] && a[1] < b[1]);

class StatisticsTracker {
    private queue: number[] = [];
    private head = 0;
    private total = 0;
    // small holds negated values, so a min-heap on the negation is the
    // max-heap of the lower half; large is a plain min-heap.
    private small = new MinHeap<number>((a, b) => a < b);
    private large = new MinHeap<number>((a, b) => a < b);
    private smallSize = 0; // live sizes, ghosts excluded
    private largeSize = 0;
    private delayed = new Map<number, number>(); // removals not yet applied
    private counts = new Map<number, number>();
    private modeHeap = new MinHeap<[number, number]>(byCountThenValue);

    // Discard ghosts queued for deletion while they sit at the top.
    private pruneSmall(): void {
        while (this.small.size) {
            const value = -this.small.top;
            const pending = this.delayed.get(value) || 0;
            if (pending > 0) {
                this.delayed.set(value, pending - 1);
                this.small.pop();
            } else break;
        }
    }

    private pruneLarge(): void {
        while (this.large.size) {
            const value = this.large.top;
            const pending = this.delayed.get(value) || 0;
            if (pending > 0) {
                this.delayed.set(value, pending - 1);
                this.large.pop();
            } else break;
        }
    }

    // Keep ceil(n/2) live values in small; the median read sits at a top
    // after this. Moves only touch pruned, live tops.
    private rebalance(): void {
        if (this.smallSize > this.largeSize + 1) {
            this.large.push(-this.small.pop());
            this.smallSize--;
            this.largeSize++;
            this.pruneSmall();
        } else if (this.smallSize < this.largeSize) {
            this.small.push(-this.large.pop());
            this.smallSize++;
            this.largeSize--;
            this.pruneLarge();
        }
    }

    addNumber(number: number): void {
        this.queue.push(number);
        this.total += number;
        this.counts.set(number, (this.counts.get(number) || 0) + 1);
        // An entry exists for every count level each value reaches, so
        // the current count of any live value is always in the heap.
        this.modeHeap.push([-this.counts.get(number)!, number]);
        if (!this.small.size || number <= -this.small.top) {
            this.small.push(-number);
            this.smallSize++;
        } else {
            this.large.push(number);
            this.largeSize++;
        }
        this.rebalance();
    }

    removeFirstAddedNumber(): void {
        const number = this.queue[this.head++];
        this.total -= number;
        this.counts.set(number, this.counts.get(number)! - 1);
        // The ghost is charged to the half its value belongs to; when a
        // matching copy surfaces at that top it is discarded, which keeps
        // fungible duplicates consistent.
        this.delayed.set(number, (this.delayed.get(number) || 0) + 1);
        if (number <= -this.small.top) {
            this.smallSize--;
            if (number === -this.small.top) this.pruneSmall();
        } else {
            this.largeSize--;
            if (number === this.large.top) this.pruneLarge();
        }
        this.rebalance();
    }

    getMean(): number {
        return Math.floor(this.total / (this.queue.length - this.head));
    }

    getMedian(): number {
        this.pruneSmall();
        this.pruneLarge();
        if (this.smallSize > this.largeSize) return -this.small.top;
        // Even count: the larger of the two middles is the upper half's
        // minimum.
        return this.large.top;
    }

    getMode(): number {
        while (this.modeHeap.size) {
            const [count, value] = this.modeHeap.top;
            if (this.counts.get(value) === -count) return value;
            this.modeHeap.pop();
        }
        throw new Error("empty tracker");
    }
}
