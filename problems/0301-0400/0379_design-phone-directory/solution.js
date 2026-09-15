// A used set, a fresh-number counter, and a released min-heap: get()
// pops the smallest released number before minting a fresh one, so the
// smallest available number always comes out; release() is a no-op on an
// available number.
class PhoneDirectory {
    constructor(maxNumbers) {
        this.limit = maxNumbers;
        this.next = 0;
        this.used = new Set();
        this.released = new MinHeap([]);
    }

    get() {
        if (this.released.size() > 0) {
            // Every released number is smaller than every fresh one, so
            // the heap's minimum is the smallest available number.
            const number = this.released.pop();
            this.used.add(number);
            return number;
        }
        if (this.next < this.limit) {
            // Fresh numbers are minted in ascending order, so the counter
            // itself needs no bookkeeping.
            const number = this.next;
            this.next++;
            this.used.add(number);
            return number;
        }
        return -1;
    }

    check(number) {
        return !this.used.has(number);
    }

    release(number) {
        if (this.used.has(number)) {
            // The used-set guard makes releasing an available number a
            // no-op, so a number never enters the heap twice.
            this.used.delete(number);
            this.released.push(number);
        }
    }
}

class MinHeap {
    constructor(items) {
        this.a = items.slice();
        for (let i = (this.a.length >> 1) - 1; i >= 0; i--) this.siftDown(i);
    }
    size() {
        return this.a.length;
    }
    push(v) {
        this.a.push(v);
        let i = this.a.length - 1;
        while (i > 0) {
            const p = (i - 1) >> 1;
            if (this.a[p] <= this.a[i]) break;
            [this.a[p], this.a[i]] = [this.a[i], this.a[p]];
            i = p;
        }
    }
    pop() {
        const top = this.a[0];
        const last = this.a.pop();
        if (this.a.length) {
            this.a[0] = last;
            this.siftDown(0);
        }
        return top;
    }
    siftDown(i) {
        const n = this.a.length;
        while (true) {
            let l = 2 * i + 1,
                r = l + 1,
                m = i;
            if (l < n && this.a[l] < this.a[m]) m = l;
            if (r < n && this.a[r] < this.a[m]) m = r;
            if (m === i) break;
            [this.a[m], this.a[i]] = [this.a[i], this.a[m]];
            i = m;
        }
    }
}
