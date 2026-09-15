impl Solution {
    pub fn count_opposite_parity(nums: Vec<i32>) -> Vec<i32> {
        let mut even = 0;
        let mut odd = 0;
        let mut answer = vec![0; nums.len()];
        for i in (0..nums.len()).rev() {
            if nums[i] % 2 == 0 {
                answer[i] = odd;
                even += 1;
            } else {
                answer[i] = even;
                odd += 1;
            }
        }
        answer
    }
}
