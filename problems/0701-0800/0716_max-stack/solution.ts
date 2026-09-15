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
    value: number;
    seq: number;
    prev: Cell | null;
    next: Cell | null = null;
    dead = false;

    constructor(value: number, seq: number, prev: Cell | null) {
        this.value = value;
        this.seq = seq;
        this.prev = prev;
    }
}

// CellHeap orders by value, then by sequence number, so the root names the
// topmost duplicate maximum.
class CellHeap {
    private items: Cell[] = [];

    root(): Cell {
        return this.items[0];
    }

    push(cell: Cell): void {
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

    popRoot(): Cell {
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

    private precedes(a: Cell, b: Cell): boolean {
        if (a.value !== b.value) {
            return a.value > b.value;
        }
        return a.seq > b.seq;
    }
}

class MaxStack {
    private tail: Cell | null = null;
    private heap = new CellHeap();
    private seq = 0;

    constructor() {}

    push(x: number): void {
        const item = new Cell(x, ++this.seq, this.tail);
        if (this.tail !== null) {
            this.tail.next = item;
        }
        this.tail = item;
        this.heap.push(item);
    }

    pop(): number {
        const item = this.tail;
        this.unlink(item);
        return item.value;
    }

    top(): number {
        return this.tail.value;
    }

    peekMax(): number {
        while (this.heap.root().dead) {
            this.heap.popRoot();
        }
        return this.heap.root().value;
    }

    popMax(): number {
        for (;;) {
            const item = this.heap.popRoot();
            if (!item.dead) {
                this.unlink(item);
                return item.value;
            }
        }
    }

    private unlink(item: Cell): void {
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
