impl Solution {
    pub fn apply_operations(nums: Vec<i32>) -> Vec<i32> {
        // Phase 1: apply the n-1 operations left to right; doubling an
        // element zeroes its right neighbor, which the next comparison sees.
        let mut result = nums.clone();
        for i in 0..result.len() - 1 {
            if result[i] == result[i + 1] {
                result[i] *= 2;
                result[i + 1] = 0;
            }
        }
        // Phase 2: stable-compact non-zero values to the front, then pad.
        let mut write = 0;
        for read in 0..result.len() {
            if result[read] != 0 {
                result[write] = result[read];
                write += 1;
            }
        }
        for slot in result.iter_mut().skip(write) {
            *slot = 0;
        }
        result
    }
}
