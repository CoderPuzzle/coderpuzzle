impl Solution {
    pub fn min_window(s: String, t: String) -> String {
        let s = s.as_bytes();
        let t = t.as_bytes();
        if t.is_empty() || t.len() > s.len() {
            return String::new();
        }
        let mut quota = [0i32; 128];
        let mut kinds = 0;
        for &ch in t {
            let slot = &mut quota[ch as usize];
            if *slot == 0 {
                kinds += 1;
            }
            *slot += 1;
        }
        // Slide one window of exactly `length` across s. `below` counts
        // demanded letters still short of quota, so below == 0 means this
        // window covers t; letters absent from t never touch it.
        let covers = |length: usize| -> Option<usize> {
            let mut have = [0i32; 128];
            let mut below = kinds;
            for &ch in &s[..length] {
                let q = quota[ch as usize];
                if q > 0 {
                    have[ch as usize] += 1;
                    if have[ch as usize] == q {
                        below -= 1;
                    }
                }
            }
            if below == 0 {
                return Some(0);
            }
            for start in 1..=(s.len() - length) {
                let incoming = s[start + length - 1];
                let q = quota[incoming as usize];
                if q > 0 {
                    have[incoming as usize] += 1;
                    if have[incoming as usize] == q {
                        below -= 1;
                    }
                }
                let outgoing = s[start - 1];
                let q = quota[outgoing as usize];
                if q > 0 {
                    // Dropping from exactly-at-quota to one short reopens
                    // the debt; deeper surpluses change nothing.
                    if have[outgoing as usize] == q {
                        below += 1;
                    }
                    have[outgoing as usize] -= 1;
                }
                if below == 0 {
                    return Some(start);
                }
            }
            None
        };
        // Coverage is monotone in the length: a covering window of length
        // L sits inside a covering window of length L + 1, so "some window
        // of length L covers t" is false below the answer and true from it
        // upward. Binary search for the smallest surviving length.
        let mut lo = t.len();
        let mut hi = s.len();
        let mut best: Option<(usize, usize)> = None;
        while lo <= hi {
            let mid = lo + (hi - lo) / 2;
            if let Some(start) = covers(mid) {
                best = Some((start, mid));
                hi = mid - 1;
            } else {
                lo = mid + 1;
            }
        }
        // Within the minimal length the scan reports the leftmost cover,
        // the same window the shrinking sweep settles on.
        match best {
            Some((start, len)) => String::from_utf8(s[start..start + len].to_vec()).unwrap(),
            None => String::new(),
        }
    }
}
