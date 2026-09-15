impl Solution {
    pub fn maximum_xor(nums: Vec<i32>) -> i32 {
        let mut answer = 0_i32;
        for &value in nums.iter() {
            answer |= value;
        }
        answer
    }
}
