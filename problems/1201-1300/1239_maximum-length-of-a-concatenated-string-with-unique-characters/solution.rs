impl Solution {
    pub fn max_length(arr: Vec<String>) -> i32 {
        let n = arr.len();
        // A concatenation is fully described by which of the 26 letters it
        // holds, so each string becomes a bitmask; a self-repeating string
        // (mask -1) can never join a valid combination and is skipped later.
        let mut masks = Vec::with_capacity(n);
        for s in &arr {
            let mut mask: i32 = 0;
            let mut bad = false;
            for ch in s.bytes() {
                let bit = 1 << (ch - b'a');
                if mask & bit != 0 {
                    bad = true;
                    break;
                }
                mask |= bit;
            }
            masks.push(if bad { -1 } else { mask });
        }

        let mut best = 0;
        fn dfs(masks: &[i32], index: usize, used: i32, best: &mut i32) {
            // The combination length is just the popcount of its mask.
            let total = used.count_ones() as i32;
            if total > *best {
                *best = total;
            }
            // The start index only moves forward: each subsequence is tried
            // once in index order (length is order-independent). Compatible
            // strings are exactly those whose mask ANDs with `used` to zero.
            for j in index..masks.len() {
                if masks[j] != -1 && used & masks[j] == 0 {
                    dfs(masks, j + 1, used | masks[j], best);
                }
            }
        }
        dfs(&masks, 0, 0, &mut best);
        best
    }
}
