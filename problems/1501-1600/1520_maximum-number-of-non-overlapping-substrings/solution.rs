impl Solution {
    pub fn max_num_of_substrings(s: String) -> Vec<String> {
        let bytes = s.as_bytes();
        let n = bytes.len();
        let mut first = [usize::MAX; 26];
        let mut last = [usize::MAX; 26];
        for (i, &b) in bytes.iter().enumerate() {
            let c = (b - b'a') as usize;
            if first[c] == usize::MAX {
                first[c] = i;
            }
            last[c] = i;
        }

        // Anchor a candidate at every position that is the first occurrence
        // of its character, then push `end` out to cover every character
        // met along the way. The expansion is a fixed point: it stops the
        // moment nothing inside [start, end] demands more room.
        let mut candidates: Vec<(usize, usize)> = Vec::new();
        for i in 0..n {
            let c0 = (bytes[i] - b'a') as usize;
            if first[c0] != i {
                continue;
            }
            let start = i;
            let mut end = last[c0];
            let mut valid = true;
            let mut j = start;
            while j <= end {
                let c = (bytes[j] - b'a') as usize;
                if first[c] < start {
                    // This character escapes to the left of the anchor, so
                    // no substring starting at `i` can ever be valid.
                    valid = false;
                    break;
                }
                if last[c] > end {
                    end = last[c];
                }
                j += 1;
            }
            if valid {
                candidates.push((start, end));
            }
        }

        // Classic activity-selection greedy: earliest-ending candidate
        // first, ties broken by length so a shorter, nested candidate is
        // preferred over the longer one that contains it.
        candidates.sort_by_key(|&(start, end)| (end, end - start));

        let mut result = Vec::new();
        let mut prev_end: i64 = -1;
        for (start, end) in candidates {
            if start as i64 > prev_end {
                result.push(s[start..=end].to_string());
                prev_end = end as i64;
            }
        }
        result
    }
}
