impl Solution {
    pub fn binary_searchable_numbers(nums: Vec<i32>) -> i32 {
        // A value is guaranteed found iff every element left of it is
        // smaller and every element right of it is larger, so a smaller
        // right pivot or a larger left pivot can never discard it. Compare
        // each value against a running prefix max and a precomputed suffix
        // min.
        let n = nums.len();
        let mut suffix_min = vec![0i32; n];
        suffix_min[n - 1] = nums[n - 1];
        for i in (0..n - 1).rev() {
            suffix_min[i] = nums[i].min(suffix_min[i + 1]);
        }
        let mut count = 0;
        let mut prefix_max = nums[0];
        for i in 0..n {
            if (i == 0 || nums[i] > prefix_max) && (i == n - 1 || nums[i] < suffix_min[i + 1]) {
                count += 1;
            }
            if nums[i] > prefix_max {
                prefix_max = nums[i];
            }
        }
        count
    }
}
