impl Solution {
    pub fn construct_distanced_sequence(n: i32) -> Vec<i32> {
        // The target holds 1 once and every i >= 2 twice, exactly i apart.
        // Filling the first empty cell left to right while trying values n
        // down to 1 attempts prefixes in decreasing lexicographic
        // preference: a value is abandoned only when no valid completion
        // extends it, so the first complete sequence found is the
        // lexicographically largest.
        let n = n as usize;
        let length = 2 * n - 1;
        let mut result = vec![0i32; length];
        let mut used = vec![false; n + 1];
        Self::fill(&mut result, &mut used, n, 0);
        result
    }

    fn fill(result: &mut [i32], used: &mut [bool], n: usize, pos: usize) -> bool {
        if pos == result.len() {
            return true;
        }
        if result[pos] != 0 {
            return Self::fill(result, used, n, pos + 1);
        }
        for value in (1..=n).rev() {
            if used[value] {
                continue;
            }
            if value == 1 {
                result[pos] = 1;
                used[1] = true;
                if Self::fill(result, used, n, pos + 1) {
                    return true;
                }
                used[1] = false;
                result[pos] = 0;
            } else if pos + value < result.len() && result[pos + value] == 0 {
                result[pos] = value as i32;
                result[pos + value] = value as i32;
                used[value] = true;
                if Self::fill(result, used, n, pos + 1) {
                    return true;
                }
                used[value] = false;
                result[pos] = 0;
                result[pos + value] = 0;
            }
        }
        false
    }
}
