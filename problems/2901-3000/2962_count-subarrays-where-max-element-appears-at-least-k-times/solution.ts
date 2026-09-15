function countSubarrays(nums: number[], k: number): number {
    // A subarray qualifies exactly when it holds >= k copies of
    // M = max(nums). Scan right ends, shrink the left end while the window
    // keeps k copies; afterwards `left` is the number of start positions
    // that still keep k copies for the current right end, so each
    // qualifying subarray is counted exactly once, at its right end.
    // Answer peaks at n*(n+1)/2 ~ 5*10^9, exact as a Number (far below
    // 2^53) but beyond 32 bits.
    const m = nums.reduce((best, value) => (value > best ? value : best));
    let answer = 0;
    let left = 0;
    let count = 0;
    for (let right = 0; right < nums.length; ++right) {
        if (nums[right] === m) {
            ++count;
        }
        while (count === k) {
            if (nums[left] === m) {
                --count;
            }
            ++left;
        }
        answer += left;
    }
    return answer;
}
