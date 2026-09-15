// The initial sum is fixed; a replacement at index i can only cut
// |nums1[i] - nums2[i]| down to the distance from nums2[i] to the nearest
// value in nums1, so hunt that nearest value in a sorted copy and keep the
// largest saving seen.
impl Solution {
    pub fn min_absolute_sum_diff(nums1: Vec<i32>, nums2: Vec<i32>) -> i32 {
        const MOD: i64 = 1_000_000_007;
        let mut sorted1 = nums1.clone();
        sorted1.sort_unstable();
        // the raw sum tops out at 10^10 — beyond 32-bit — so it accumulates
        // in an i64 and narrows only after the modulo
        let mut total: i64 = 0;
        let mut best_gain: i64 = 0;
        for i in 0..nums1.len() {
            let a = nums1[i] as i64;
            let b = nums2[i] as i64;
            let diff = (a - b).abs();
            total += diff;
            // neighbors of nums2[i] in the sorted copy bracket the nearest value
            let position = sorted1.partition_point(|&x| x < nums2[i]);
            let mut nearest = diff;
            if position < sorted1.len() {
                nearest = nearest.min(sorted1[position] as i64 - b);
            }
            if position > 0 {
                nearest = nearest.min(b - sorted1[position - 1] as i64);
            }
            best_gain = best_gain.max(diff - nearest);
        }
        ((total - best_gain) % MOD) as i32
    }
}
