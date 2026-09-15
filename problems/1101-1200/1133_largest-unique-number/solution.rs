impl Solution {
    pub fn largest_unique_number(nums: Vec<i32>) -> i32 {
        let mut counts = [0i32; 1001];
        for &value in &nums {
            counts[value as usize] += 1;
        }
        // Walk downward so the first singleton found is the largest.
        for value in (0..=1000).rev() {
            if counts[value] == 1 {
                return value as i32;
            }
        }
        -1
    }
}
