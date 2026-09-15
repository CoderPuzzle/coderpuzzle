impl Solution {
    // Every bit set in any element appears in exactly half of the 2^n
    // subsets, so the answer is (OR of all elements) * 2^(n-1).
    pub fn subset_xor_sum(nums: Vec<i32>) -> i32 {
        let or_all = nums.iter().fold(0, |acc, &v| acc | v);
        or_all << (nums.len() - 1)
    }
}
