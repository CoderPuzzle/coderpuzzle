impl Solution {
    pub fn valid_sequence(word1: String, word2: String) -> Vec<i32> {
        // last[j] anchors where word2[j:] is still exactly embeddable: one
        // right-to-left sweep matches the tail of word2 against word1 and
        // records, per slot, the index that consumed its character. The
        // forward walk then takes every exact match immediately and spends
        // the single allowed change only when the guard proves the rest of
        // word2 still fits exactly after it (last slot, or i before
        // last[j + 1]); a change already spent forbids further mismatches.
        let w1: Vec<char> = word1.chars().collect();
        let w2: Vec<char> = word2.chars().collect();
        let m = w2.len();
        let mut ans = vec![0i32; m];
        let mut last = vec![-1i64; m];
        let mut i: i64 = w1.len() as i64 - 1;
        let mut j: i64 = m as i64 - 1;
        while i >= 0 && j >= 0 {
            if w1[i as usize] == w2[j as usize] {
                last[j as usize] = i;
                j -= 1;
            }
            i -= 1;
        }
        let mut can_change = true;
        j = 0;
        let mut filled = 0usize;
        for i in 0..w1.len() as i64 {
            if filled == m {
                break;
            }
            if w1[i as usize] == w2[j as usize] {
                ans[filled] = i as i32;
                filled += 1;
                j += 1;
            } else if can_change && (j == m as i64 - 1 || i < last[(j + 1) as usize]) {
                can_change = false;
                ans[filled] = i as i32;
                filled += 1;
                j += 1;
            }
        }
        if filled == m {
            ans
        } else {
            Vec::new()
        }
    }
}
