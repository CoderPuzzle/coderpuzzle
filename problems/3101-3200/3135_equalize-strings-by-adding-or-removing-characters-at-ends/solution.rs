impl Solution {
    pub fn min_operations(initial: String, target: String) -> i32 {
        // Characters that survive form a contiguous window of initial and a
        // contiguous window of target, i.e. a common substring; every other
        // character costs exactly one operation, so the answer is
        // m + n - 2 * (longest common substring).
        let t = target.as_bytes();
        let mut best = 0usize;
        let mut prev = vec![0usize; t.len() + 1];
        for &a in initial.as_bytes() {
            let mut cur = vec![0usize; t.len() + 1];
            for (j, &b) in t.iter().enumerate() {
                if a == b {
                    cur[j + 1] = prev[j] + 1;
                    if cur[j + 1] > best {
                        best = cur[j + 1];
                    }
                }
            }
            prev = cur;
        }
        ((initial.len() + target.len()) - 2 * best) as i32
    }
}
