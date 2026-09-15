impl Solution {
    pub fn minimum_swaps(nums: Vec<i32>) -> i32 {
        let n = nums.len();
        let mut i = 0usize;
        for k in 1..n {
            if nums[k] < nums[i] {
                i = k;
            }
        }
        let mut j = n - 1;
        for k in (0..n - 1).rev() {
            if nums[k] > nums[j] {
                j = k;
            }
        }
        (i + (n - 1 - j) - usize::from(j < i)) as i32
    }
}
