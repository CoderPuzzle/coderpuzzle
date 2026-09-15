impl Solution {
    pub fn count_substrings(s: String) -> i64 {
        let digits: Vec<i64> = s.bytes().map(|c| (c - b'0') as i64).collect();
        let mut total: i64 = 0;
        // One independent pass per candidate last digit d; the passes sum.
        // cnt[r] counts suffixes of the already-processed prefix whose value
        // is congruent to r modulo d.
        for d in 1..10i64 {
            let mut cnt = vec![0i64; d as usize];
            for &di in &digits {
                // Extending a suffix of remainder r by this digit d yields
                // r*10 + d, divisible exactly when (r * 10) % d == 0; the +1
                // covers the single-character substring "d".
                if di == d {
                    for r in 0..d {
                        if (r * 10) % d == 0 {
                            total += cnt[r as usize];
                        }
                    }
                    total += 1;
                }
                // Remap every suffix: appending di sends remainder r to
                // (10*r + di) % d, and di alone starts a fresh suffix.
                let mut new_cnt = vec![0i64; d as usize];
                for r in 0..d {
                    if cnt[r as usize] != 0 {
                        new_cnt[((r * 10 + di) % d) as usize] += cnt[r as usize];
                    }
                }
                new_cnt[(di % d) as usize] += 1;
                cnt = new_cnt;
            }
        }
        total
    }
}
