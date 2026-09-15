// A fixed buffer, a head index, and an occupied count: the count (not a
// tail index) distinguishes full from empty, so all k slots are usable;
// both ends are derivable, the rear sits at (head + count - 1) % k and
// the slot a front insert claims at (head - 1 + k) % k.
class MyCircularDeque {
    constructor(k) {
        this.buf = new Array(k).fill(0);
        this.head = 0;
        this.count = 0;
    }

    insertFront(value) {
        if (this.count === this.buf.length) {
            return false;
        }
        // Step head back one slot, modulo the ring, and write there.
        this.head = (this.head - 1 + this.buf.length) % this.buf.length;
        this.buf[this.head] = value;
        this.count++;
        return true;
    }

    insertLast(value) {
        if (this.count === this.buf.length) {
            return false;
        }
        // The write slot is one past the current rear, modulo the ring.
        this.buf[(this.head + this.count) % this.buf.length] = value;
        this.count++;
        return true;
    }

    deleteFront() {
        if (this.count === 0) {
            return false;
        }
        // Nothing to erase: the old head slot is simply written over once
        // the ring wraps back to it.
        this.head = (this.head + 1) % this.buf.length;
        this.count--;
        return true;
    }

    deleteLast() {
        if (this.count === 0) {
            return false;
        }
        // The rear slot is derivable, so retiring it is just a count.
        this.count--;
        return true;
    }

    getFront() {
        if (this.count === 0) {
            return -1;
        }
        return this.buf[this.head];
    }

    getRear() {
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
