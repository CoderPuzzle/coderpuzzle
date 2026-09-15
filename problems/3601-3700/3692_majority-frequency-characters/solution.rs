impl Solution {
    pub fn majority_frequency_group(s: String) -> String {
        // Tally every occurrence into a fixed 26-slot table; the
        // lowercase-only input makes each index a plain offset from b'a'.
        let mut counts = [0usize; 26];
        for ch in s.chars() {
            counts[ch as usize - 'a' as usize] += 1;
        }
        // Evaluate each candidate frequency's bucket and keep the largest
        // gathering of distinct characters; sweeping frequencies upward lets
        // ">=" hand size ties to the larger frequency, and the ascending slot
        // scan collects the winners already in lexicographic order.
        let mut best: Vec<char> = Vec::new();
        for k in 1..=s.len() {
            let chars: Vec<char> = (0..26)
                .filter(|&i| counts[i] == k)
                .map(|i| (b'a' + i as u8) as char)
                .collect();
            if chars.len() >= best.len() {
                best = chars;
            }
        }
        best.into_iter().collect()
    }
}
