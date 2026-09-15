/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @param {number[]} nums3
 * @param {number[]} nums4
 * @return {number}
 */
var fourSumCount = function (nums1, nums2, nums3, nums4) {
    // Same split as the hash-map version -- a+b+c+d = 0 iff a+b = -(c+d)
    // -- but the join is ordered ground rather than a table: materialise
    // both halves' pair sums and sort the right one.
    const left = [];
    for (const a of nums1) {
        for (const b of nums2) {
            left.push(a + b);
        }
    }
    const right = [];
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
};

// First index whose value is >= wanted.
function lowerBound(values, wanted) {
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
function upperBound(values, wanted) {
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
