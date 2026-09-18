// bisect_left: first index with values[index] >= target
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

// bisect_right: first index with values[index] > target
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

// Tracked set as canonical disjoint intervals (parallel starts/ends): the
// arrays stay sorted and gap-separated, so a fully-tracked query is always
// contained in a single stored interval.
class RangeModule {
    private starts: number[];
    private ends: number[];

    constructor() {
        this.starts = [];
        this.ends = [];
    }

    addRange(start: number, end: number): void {
        const i = lowerBound(this.ends, start); // first interval ending at/after start
        const j = upperBound(this.starts, end); // first interval starting after end
        if (i < j) {
            start = Math.min(start, this.starts[i]);
            end = Math.max(end, this.ends[j - 1]);
        }
        this.starts.splice(i, j - i, start);
        this.ends.splice(i, j - i, end);
    }

    queryRange(start: number, end: number): boolean {
        const i = upperBound(this.starts, start) - 1; // last interval starting at/before start
        return i >= 0 && this.ends[i] >= end;
    }

    removeRange(start: number, end: number): void {
        const i = upperBound(this.ends, start); // first interval ending after start
        const j = lowerBound(this.starts, end); // first interval starting after end
        const newStarts: number[] = [];
        const newEnds: number[] = [];
        if (i < j) {
            if (this.starts[i] < start) {
                newStarts.push(this.starts[i]);
                newEnds.push(start);
            }
            if (this.ends[j - 1] > end) {
                newStarts.push(end);
                newEnds.push(this.ends[j - 1]);
            }
        }
        this.starts.splice(i, j - i, ...newStarts);
        this.ends.splice(i, j - i, ...newEnds);
    }
}
