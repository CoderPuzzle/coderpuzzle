impl Solution {
    pub fn find_max_val(n: i32, mut restrictions: Vec<Vec<i32>>, diff: Vec<i32>) -> i32 {
        let n = n as usize;
        const INF: i64 = i64::MAX;

        // Upper bound per position from left-propagated caps and
        // restrictions. Position 0 carries the sequence's own anchor:
        // a[0] = 0, so no value can exceed what diff allows away from it.
        let mut cap = vec![INF; n];
        cap[0] = 0;
        restrictions.sort_unstable();
        for restriction in &restrictions {
            let (idx, max_val) = (restriction[0] as usize, restriction[1] as i64);
            if max_val < cap[idx] {
                cap[idx] = max_val;
            }
        }
        for i in 1..n {
            if cap[i - 1] + (diff[i - 1] as i64) < cap[i] {
                cap[i] = cap[i - 1] + diff[i - 1] as i64;
            }
        }

        // Right pass mirrors it: a tight bound at j also caps every
        // position i < j to cap[j] + sum(diff[i..j-1]).
        for i in (0..n - 1).rev() {
            if cap[i + 1] + (diff[i] as i64) < cap[i] {
                cap[i] = cap[i + 1] + diff[i] as i64;
            }
        }

        // The optimal sequence attains every bound simultaneously, so the
        // largest value in it is the largest bound.
        let mut answer = 0_i64;
        for &bound in &cap {
            if bound > answer {
                answer = bound;
            }
        }
        answer as i32
    }
}
