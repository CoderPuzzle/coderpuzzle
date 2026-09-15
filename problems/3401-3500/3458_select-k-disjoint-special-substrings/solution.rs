impl Solution {
    pub fn max_substring_length(s: String, k: i32) -> bool {
        let s = s.as_bytes();
        let n = s.len();
        let mut first = [usize::MAX; 26];
        let mut last = [0usize; 26];
        for (i, &b) in s.iter().enumerate() {
            let c = (b - b'a') as usize;
            if first[c] == usize::MAX {
                first[c] = i;
            }
            last[c] = i;
        }
        let mut intervals: Vec<(usize, usize)> = Vec::new();
        // Every special substring starts at the first occurrence of its
        // first letter — any earlier repeat would sit outside it — so at
        // most 26 candidate starts exist.
        for c in 0..26 {
            if first[c] == usize::MAX {
                continue;
            }
            let a = first[c];
            // Grow the window right until it covers every occurrence of
            // every character inside it; a character leaking left of the
            // start invalidates this start entirely.
            let mut far = last[c];
            let mut ok = true;
            let mut j = a;
            while j <= far {
                let x = (s[j] - b'a') as usize;
                if first[x] < a {
                    ok = false;
                    break;
                }
                if last[x] > far {
                    far = last[x];
                }
                j += 1;
            }
            // The whole string itself is not a valid selection.
            if ok && (a > 0 || far < n - 1) {
                intervals.push((a, far));
            }
        }
        // Classic activity selection: taking earliest ends leaves the most
        // room for further disjoint picks.
        intervals.sort_by_key(|iv| iv.1);
        let mut count = 0i32;
        let mut end: isize = -1;
        for &(a, b) in &intervals {
            if a as isize > end {
                count += 1;
                end = b as isize;
            }
        }
        count >= k
    }
}
