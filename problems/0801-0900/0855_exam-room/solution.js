// Max-heap of free-gap segments between occupied seats, lazily deleted:
// candidate seat and distance are pure functions of (l, r), so stale
// entries are skipped via the live-segment set.
class ExamRoom {
    constructor(n) {
        this.n = n;
        this.occupied = []; // sorted seat numbers
        this.live = new Set(); // "l,r" segment keys
        this.heap = []; // {dist, spot, l, r}: larger dist first, then lower spot
    }

    less(a, b) {
        if (a.dist !== b.dist) {
            return a.dist > b.dist;
        }
        return a.spot < b.spot;
    }

    push(item) {
        this.heap.push(item);
        let index = this.heap.length - 1;
        while (index > 0) {
            const parent = (index - 1) >> 1;
            if (!this.less(this.heap[index], this.heap[parent])) {
                break;
            }
            [this.heap[index], this.heap[parent]] = [this.heap[parent], this.heap[index]];
            index = parent;
        }
    }

    pop() {
        const top = this.heap[0];
        const last = this.heap.length - 1;
        this.heap[0] = this.heap[last];
        this.heap.length = last;
        let index = 0;
        for (;;) {
            const left = 2 * index + 1;
            if (left >= last) {
                break;
            }
            let best = left;
            const right = left + 1;
            if (right < last && this.less(this.heap[right], this.heap[left])) {
                best = right;
            }
            if (!this.less(this.heap[best], this.heap[index])) {
                break;
            }
            [this.heap[index], this.heap[best]] = [this.heap[best], this.heap[index]];
            index = best;
        }
        return top;
    }

    // bisect_left over the occupied seats
    firstAtLeast(target) {
        let low = 0;
        let high = this.occupied.length;
        while (low < high) {
            const mid = (low + high) >> 1;
            if (this.occupied[mid] < target) {
                low = mid + 1;
            } else {
                high = mid;
            }
        }
        return low;
    }

    seat() {
        if (this.occupied.length === 0) {
            this.occupied.push(0);
            this.addSegment(0, this.n);
            return 0;
        }
        while (this.heap.length > 0) {
            const top = this.pop();
            const key = top.l + "," + top.r;
            if (!this.live.has(key)) {
                continue; // stale entry
            }
            this.live.delete(key);
            const index = this.firstAtLeast(top.spot);
            this.occupied.splice(index, 0, top.spot);
            this.addSegment(top.l, top.spot);
            this.addSegment(top.spot, top.r);
            return top.spot;
        }
        throw new Error("no seat available");
    }

    leave(p) {
        const index = this.firstAtLeast(p);
        this.occupied.splice(index, 1);
        const previous = index > 0 ? this.occupied[index - 1] : -1;
        const next = index < this.occupied.length ? this.occupied[index] : this.n;
        this.live.delete(previous + "," + p);
        this.live.delete(p + "," + next);
        if (this.occupied.length > 0 && next - previous >= 2) {
            this.addSegment(previous, next);
        }
    }

    addSegment(l, r) {
        if (r - l < 2) {
            return; // no free seat strictly between
        }
        let dist;
        let spot;
        if (l === -1) {
            dist = r;
            spot = 0;
        } else if (r === this.n) {
            dist = this.n - 1 - l;
            spot = this.n - 1;
        } else {
            spot = Math.trunc((l + r) / 2);
            dist = Math.trunc((r - l) / 2);
        }
        this.live.add(l + "," + r);
        this.push({ dist, spot, l, r });
    }
}
