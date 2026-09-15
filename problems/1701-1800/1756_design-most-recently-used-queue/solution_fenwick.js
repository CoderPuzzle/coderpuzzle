// The line rides a virtual tape: value v starts at tape position v and the
// j-th fetch re-appends its element at position n + j, so tape order is
// always line order. front marks the first live slot of the initial run — a
// sorted hole list remembers the vacated ones — while a Fenwick tree over
// the append stamps counts live elements per position, with a stamp-to-value
// map beside it.
class MRUQueue {
    constructor(n) {
        this.limit = n;
        this.front = 1;
        this.holes = [];
        this.stamps = 10000;
        this.step = 1;
        while (this.step * 2 <= this.stamps) {
            this.step *= 2;
        }
        this.tree = new Array(this.stamps + 1).fill(0);
        this.vals = new Array(this.stamps + 1).fill(0);
        this.fetches = 0;
    }

    fetch(k) {
        const initLive = this.limit - this.front + 1 - this.holes.length;
        let value;
        if (k <= initLive) {
            let lo = this.front;
            let hi = this.limit;
            while (lo < hi) {
                const mid = Math.floor((lo + hi) / 2);
                if (mid - this.front + 1 - this.holesUpTo(mid) >= k) {
                    hi = mid;
                } else {
                    lo = mid + 1;
                }
            }
            value = lo;
            this.holes.splice(this.holesUpTo(value), 0, value);
            while (this.holes.length > 0 && this.holes[0] === this.front) {
                this.holes.shift();
                this.front++;
            }
        } else {
            let remaining = k - initLive;
            let pos = 0;
            for (let hop = this.step; hop > 0; hop >>= 1) {
                const next = pos + hop;
                if (next <= this.stamps && this.tree[next] < remaining) {
                    pos = next;
                    remaining -= this.tree[next];
                }
            }
            const stamp = pos + 1;
            value = this.vals[stamp];
            this.add(stamp, -1);
        }
        this.fetches++;
        this.vals[this.fetches] = value;
        this.add(this.fetches, 1);
        return value;
    }

    holesUpTo(bound) {
        let lo = 0;
        let hi = this.holes.length;
        while (lo < hi) {
            const mid = Math.floor((lo + hi) / 2);
            if (this.holes[mid] <= bound) {
                lo = mid + 1;
            } else {
                hi = mid;
            }
        }
        return lo;
    }

    add(stamp, delta) {
        for (; stamp <= this.stamps; stamp += stamp & -stamp) {
            this.tree[stamp] += delta;
        }
    }
}
