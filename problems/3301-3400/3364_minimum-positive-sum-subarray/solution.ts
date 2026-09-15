function minimumSumSubarray(nums: number[], l: number, r: number): number {
    // Prefix sums turn each candidate window into an O(1) subtraction, so
    // scanning every (start, length) pair is O(n^2) windows overall. With
    // n <= 100 and |nums[i]| <= 1000 every partial sum stays far inside
    // 32-bit range, so plain numbers hold everything exactly.
    const prefix = new Array(nums.length + 1).fill(0);
    for (let i = 0; i < nums.length; ++i) prefix[i + 1] = prefix[i] + nums[i];
    let best = -1;
    for (let start = 0; start < nums.length; ++start) {
        for (let length = l; length <= r; ++length) {
            const end = start + length;
            if (end > nums.length) break;
            const total = prefix[end] - prefix[start];
            if (total > 0 && (best === -1 || total < best)) best = total;
        }
    }
    return best;
}
