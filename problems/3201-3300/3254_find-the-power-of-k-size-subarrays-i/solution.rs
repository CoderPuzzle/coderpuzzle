impl Solution {
    pub fn results_array(nums: Vec<i32>, k: i32) -> Vec<i32> {
        // run counts the consecutive +1 steps ending at the current index;
        // a size-k window is powered iff its last k - 1 adjacent pairs all
        // stepped up by one, i.e. run reaches k - 1 at the window's end.
        let k = k as usize;
        let mut results = vec![-1; nums.len() - k + 1];
        let mut run = 0usize;
        for i in 0..nums.len() {
            run = if i > 0 && nums[i] == nums[i - 1] + 1 {
                run + 1
            } else {
                0
            };
            if i + 1 >= k && run >= k - 1 {
                results[i + 1 - k] = nums[i];
            }
        }
        results
    }
}
