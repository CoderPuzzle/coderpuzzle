impl Solution {
    pub fn largest_variance(s: String) -> i32 {
        let bytes = s.as_bytes();
        let mut present = [false; 26];
        for &b in bytes {
            present[(b - b'a') as usize] = true;
        }
        let mut answer: i32 = 0;
        // Variance = max over ordered pairs (high, low) of count(high) -
        // count(low), with both chars present in the substring. Map high to
        // +1, low to -1, everything else to 0, and run Kadane per pair.
        for high in 0..26 {
            if !present[high] {
                continue;
            }
            for low in 0..26 {
                if !present[low] || high == low {
                    continue;
                }
                let mut diff: i32 = 0; // max subarray sum ending here (may lack `low`)
                let mut has_low = false; // whether diff_with_low has been initialized
                let mut diff_with_low: i32 = 0; // same but guaranteed to contain at least one `low`
                for &b in bytes {
                    let ch = (b - b'a') as usize;
                    if ch == high {
                        diff += 1;
                        if has_low {
                            diff_with_low += 1;
                        }
                    } else if ch == low {
                        diff -= 1;
                        // Extend the best-with-low through this -1, or graft
                        // the entire no-`low` prefix ending here onto it —
                        // always at least as good as restarting from scratch.
                        if has_low {
                            diff_with_low = (diff_with_low - 1).max(diff);
                        } else {
                            // First `low`: initialize with diff (which now
                            // includes this -1) so the low is truly inside.
                            diff_with_low = diff;
                            has_low = true;
                        }
                        diff = diff.max(0);
                    }
                    // else: neither char, both values unchanged
                    // Only the guaranteed-to-contain-low value is a legal
                    // variance candidate.
                    if has_low && diff_with_low > answer {
                        answer = diff_with_low;
                    }
                }
            }
        }
        answer
    }
}
