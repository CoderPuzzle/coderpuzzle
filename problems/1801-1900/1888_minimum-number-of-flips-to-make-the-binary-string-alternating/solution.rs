impl Solution {
    pub fn min_flips(s: String) -> i32 {
        let bytes = s.as_bytes();
        let n = bytes.len();
        // pre[i] = mismatches of the doubled string's first i chars
        // against the absolute pattern 0,1,0,1,...
        let total = 2 * n;
        let mut pre = vec![0i32; total + 1];
        for i in 0..total {
            let ch = bytes[i % n];
            let want = b'0' + ((i & 1) as u8);
            let mismatch = if ch != want { 1 } else { 0 };
            pre[i + 1] = pre[i] + mismatch;
        }
        let mut best = n as i32;
        for k in 0..n {
            let abs_mismatch = pre[k + n] - pre[k];
            let cost_a = if k & 1 == 1 {
                n as i32 - abs_mismatch
            } else {
                abs_mismatch
            };
            best = best.min(cost_a).min(n as i32 - cost_a);
        }
        best
    }
}
