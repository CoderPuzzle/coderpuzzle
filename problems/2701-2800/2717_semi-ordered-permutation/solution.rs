impl Solution {
    pub fn semi_ordered_permutation(nums: Vec<i32>) -> i32 {
        let n = nums.len();
        let mut i = 0usize;
        let mut j = 0usize;
        for k in 0..n {
            if nums[k] == 1 {
                i = k;
            }
            if nums[k] as usize == n {
                j = k;
            }
        }
        (i + (n - 1 - j) - usize::from(i > j)) as i32
    }
}
