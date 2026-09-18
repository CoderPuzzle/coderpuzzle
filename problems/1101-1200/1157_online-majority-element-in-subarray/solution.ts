class MajorityChecker {
    private n: number;
    private candidateOf: number[];
    private surplusOf: number[];
    private positions: Map<number, number[]>;

    constructor(arr: number[]) {
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

    private build(node: number, lo: number, hi: number, arr: number[]): void {
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

    private static merge(left: number[], right: number[]): number[] {
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

    query(left: number, right: number, threshold: number): number {
        const candidate = this.fold(1, 0, this.n - 1, left, right)[0];
        const occurrences = this.positions.get(candidate);
        if (!occurrences) {
            return -1;
        }
        const count =
            MajorityChecker.lowerBound(occurrences, right + 1) - MajorityChecker.lowerBound(occurrences, left);
        return count >= threshold ? candidate : -1;
    }

    private fold(node: number, lo: number, hi: number, left: number, right: number): number[] {
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

    private static lowerBound(values: number[], target: number): number {
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
