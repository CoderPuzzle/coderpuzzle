impl Solution {
    pub fn appeal_sum(s: String) -> i64 {
        // flip the accounting: per character, count the substrings containing it
        // -1 = not yet seen, so i - last[c] counts all i + 1 possible starts
        let mut last = [-1i64; 26];
        let mut total: i64 = 0;
        // current = total appeal of all substrings ending at i
        let mut current: i64 = 0;
        for (i, b) in s.bytes().enumerate() {
            let c = (b - b'a') as usize;
            // s[i] is newly counted in the substrings starting after its previous
            // occurrence
            current += i as i64 - last[c];
            last[c] = i as i64;
            // each substring is charged once per distinct char it contains: its appeal
            total += current;
        }
        total
    }
}
