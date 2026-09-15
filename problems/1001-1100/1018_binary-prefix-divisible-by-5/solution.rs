impl Solution {
    pub fn prefixes_div_by5(nums: Vec<i32>) -> Vec<bool> {
        let mut answer = Vec::with_capacity(nums.len());
        let mut rem = 0;
        for bit in nums {
            rem = (rem * 2 + bit) % 5;
            answer.push(rem == 0);
        }
        answer
    }
}
