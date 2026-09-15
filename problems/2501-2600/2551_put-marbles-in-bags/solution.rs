impl Solution {
    pub fn put_marbles(weights: Vec<i32>, k: i32) -> i64 {
        // One bag means no cuts — a correctness guard, not an optimization:
        // the general formula's indexing does not describe the k = 1 case.
        if k == 1 {
            return 0;
        }
        // Each bag costs the sum of its endpoints, and weights[0] +
        // weights[n-1] appear in every distribution's score, so they cancel
        // in the max-minus-min difference. Only the k-1 internal cuts matter:
        // cutting between i and i+1 adds weights[i] + weights[i+1].
        let n = weights.len();
        let mut adj: Vec<i64> = Vec::with_capacity(n - 1);
        for i in 0..n - 1 {
            adj.push(weights[i] as i64 + weights[i + 1] as i64);
        }
        adj.sort_unstable();
        // Max score takes the m largest cut sums, min the m smallest; their
        // difference is the answer.
        let m = (k - 1) as usize;
        let mut ans: i64 = 0;
        for i in 0..m {
            ans += adj[n - 2 - i] - adj[i];
        }
        ans
    }
}
