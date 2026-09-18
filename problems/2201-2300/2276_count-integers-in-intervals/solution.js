class CountIntervals {
    constructor() {
        this.starts = [];
        this.ends = [];
        this.covered = 0;
    }

    add(left, right) {
        const starts = this.starts;
        const ends = this.ends;
        // Intervals with start <= right occupy [0, hi); disjoint and
        // sorted, their ends are sorted too, so those reaching
        // [left, ...] are the suffix [lo, hi).
        let hi = upperBound(starts, right);
        let lo = Math.min(lowerBound(ends, left), hi);
        if (lo < hi) {
            left = Math.min(left, starts[lo]);
            right = Math.max(right, ends[hi - 1]);
            for (let index = lo; index < hi; index++) {
                this.covered -= ends[index] - starts[index] + 1;
            }
            starts.splice(lo, hi - lo);
            ends.splice(lo, hi - lo);
        }
        starts.splice(lo, 0, left);
        ends.splice(lo, 0, right);
        this.covered += right - left + 1;
    }

    count() {
        return this.covered;
    }
}

// First index whose element is strictly greater than target.
function upperBound(values, target) {
    let low = 0;
    let high = values.length;
    while (low < high) {
        const mid = (low + high) >> 1;
        if (values[mid] <= target) {
            low = mid + 1;
        } else {
            high = mid;
        }
    }
    return low;
}

// First index whose element is at least target.
function lowerBound(values, target) {
    let low = 0;
    let high = values.length;
    while (low < high) {
        const mid = (low + high) >> 1;
        if (values[mid] < target) {
            low = mid + 1;
        } else {
            high = mid;
        }
    }
    return low;
}
