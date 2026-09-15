impl Solution {
    pub fn max_score_words(words: Vec<String>, letters: Vec<String>, score: Vec<i32>) -> i32 {
        // 26-entry count of the letter pool
        let mut available = [0i32; 26];
        for s in &letters {
            available[s.as_bytes()[0] as usize - b'a' as usize] += 1;
        }
        // precompute each word's letter-requirement vector and total score so
        // the recursion works on counts only (n <= 14 makes 2^n fine)
        let n = words.len();
        let mut needs = vec![[0i32; 26]; n];
        let mut values = vec![0i32; n];
        for (i, w) in words.iter().enumerate() {
            for &b in w.as_bytes() {
                let j = (b - b'a') as usize;
                needs[i][j] += 1;
                values[i] += score[j];
            }
        }

        let mut best = 0;
        fn dfs(needs: &[[i32; 26]], values: &[i32], i: usize, remaining: [i32; 26], total: i32, best: &mut i32) {
            // every node is already a complete valid selection (the rest can
            // be skipped), so compare best here rather than only at leaves
            if total > *best {
                *best = total;
            }
            if i == needs.len() {
                return;
            }
            // branch 1: always explore skipping word i
            dfs(needs, values, i + 1, remaining, total, best);
            // branch 2: take word i only when the pool covers it; an
            // infeasible word simply prunes that subtree
            let need = needs[i];
            let mut ok = true;
            for j in 0..26 {
                if remaining[j] < need[j] {
                    ok = false;
                    break;
                }
            }
            if ok {
                let mut next = remaining;
                for j in 0..26 {
                    next[j] -= need[j];
                }
                dfs(needs, values, i + 1, next, total + values[i], best);
            }
        }
        dfs(&needs, &values, 0, available, 0, &mut best);
        best
    }
}
