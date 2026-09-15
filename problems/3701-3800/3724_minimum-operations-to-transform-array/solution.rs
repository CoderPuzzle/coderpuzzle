impl Solution {
    pub fn min_operations(nums1: Vec<i32>, nums2: Vec<i32>) -> i64 {
        // Every slot i != j pays |nums1[i] - nums2[i]|, and the chosen source
        // j pays that same per-slot cost plus one append plus the distance
        // from the tail value to the span between nums1[j] and nums2[j]. The
        // base sum is common to every choice, so only the tail-to-span
        // distance varies; take its minimum. Sums reach 1e10, so 64-bit.
        let n = nums1.len();
        let mut base: i64 = 0;
        for i in 0..n {
            base += (nums1[i] as i64 - nums2[i] as i64).abs();
        }
        let tail = nums2[n] as i64;
        let mut best_gap: i64 = i64::MAX;
        for i in 0..n {
            let (a, b) = (nums1[i] as i64, nums2[i] as i64);
            let (lo, hi) = if a <= b { (a, b) } else { (b, a) };
            let gap = if tail < lo {
                lo - tail
            } else if tail > hi {
                tail - hi
            } else {
                0
            };
            if gap < best_gap {
                best_gap = gap;
            }
        }
        base + 1 + best_gap
    }
}
