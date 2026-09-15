// Gather the non-negative values in scan order, compute the effective
// left shift k % m once, then scatter values[(j + shift) % m] into the
// j-th originally non-negative slot — negatives are never touched.
impl Solution {
    pub fn rotate_elements(nums: Vec<i32>, k: i32) -> Vec<i32> {
        let values: Vec<i32> = nums.iter().copied().filter(|&v| v >= 0).collect();
        let m = values.len();
        let mut result = nums.clone();
        if m == 0 {
            return result;
        }
        let shift = (k as usize) % m;
        let mut at = 0usize;
        for (index, &value) in nums.iter().enumerate() {
            if value >= 0 {
                result[index] = values[(at + shift) % m];
                at += 1;
            }
        }
        result
    }
}
