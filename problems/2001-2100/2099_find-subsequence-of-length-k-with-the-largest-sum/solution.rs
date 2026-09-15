impl Solution {
    pub fn max_subsequence(nums: Vec<i32>, k: i32) -> Vec<i32> {
        let mut indices: Vec<usize> = (0..nums.len()).collect();
        indices.sort_unstable_by(|&left, &right| nums[right].cmp(&nums[left]).then_with(|| left.cmp(&right)));
        indices.truncate(k as usize);
        indices.sort_unstable();
        indices.into_iter().map(|index| nums[index]).collect()
    }
}
