// Sorted disjoint [start, end] intervals, merged at add time; addNum
// binary-searches the starts for the value's slot and repairs at most the
// two neighbors; getIntervals hands out a copy.
class SummaryRanges {
    private intervals: number[][];

    constructor() {
        this.intervals = [];
    }

    addNum(value: number): void {
        let low = 0;
        let high = this.intervals.length;
        while (low < high) {
            const middle = (low + high) >> 1;
            if (this.intervals[middle][0] < value) {
                low = middle + 1;
            } else {
                high = middle;
            }
        }
        const index = low;
        const touchesLeft = index > 0 && this.intervals[index - 1][1] + 1 >= value;
        const touchesRight = index < this.intervals.length && this.intervals[index][0] - 1 <= value;
        if (touchesLeft && touchesRight) {
            // value welds the two neighbors into one interval.
            this.intervals[index - 1][1] = this.intervals[index][1];
            this.intervals.splice(index, 1);
        } else if (touchesLeft) {
            // Extend the left neighbor; a value it already covers is a no-op.
            this.intervals[index - 1][1] = Math.max(this.intervals[index - 1][1], value);
        } else if (touchesRight) {
            this.intervals[index][0] = value;
        } else {
            this.intervals.splice(index, 0, [value, value]);
        }
    }

    getIntervals(): number[][] {
        return this.intervals.map((interval) => interval.slice());
    }
}
