class BookMyShow {
    constructor(n, m) {
        this.n = n;
        this.m = m;
        this.remaining = new Array(n).fill(m); // free seats left per row
        this.sums = new Array(4 * n).fill(0);
        this.maxs = new Array(4 * n).fill(0);
        if (n > 0) {
            this.build(1, 0, n - 1);
        }
    }

    build(node, lo, hi) {
        if (lo === hi) {
            this.sums[node] = this.remaining[lo];
            this.maxs[node] = this.remaining[lo];
            return;
        }
        const mid = (lo + hi) >>> 1;
        this.build(2 * node, lo, mid);
        this.build(2 * node + 1, mid + 1, hi);
        this.pull(node);
    }

    pull(node) {
        this.sums[node] = this.sums[2 * node] + this.sums[2 * node + 1];
        this.maxs[node] = Math.max(this.maxs[2 * node], this.maxs[2 * node + 1]);
    }

    update(node, lo, hi, index, value) {
        if (lo === hi) {
            this.remaining[index] = value;
            this.sums[node] = value;
            this.maxs[node] = value;
            return;
        }
        const mid = (lo + hi) >>> 1;
        if (index <= mid) {
            this.update(2 * node, lo, mid, index, value);
        } else {
            this.update(2 * node + 1, mid + 1, hi, index, value);
        }
        this.pull(node);
    }

    rangeSum(node, lo, hi, left, right) {
        if (right < lo || hi < left) {
            return 0;
        }
        if (left <= lo && hi <= right) {
            return this.sums[node];
        }
        const mid = (lo + hi) >>> 1;
        return this.rangeSum(2 * node, lo, mid, left, right) + this.rangeSum(2 * node + 1, mid + 1, hi, left, right);
    }

    // Smallest index in [left, right] with remaining >= k, or -1.
    firstAtLeast(node, lo, hi, left, right, k) {
        if (right < lo || hi < left || this.maxs[node] < k) {
            return -1;
        }
        if (lo === hi) {
            return lo;
        }
        const mid = (lo + hi) >>> 1;
        const found = this.firstAtLeast(2 * node, lo, mid, left, right, k);
        if (found !== -1) {
            return found;
        }
        return this.firstAtLeast(2 * node + 1, mid + 1, hi, left, right, k);
    }

    gather(k, lastRow) {
        const row = this.firstAtLeast(1, 0, this.n - 1, 0, lastRow, k);
        if (row === -1) {
            return [];
        }
        const column = this.m - this.remaining[row];
        this.update(1, 0, this.n - 1, row, this.remaining[row] - k);
        return [row, column];
    }

    scatter(k, lastRow) {
        if (this.rangeSum(1, 0, this.n - 1, 0, lastRow) < k) {
            return false;
        }
        let row = 0;
        while (k > 0) {
            row = this.firstAtLeast(1, 0, this.n - 1, row, lastRow, 1);
            const take = Math.min(this.remaining[row], k);
            k -= take;
            this.update(1, 0, this.n - 1, row, this.remaining[row] - take);
            row++;
        }
        return true;
    }
}
