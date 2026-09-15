impl Solution {
    pub fn get_concatenation(nums: Vec<i32>) -> Vec<i32> {
        // ans is nums followed by a second copy of nums: each value lands at
        // index i and again at index i + n.
        let n = nums.len();
        let mut ans = Vec::with_capacity(2 * n);
        ans.extend_from_slice(&nums);
        ans.extend_from_slice(&nums);
        ans
    }
}
