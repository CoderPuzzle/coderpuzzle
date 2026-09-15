impl Solution {
    pub fn minimum_sum(nums: Vec<i32>) -> i32 {
        // For a fixed peak j the best i is the smallest value left of j and
        // the best k the smallest value right of j, so prefix and suffix
        // minima settle both sides in one array each.
        let n = nums.len();
        let mut prefix_min = vec![0; n];
        prefix_min[0] = nums[0];
        for i in 1..n {
            prefix_min[i] = prefix_min[i - 1].min(nums[i]);
        }
        let mut suffix_min = vec![0; n];
        suffix_min[n - 1] = nums[n - 1];
        for i in (0..n - 1).rev() {
            suffix_min[i] = suffix_min[i + 1].min(nums[i]);
        }
        // Every interior index is tried as the peak; the strict inequalities
        // guard against equal shoulders, and -1 survives when none qualifies.
        let mut best = -1;
        for j in 1..n - 1 {
            let left = prefix_min[j - 1];
            let right = suffix_min[j + 1];
            if left < nums[j] && right < nums[j] {
                let total = left + nums[j] + right;
                if best == -1 || total < best {
                    best = total;
                }
            }
        }
        best
    }
}
