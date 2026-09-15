impl Solution {
    pub fn filter_characters(s: String, k: i32) -> String {
        // Tally every occurrence into a fixed 26-slot table; the
        // lowercase-only input makes each index a plain offset from b'a'.
        let mut counts = [0usize; 26];
        for ch in s.chars() {
            counts[ch as usize - 'a' as usize] += 1;
        }
        // Scan left to right, keeping exactly the characters whose total
        // count is strictly below the threshold; original order falls out
        // of the scan for free.
        let mut result = String::new();
        for ch in s.chars() {
            if counts[ch as usize - 'a' as usize] < k as usize {
                result.push(ch);
            }
        }
        result
    }
}
