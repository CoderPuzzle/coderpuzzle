impl Solution {
    pub fn residue_prefixes(s: String) -> i32 {
        // The prefix of length i is a residue when its distinct-character
        // count equals i % 3. A single left-to-right pass carries that
        // count in a seen-table: after absorbing character i the table
        // records exactly the distinct characters of the prefix that
        // ends there. Lengths divisible by 3 never qualify (a non-empty
        // prefix has at least one distinct character), which the
        // comparison covers without special-casing.
        let mut seen = [false; 26];
        let (mut distinct, mut count) = (0, 0);
        for (i, b) in s.bytes().enumerate() {
            let idx = (b - b'a') as usize;
            if !seen[idx] {
                seen[idx] = true;
                distinct += 1;
            }
            if distinct == (i + 1) % 3 {
                count += 1;
            }
        }
        count
    }
}
