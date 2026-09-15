impl Solution {
    pub fn beauty_sum(s: String) -> i32 {
        // For each start, grow the substring one character at a time and
        // read every prefix's beauty straight off a running count array:
        // max frequency minus min nonzero frequency.
        let b = s.as_bytes();
        let n = b.len();
        let mut total: i32 = 0;
        for i in 0..n {
            let mut counts = [0i32; 26];
            for j in i..n {
                counts[usize::from(b[j] - b'a')] += 1;
                let mut best = 0;
                let mut least = n as i32;
                for &c in counts.iter() {
                    if c > best {
                        best = c;
                    }
                    if c > 0 && c < least {
                        least = c;
                    }
                }
                total += best - least;
            }
        }
        total
    }
}
