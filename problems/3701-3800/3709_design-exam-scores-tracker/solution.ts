// Binary-search helpers: first index with value >= target, and first
// index with value > target (one past the last <= it).
function lowerBound(values: number[], target: number): number {
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

function upperBound(values: number[], target: number): number {
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

// Append-only timeline with running prefix totals: chronological calls
// keep `times` sorted, so a query binary-searches the window
// [startTime, endTime] and subtracts two prefix totals. Totals stay at
// most near 10^14, exact in doubles well below the 2^53 ceiling.
class ExamTracker {
    private times: number[] = [];
    private sums: number[] = [];

    constructor() {}

    record(time: number, score: number): void {
        this.times.push(time);
        this.sums.push((this.sums.length ? this.sums[this.sums.length - 1] : 0) + score);
    }

    totalScore(startTime: number, endTime: number): number {
        const left = lowerBound(this.times, startTime);
        const right = upperBound(this.times, endTime) - 1;
        if (left > right) {
            return 0;
        }
        let total = this.sums[right];
        if (left > 0) {
            total -= this.sums[left - 1];
        }
        return total;
    }
}
