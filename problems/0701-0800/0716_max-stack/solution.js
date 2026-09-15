// A doubly-linked list of cells keeps stack order -- the tail is the top,
// so push, pop, and top touch only the tail cell -- while a max-heap of
// cells keyed by (value, sequence number) finds the maximum. Sequence
// numbers rise with every push and the heap prefers the larger one among
// equal values, so its root is the topmost duplicate maximum -- exactly the
// element popMax must remove. A removal elsewhere in the list leaves the
// cell's heap entry stale, so each cell carries a dead flag and
// peekMax/popMax discard roots that name a dead cell: every stale entry is
// skipped at most once.
class Cell {
    constructor(value, seq, prev) {
        this.value = value;
        this.seq = seq;
        this.prev = prev;
        this.next = null;
        this.dead = false;
    }
}

// CellHeap orders by value, then by sequence number, so the root names the
// topmost duplicate maximum.
class CellHeap {
    constructor() {
        this.items = [];
    }

    root() {
        return this.items[0];
    }

    push(cell) {
        const items = this.items;
        items.push(cell);
        let child = items.length - 1;
        while (child > 0) {
            const parent = (child - 1) >> 1;
            if (this.precedes(items[child], items[parent])) {
                [items[child], items[parent]] = [items[parent], items[child]];
                child = parent;
            } else {
                break;
            }
        }
    }

    popRoot() {
        const items = this.items;
        const top = items[0];
        const last = items.pop();
        if (items.length > 0) {
            items[0] = last;
            let parent = 0;
            for (;;) {
                const left = 2 * parent + 1;
                const right = left + 1;
                let best = parent;
                if (left < items.length && this.precedes(items[left], items[best])) {
                    best = left;
                }
                if (right < items.length && this.precedes(items[right], items[best])) {
                    best = right;
                }
                if (best === parent) {
                    break;
                }
                [items[parent], items[best]] = [items[best], items[parent]];
                parent = best;
            }
        }
        return top;
    }

    precedes(a, b) {
        if (a.value !== b.value) {
            return a.value > b.value;
        }
        return a.seq > b.seq;
    }
}

class MaxStack {
    constructor() {
        this.tail = null;
        this.heap = new CellHeap();
        this.seq = 0;
    }

    push(x) {
        const item = new Cell(x, ++this.seq, this.tail);
        if (this.tail !== null) {
            this.tail.next = item;
        }
        this.tail = item;
        this.heap.push(item);
    }

    pop() {
        const item = this.tail;
        this.unlink(item);
        return item.value;
    }

    top() {
        return this.tail.value;
    }

    peekMax() {
        while (this.heap.root().dead) {
            this.heap.popRoot();
        }
        return this.heap.root().value;
    }

    popMax() {
        for (;;) {
            const item = this.heap.popRoot();
            if (!item.dead) {
                this.unlink(item);
                return item.value;
            }
        }
    }

    unlink(item) {
        if (item.prev !== null) {
            item.prev.next = item.next;
        }
        if (item.next !== null) {
            item.next.prev = item.prev;
        }
        if (this.tail === item) {
            this.tail = item.prev;
        }
        item.dead = true;
    }
}
