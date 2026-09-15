impl Solution {
    pub fn simple_graph_exists(mut degrees: Vec<i32>) -> bool {
        degrees.sort_unstable_by(|a, b| b.cmp(a));
        let n = degrees.len();
        let mut pre = vec![0i64; n + 1];
        for i in 0..n {
            pre[i + 1] = pre[i] + i64::from(degrees[i]);
        }
        let total = pre[n];
        // An odd degree sum can never pair up into edges.
        if total % 2 != 0 {
            return false;
        }
        // big tracks how many entries still exceed k; it only moves left.
        let mut big = n;
        for k in 0..=n as i64 {
            while big > 0 && i64::from(degrees[big - 1]) <= k {
                big -= 1;
            }
            let spared = k * (big as i64 - k).max(0) + total - pre[big.max(k as usize)];
            if pre[k as usize] > k * (k - 1) + spared {
                return false;
            }
        }
        true
    }
}
