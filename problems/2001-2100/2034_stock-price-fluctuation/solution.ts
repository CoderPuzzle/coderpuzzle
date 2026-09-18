class PriceHeap {
    private items: number[][] = [];
    constructor(private before: (a: number[], b: number[]) => boolean) {} // strict "a before b"

    peek(): number[] {
        return this.items[0];
    }

    push(item: number[]): void {
        const items = this.items;
        items.push(item);
        for (let child = items.length - 1; child > 0;) {
            const parent = (child - 1) >> 1;
            if (!this.before(items[child], items[parent])) {
                break;
            }
            [items[parent], items[child]] = [items[child], items[parent]];
            child = parent;
        }
    }

    pop(): number[] {
        const items = this.items;
        const top = items[0];
        const last = items.pop() as number[];
        if (items.length > 0) {
            items[0] = last;
            for (let parent = 0; ;) {
                const left = parent * 2 + 1;
                const right = left + 1;
                let first = parent;
                if (left < items.length && this.before(items[left], items[first])) {
                    first = left;
                }
                if (right < items.length && this.before(items[right], items[first])) {
                    first = right;
                }
                if (first === parent) {
                    break;
                }
                [items[parent], items[first]] = [items[first], items[parent]];
                parent = first;
            }
        }
        return top;
    }
}

class StockPrice {
    // timestamp -> currently valid price; a correction is an overwrite.
    private priceAt = new Map<number, number>();
    // Twin lazy heaps over [price, timestamp]: entries are pushed on
    // record and never removed; stale ones are discarded only at the top.
    private maxHeap: PriceHeap = new PriceHeap((a, b) => a[0] > b[0]);
    private minHeap: PriceHeap = new PriceHeap((a, b) => a[0] < b[0]);
    // The greatest moment ever recorded.
    private latestTimestamp = 0;

    constructor() {}

    update(timestamp: number, price: number): void {
        this.priceAt.set(timestamp, price);
        if (timestamp > this.latestTimestamp) {
            this.latestTimestamp = timestamp;
        }
        this.maxHeap.push([price, timestamp]);
        this.minHeap.push([price, timestamp]);
    }

    current(): number {
        return this.priceAt.get(this.latestTimestamp) as number;
    }

    maximum(): number {
        // An entry is garbage exactly when its timestamp now maps to a
        // different price; pop those, then the top is the true highest.
        for (;;) {
            const top = this.maxHeap.peek();
            if (this.priceAt.get(top[1]) === top[0]) {
                return top[0];
            }
            this.maxHeap.pop();
        }
    }

    minimum(): number {
        // Same lazy cleanup on the min side.
        for (;;) {
            const top = this.minHeap.peek();
            if (this.priceAt.get(top[1]) === top[0]) {
                return top[0];
            }
            this.minHeap.pop();
        }
    }
}
