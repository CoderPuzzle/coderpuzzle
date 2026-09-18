class PriceHeap {
    constructor(before) {
        this.items = [];
        this.before = before; // strict "a strictly before b" comparator
    }

    peek() {
        return this.items[0];
    }

    push(item) {
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

    pop() {
        const items = this.items;
        const top = items[0];
        const last = items.pop();
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
    constructor() {
        // timestamp -> currently valid price; a correction is an overwrite.
        this.priceAt = new Map();
        // Twin lazy heaps over [price, timestamp]: entries are pushed on
        // record and never removed; stale ones are discarded only at the
        // top.
        this.maxHeap = new PriceHeap((a, b) => a[0] > b[0]);
        this.minHeap = new PriceHeap((a, b) => a[0] < b[0]);
        // The greatest moment ever recorded.
        this.latestTimestamp = 0;
    }

    update(timestamp, price) {
        this.priceAt.set(timestamp, price);
        if (timestamp > this.latestTimestamp) {
            this.latestTimestamp = timestamp;
        }
        this.maxHeap.push([price, timestamp]);
        this.minHeap.push([price, timestamp]);
    }

    current() {
        return this.priceAt.get(this.latestTimestamp);
    }

    maximum() {
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

    minimum() {
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
