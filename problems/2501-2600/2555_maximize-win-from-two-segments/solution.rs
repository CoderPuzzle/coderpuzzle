impl Solution {
    pub fn maximize_win(prize_positions: Vec<i32>, k: i32) -> i32 {
        // Sliding windows in each direction build the best single
        // k-window inside every index prefix and suffix; the answer
        // maximizes their sum over all split points. Counts stay
        // <= n <= 10^5, inside i32.
        let pp = &prize_positions;
        let n = pp.len();
        let mut pre = vec![0i32; n + 1];
        let mut s = 0usize;
        let mut mx = 0i32;
        for t in 0..n {
            while pp[t] - pp[s] > k {
                s += 1;
            }
            mx = mx.max((t - s + 1) as i32);
            pre[t + 1] = mx;
        }
        let mut suf = vec![0i32; n + 1];
        let mut g = n - 1;
        let mut mx = 0i32;
        for e in (0..n).rev() {
            while pp[g] - pp[e] > k {
                g -= 1;
            }
            mx = mx.max((g - e + 1) as i32);
            suf[e] = mx;
        }
        let mut ans = 0i32;
        for c in 0..=n {
            ans = ans.max(pre[c] + suf[c]);
        }
        ans
    }
}
