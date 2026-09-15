impl Solution {
    pub fn transform_array(nums: Vec<i32>) -> Vec<i32> {
        // After the parity replacement every entry is 0 or 1, so the sorted
        // result is just zeros for the evens followed by ones for the odds.
        let ones = nums.iter().filter(|&&x| x & 1 == 1).count();
        let mut result = vec![0; nums.len() - ones];
        result.resize(nums.len(), 1);
        result
    }
}
