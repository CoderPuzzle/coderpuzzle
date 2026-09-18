class MajorityChecker {
    constructor(arr) {
        this.n = arr.length;
        this.candidateOf = new Array(4 * this.n).fill(0);
        this.surplusOf = new Array(4 * this.n).fill(0);
        this.positions = new Map();
        this.build(1, 0, this.n - 1, arr);
        for (let i = 0; i < this.n; i++) {
            let occurrences = this.positions.get(arr[i]);
            if (!occurrences) {
                occurrences = [];
                this.positions.set(arr[i], occurrences);
            }
            occurrences.push(i);
        }
    }

    build(node, lo, hi, arr) {
        if (lo === hi) {
            this.candidateOf[node] = arr[lo];
            this.surplusOf[node] = 1;
            return;
        }
        const mid = (lo + hi) >> 1;
        this.build(2 * node, lo, mid, arr);
        this.build(2 * node + 1, mid + 1, hi, arr);
        const merged = MajorityChecker.merge(
            [this.candidateOf[2 * node], this.surplusOf[2 * node]],
            [this.candidateOf[2 * node + 1], this.surplusOf[2 * node + 1]],
        );
        this.candidateOf[node] = merged[0];
        this.surplusOf[node] = merged[1];
    }

    static merge(left, right) {
        const [leftValue, leftVotes] = left;
        const [rightValue, rightVotes] = right;
        if (leftValue === rightValue) {
            return [leftValue, leftVotes + rightVotes];
        }
        if (leftVotes > rightVotes) {
            return [leftValue, leftVotes - rightVotes];
        }
        if (rightVotes > leftVotes) {
            return [rightValue, rightVotes - leftVotes];
        }
        return [0, 0];
    }

    query(left, right, threshold) {
        const candidate = this.fold(1, 0, this.n - 1, left, right)[0];
        const occurrences = this.positions.get(candidate);
        if (!occurrences) {
            return -1;
        }
        const count =
            MajorityChecker.lowerBound(occurrences, right + 1) - MajorityChecker.lowerBound(occurrences, left);
        return count >= threshold ? candidate : -1;
    }

    fold(node, lo, hi, left, right) {
        if (left <= lo && hi <= right) {
            return [this.candidateOf[node], this.surplusOf[node]];
        }
        const mid = (lo + hi) >> 1;
        if (right <= mid) {
            return this.fold(2 * node, lo, mid, left, right);
        }
        if (left > mid) {
            return this.fold(2 * node + 1, mid + 1, hi, left, right);
        }
        return MajorityChecker.merge(
            this.fold(2 * node, lo, mid, left, right),
            this.fold(2 * node + 1, mid + 1, hi, left, right),
        );
    }

    static lowerBound(values, target) {
        let lo = 0;
        let hi = values.length;
        while (lo < hi) {
            const mid = (lo + hi) >>> 1;
            if (values[mid] < target) {
                lo = mid + 1;
            } else {
                hi = mid;
            }
        }
        return lo;
    }
}
