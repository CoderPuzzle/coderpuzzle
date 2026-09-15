function fourSumCount(nums1: number[], nums2: number[], nums3: number[], nums4: number[]): number {
    // Same split as the hash-map version -- a+b+c+d = 0 iff a+b = -(c+d)
    // -- but the join is ordered ground rather than a table: materialise
    // both halves' pair sums and sort the right one.
    const left: number[] = [];
    for (const a of nums1) {
        for (const b of nums2) {
            left.push(a + b);
        }
    }
    const right: number[] = [];
    for (const c of nums3) {
        for (const d of nums4) {
            right.push(c + d);
        }
    }
    right.sort((x, y) => x - y);
    // Each left sum asks "how many right sums equal my negation?"; on a
    // sorted array a pair of binary searches brackets exactly that run.
    let total = 0;
    for (const sum of left) {
        total += upperBound(right, -sum) - lowerBound(right, -sum);
    }
    return total;
}

// First index whose value is >= wanted.
function lowerBound(values: number[], wanted: number): number {
    let low = 0;
    let high = values.length;
    while (low < high) {
        const mid = (low + high) >> 1;
        if (values[mid] < wanted) {
            low = mid + 1;
        } else {
            high = mid;
        }
    }
    return low;
}

// First index whose value is > wanted.
function upperBound(values: number[], wanted: number): number {
    let low = 0;
    let high = values.length;
    while (low < high) {
        const mid = (low + high) >> 1;
        if (values[mid] <= wanted) {
            low = mid + 1;
        } else {
            high = mid;
        }
    }
    return low;
}
