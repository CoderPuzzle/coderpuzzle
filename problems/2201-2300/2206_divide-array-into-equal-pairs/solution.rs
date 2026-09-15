// Values are bounded to [1, 500], so a fixed counting table answers "is
// every value's occurrence count even?" in one pass.
impl Solution {
    pub fn divide_array(nums: Vec<i32>) -> bool {
        let mut counts = vec![0i32; 501];
        for &value in &nums {
            counts[value as usize] += 1;
        }
        counts.iter().all(|&count| count % 2 == 0)
    }
}
