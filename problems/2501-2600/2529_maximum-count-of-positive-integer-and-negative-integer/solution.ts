function maximumCount(nums: number[]): number {
    // First index whose value is >= target (nums sorted ascending).
    const lowerBound = function (target: number): number {
        let lo = 0;
        let hi = nums.length;
        while (lo < hi) {
            const mid = (lo + hi) >> 1;
            if (nums[mid] < target) lo = mid + 1;
            else hi = mid;
        }
        return lo;
    };
    // In a sorted array the negatives are exactly the prefix ending before
    // the first value >= 0 and the positives are exactly the suffix
    // starting at the first value >= 1. Two binary searches fix both
    // boundaries in O(log n); zeros belong to neither side.
    const neg = lowerBound(0);
    const pos = nums.length - lowerBound(1);
    return Math.max(neg, pos);
}
