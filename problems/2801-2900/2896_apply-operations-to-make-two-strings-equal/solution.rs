impl Solution {
    pub fn min_operations(s1: String, s2: String, x: i32) -> i32 {
        // Only mismatched positions need a net flip, and both operations flip
        // exactly two positions, so an odd mismatch count is impossible.
        let a = s1.as_bytes();
        let b = s2.as_bytes();
        let diffs: Vec<usize> = (0..a.len()).filter(|&i| a[i] != b[i]).collect();
        let m = diffs.len();
        if m % 2 == 1 {
            return -1;
        }
        const INF: i64 = 1i64 << 40;
        // pending[i][c]: mismatches before i are resolved, mismatch i is not,
        // and c = 1 when an already-paid x-op covers one future mismatch for
        // free. The credit may stay open across other pairs — nesting an
        // x-pair around an adjacent chain is exactly what beats pairing
        // consecutive mismatches when x is small.
        let mut pending = vec![[INF, INF]; m + 1];
        pending[0][0] = 0;
        for i in 0..m {
            let free = pending[i][0];
            let credited = pending[i][1];
            // Close a credit: mismatch i flips free with the earlier partner.
            pending[i + 1][0] = pending[i + 1][0].min(credited);
            // Open a credit: pay x, mismatch i pairs with a later mismatch.
            pending[i + 1][1] = pending[i + 1][1].min(free + x as i64);
            if i + 2 <= m {
                let pair = (x as i64).min((diffs[i + 1] - diffs[i]) as i64);
                pending[i + 2][0] = pending[i + 2][0].min(free + pair);
                pending[i + 2][1] = pending[i + 2][1].min(credited + pair);
            }
        }
        pending[m][0] as i32
    }
}
