// Distinct values mean two length-k windows never tie: their first
// elements differ, and the comparison is decided at index 0 by that
// pair alone. The answer is therefore the window starting at the
// maximum of nums[0..n-k] — one scan for that position, then take
// the k elements from it.
impl Solution {
    pub fn largest_subarray(nums: Vec<i32>, k: i32) -> Vec<i32> {
        let k = k as usize;
        let mut best = 0;
        for i in 1..=(nums.len() - k) {
            if nums[i] > nums[best] {
                best = i;
            }
        }
        nums[best..best + k].to_vec()
    }
}
