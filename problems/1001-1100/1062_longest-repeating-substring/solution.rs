impl Solution {
    pub fn longest_repeating_substring(s: String) -> i32 {
        let s = s.as_bytes();
        let n = s.len();

        // Exact check: every length-`length` window goes into a set, so a hit
        // means two identical substrings (overlaps allowed) — no hashing
        // caveats.
        let has_repeat = |length: usize| -> bool {
            if length == 0 {
                return true;
            }
            let mut seen: std::collections::HashSet<&[u8]> = std::collections::HashSet::new();
            for i in 0..=(n - length) {
                let piece = &s[i..i + length];
                if !seen.insert(piece) {
                    return true;
                }
            }
            false
        };

        // Monotone feasibility: a repeat of length L implies repeats of every
        // shorter length, so binary search the largest feasible length. The
        // upper-mid convention keeps the loop terminating; hi starts at n-1
        // because the whole string cannot repeat within itself.
        let mut lo: usize = 0;
        let mut hi: usize = n.saturating_sub(1);
        while lo < hi {
            let mid = lo + (hi - lo + 1) / 2;
            if has_repeat(mid) {
                lo = mid;
            } else {
                hi = mid - 1;
            }
        }
        lo as i32
    }
}
