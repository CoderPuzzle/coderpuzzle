impl Solution {
    pub fn min_sum_square_diff(nums1: Vec<i32>, nums2: Vec<i32>, k1: i32, k2: i32) -> i64 {
        // Only |nums1[i] - nums2[i]| matters: a +1 on either array moves the
        // difference one step in whichever direction we pick, so k1 and k2
        // pool into one budget spent on absolute differences.
        let n = nums1.len();
        let mut top = 0_i32;
        for index in 0..n {
            top = top.max((nums1[index] - nums2[index]).abs());
        }
        let mut counts = vec![0_i64; (top + 1) as usize];
        for index in 0..n {
            counts[(nums1[index] - nums2[index]).abs() as usize] += 1;
        }
        // Lowering an entry from v to v - 1 removes 2v - 1 from the sum,
        // more the larger v is, so a currently largest entry absorbs every
        // operation and none goes past zero (|d| would grow again). Sweep
        // levels downward, move whole buckets while the budget covers them,
        // split the bucket it does not cover. The budget widens before the
        // add: each of k1 and k2 fits an i32 but their sum does not.
        let mut budget = k1 as i64 + k2 as i64;
        let mut level = top;
        while level >= 1 && budget > 0 {
            let moved = budget.min(counts[level as usize]);
            if moved > 0 {
                counts[(level - 1) as usize] += moved;
                counts[level as usize] -= moved;
                budget -= moved;
            }
            level -= 1;
        }
        let mut total = 0_i64;
        for (level, count) in counts.iter().enumerate() {
            total += level as i64 * level as i64 * count;
        }
        total
    }
}
