impl Solution {
    // Only the two canonical alternating patterns are targets. Each swap
    // fixes exactly two mismatched positions, so a pattern costs mismatches
    // divided by two; take the cheaper count-feasible pattern.
    pub fn min_swaps(s: String) -> i32 {
        let bytes = s.as_bytes();
        let n = bytes.len() as i32;
        let ones: i32 = bytes.iter().map(|&b| (b == b'1') as i32).sum();
        if (2 * ones - n).abs() > 1 {
            return -1;
        }
        let mut best: Option<i32> = None;
        for start in 0..=1 {
            let pattern_ones = if start == 0 { (n + 1) / 2 } else { n / 2 };
            if pattern_ones != ones {
                continue;
            }
            let mism: i32 = bytes
                .iter()
                .enumerate()
                .map(|(i, &b)| (b != b'0' + ((i as i32 & 1) ^ start ^ 1) as u8) as i32)
                .sum();
            let cost = mism / 2;
            best = Some(match best {
                Some(b) => b.min(cost),
                None => cost,
            });
        }
        best.unwrap_or(-1)
    }
}
