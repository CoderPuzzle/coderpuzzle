impl Solution {
    pub fn partition_disjoint(nums: Vec<i32>) -> i32 {
        // Suffix minima: min_from[i] is the minimum of nums[i:], built
        // right to left so each step reuses the suffix behind it.
        let n = nums.len();
        let mut min_from = vec![0; n];
        min_from[n - 1] = nums[n - 1];
        for i in (0..n - 1).rev() {
            min_from[i] = nums[i].min(min_from[i + 1]);
        }
        // Prefix max sweep: the first cut whose left max clears the
        // right min is the smallest valid left.
        let mut max_to = nums[0];
        for i in 1..n {
            if max_to <= min_from[i] {
                return i as i32;
            }
            max_to = max_to.max(nums[i]);
        }
        // Unreachable on valid input: the guarantee says a cut exists.
        (n - 1) as i32
    }
}
