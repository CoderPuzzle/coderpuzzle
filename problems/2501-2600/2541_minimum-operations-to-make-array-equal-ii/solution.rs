impl Solution {
    pub fn min_operations(nums1: Vec<i32>, nums2: Vec<i32>, k: i32) -> i64 {
        // Each operation moves +k units onto one index and -k units off
        // another, so index i needs exactly |diff_i| / k operations
        // pushing it toward its target: every difference must be divisible
        // by k, and the ups must cancel the downs exactly (sum of diffs
        // == 0). Every operation accounts for 2k units of that movement,
        // hence sum(|diff|) / (2k). k == 0 changes nothing per operation,
        // so only arrays that are already equal work. The mass is
        // <= n * 10^9 = 10^14 and answers are <= 5*10^13, both i64-safe.
        if k == 0 {
            return if nums1 == nums2 { 0 } else { -1 };
        }
        let kk = k as i64;
        let mut net: i64 = 0;
        let mut mass: i64 = 0;
        for i in 0..nums1.len() {
            let diff = nums2[i] as i64 - nums1[i] as i64;
            let magnitude = diff.abs();
            if magnitude % kk != 0 {
                return -1;
            }
            net += diff;
            mass += magnitude;
        }
        if net != 0 {
            -1
        } else {
            mass / (2 * kk)
        }
    }
}
