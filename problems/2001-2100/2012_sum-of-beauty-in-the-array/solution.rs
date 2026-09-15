impl Solution {
    pub fn sum_of_beauties(nums: Vec<i32>) -> i32 {
        let n = nums.len();
        let mut prefix = vec![0; n];
        let mut suffix = vec![0; n];
        for index in 1..n {
            prefix[index] = prefix[index - 1].max(nums[index - 1]);
        }
        suffix[n - 2] = nums[n - 1];
        for index in (1..n - 2).rev() {
            suffix[index] = suffix[index + 1].min(nums[index + 1]);
        }

        let mut beauty = 0;
        for index in 1..n - 1 {
            if prefix[index] < nums[index] && nums[index] < suffix[index] {
                beauty += 2;
            } else if nums[index - 1] < nums[index] && nums[index] < nums[index + 1] {
                beauty += 1;
            }
        }
        beauty
    }
}
