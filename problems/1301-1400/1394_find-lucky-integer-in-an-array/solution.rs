impl Solution {
    pub fn find_lucky(arr: Vec<i32>) -> i32 {
        // Values are bounded by 500, so a fixed tally array replaces a hash
        // map. Scanning it downward returns the largest value whose count
        // equals the value itself; -1 survives when none matches.
        let mut counts = [0i32; 501];
        for value in &arr {
            counts[*value as usize] += 1;
        }
        for value in (1..=500).rev() {
            if counts[value] == value as i32 {
                return value as i32;
            }
        }
        -1
    }
}
