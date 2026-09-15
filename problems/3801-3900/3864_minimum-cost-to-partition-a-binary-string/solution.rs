impl Solution {
    pub fn min_cost(s: String, enc_cost: i32, flat_cost: i32) -> i64 {
        // A segment's cost depends only on its length L and its count X of
        // ones: flatCost when X == 0, otherwise L * X * encCost. Because an
        // even segment may be split into two equal halves, the best value of
        // a segment is the cheaper of stopping here or paying for both
        // halves. The halves are disjoint intervals, so a plain recursion
        // visits each reachable segment exactly once and is O(n).
        let s = s.as_bytes();
        let n = s.len();
        let mut prefix = vec![0usize; n + 1];
        for i in 0..n {
            prefix[i + 1] = prefix[i] + if s[i] == b'1' { 1 } else { 0 };
        }
        fn solve(prefix: &[usize], enc_cost: i32, flat_cost: i32, l: usize, length: usize) -> i64 {
            let x = prefix[l + length] - prefix[l];
            let mut best = if x == 0 {
                flat_cost as i64
            } else {
                length as i64 * x as i64 * enc_cost as i64
            };
            if length % 2 == 0 {
                let half = length / 2;
                let split =
                    solve(prefix, enc_cost, flat_cost, l, half) + solve(prefix, enc_cost, flat_cost, l + half, half);
                if split < best {
                    best = split;
                }
            }
            best
        }
        solve(&prefix, enc_cost, flat_cost, 0, n)
    }
}
