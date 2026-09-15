impl Solution {
    pub fn kth_largest_number(mut nums: Vec<String>, k: i32) -> String {
        // A string of more digits is always the larger integer, so ordering
        // by length first and lexicographically second is numeric order.
        let k = k as usize;
        nums.sort_by(|a, b| a.len().cmp(&b.len()).then(a.cmp(b)));
        nums[nums.len() - k].clone()
    }
}
