// A growable ring buffer with a head index and a count: both ends move
// modulo the ring, and a full buffer doubles, so every operation is O(1)
// amortized. Each half of the queue is one of these.
class Deque {
    constructor() {
        this.buf = new Array(4);
        this.head = 0;
        this.count = 0;
    }

    get size() {
        return this.count;
    }

    grow() {
        if (this.count < this.buf.length) {
            return;
        }
        const next = new Array(2 * this.buf.length);
        for (let i = 0; i < this.count; i++) {
            next[i] = this.buf[(this.head + i) % this.buf.length];
        }
        this.buf = next;
        this.head = 0;
    }

    pushFront(val) {
        this.grow();
        this.head = (this.head - 1 + this.buf.length) % this.buf.length;
        this.buf[this.head] = val;
        this.count++;
    }

    pushBack(val) {
        this.grow();
        this.buf[(this.head + this.count) % this.buf.length] = val;
        this.count++;
    }

    popFront() {
        const val = this.buf[this.head];
        this.head = (this.head + 1) % this.buf.length;
        this.count--;
        return val;
    }

    popBack() {
        this.count--;
        return this.buf[(this.head + this.count) % this.buf.length];
    }
}

// Two deques split at the middle: front holds the first ceil(n/2)
// elements, back the rest, so the middle always sits at an end of each
// deque — balance restores the split after every mutating call.
class FrontMiddleBackQueue {
    constructor() {
        this.front = new Deque();
        this.back = new Deque();
    }

    pushFront(val) {
        this.front.pushFront(val);
        this.balance();
    }

    pushMiddle(val) {
        // The new element must land one slot before the current back of
        // front (the frontmost middle of the result), so when front is
        // the bigger half, its last element moves to back first — the
        // pushBack then writes exactly the middle slot.
        if (this.front.size > this.back.size) {
            this.back.pushFront(this.front.popBack());
        }
        this.front.pushBack(val);
    }

    pushBack(val) {
        this.back.pushBack(val);
        this.balance();
    }

    popFront() {
        if (this.front.size === 0) {
            return -1;
        }
        const val = this.front.popFront();
        this.balance();
        return val;
    }

    popMiddle() {
        // ceil(n/2) elements in front means the frontmost middle — the
        // back of front — at every length, odd or even.
        if (this.front.size === 0) {
            return -1;
        }
        const val = this.front.popBack();
        this.balance();
        return val;
    }

    popBack() {
        if (this.back.size > 0) {
            const val = this.back.popBack();
            this.balance();
            return val;
        }
        if (this.front.size === 0) {
            return -1;
        }
        const val = this.front.popBack();
        this.balance();
        return val;
    }

    balance() {
        if (this.front.size > this.back.size + 1) {
            this.back.pushFront(this.front.popBack());
        } else if (this.front.size < this.back.size) {
            this.front.pushBack(this.back.popFront());
        }
    }
}
