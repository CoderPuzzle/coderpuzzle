impl Solution {
    pub fn find_missing_elements(nums: Vec<i32>) -> Vec<i32> {
        // Mark presence per value, then sweep the original range [min, max]
        // in increasing order: every unmarked value is missing, and sweeping
        // in order yields the sorted result directly.
        let lo = *nums.iter().min().unwrap();
        let hi = *nums.iter().max().unwrap();
        let mut present = vec![false; hi as usize + 1];
        for &value in &nums {
            present[value as usize] = true;
        }
        let mut missing = Vec::new();
        for value in lo..=hi {
            if !present[value as usize] {
                missing.push(value);
            }
        }
        missing
    }
}
