// Slides a fixed-length-k window holding a value->count map, so the map size
// is always the current window's distinct count. Sums reach
// n * max(nums[i]) = 2 * 10^4 * 10^9 = 2 * 10^13 < 2^53, so every value
// here stays an exact double.
function maxSum(nums: number[], m: number, k: number): number {
    let best = 0;
    const freq = new Map<number, number>();
    let winSum = 0;
    for (let right = 0; right < nums.length; ++right) {
        freq.set(nums[right], (freq.get(nums[right]) ?? 0) + 1);
        winSum += nums[right];
        if (right >= k) {
            const old = nums[right - k];
            if (freq.get(old) === 1) {
                freq.delete(old);
            } else {
                freq.set(old, freq.get(old)! - 1);
            }
            winSum -= old;
        }
        if (right + 1 >= k && freq.size >= m && winSum > best) {
            best = winSum;
        }
    }
    return best;
}
