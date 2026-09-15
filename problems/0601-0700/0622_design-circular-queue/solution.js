// A fixed buffer, a head index, and an occupied count: the count (not a
// tail index) distinguishes full from empty, so all k slots are usable;
// the tail position is always derivable as (head + count) % k.
class MyCircularQueue {
    constructor(k) {
        this.buf = new Array(k).fill(0);
        this.head = 0;
        this.count = 0;
    }

    enQueue(value) {
        if (this.count === this.buf.length) {
            return false;
        }
        // The write slot is one past the current rear, modulo the ring.
        this.buf[(this.head + this.count) % this.buf.length] = value;
        this.count++;
        return true;
    }

    deQueue() {
        if (this.count === 0) {
            return false;
        }
        // Nothing to erase: the old head slot is simply written over once
        // the ring wraps back to it.
        this.head = (this.head + 1) % this.buf.length;
        this.count--;
        return true;
    }

    Front() {
        if (this.count === 0) {
            return -1;
        }
        return this.buf[this.head];
    }

    Rear() {
        if (this.count === 0) {
            return -1;
        }
        return this.buf[(this.head + this.count - 1) % this.buf.length];
    }

    isEmpty() {
        return this.count === 0;
    }

    isFull() {
        return this.count === this.buf.length;
    }
}
