impl Solution {
    pub fn max_removals(source: String, pattern: String, target_indices: Vec<i32>) -> i32 {
        // Walk source once keeping, for every prefix length k of pattern,
        // the most removals achievable with k characters already matched.
        // Every position carries each state over unchanged (the character
        // can always be kept unused), adds one when the position is a
        // removable target that gets deleted, and moves state k to k + 1
        // when the character equals pattern[k]. Unreachable states sit at
        // NEG, whose drift stays far below zero across the whole scan.
        const NEG: i32 = -(1 << 30);
        let source = source.as_bytes();
        let pattern = pattern.as_bytes();
        let n = source.len();
        let m = pattern.len();
        let mut removable = vec![false; n];
        for &idx in &target_indices {
            removable[idx as usize] = true;
        }
        let mut prev = vec![NEG; m + 1];
        let mut cur = vec![NEG; m + 1];
        prev[0] = 0;
        for i in 0..n {
            for k in 0..=m {
                let mut best = prev[k];
                if removable[i] {
                    best = prev[k] + 1;
                }
                if k > 0 && source[i] == pattern[k - 1] && prev[k - 1] > best {
                    best = prev[k - 1];
                }
                cur[k] = best;
            }
            std::mem::swap(&mut prev, &mut cur);
        }
        prev[m]
    }
}
