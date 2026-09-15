impl Solution {
    pub fn num_trees(n: i32) -> i32 {
        // g[k] counts the BSTs on k ordered values. Picking value root as the
        // root leaves root - 1 smaller values for the left subtree and
        // k - root larger ones for the right; the two shape counts are
        // independent, so g[k] = sum over root of g[root-1] * g[k-root].
        let n = n as usize;
        let mut g = vec![0i32; n + 1];
        g[0] = 1;
        for nodes in 1..=n {
            for root in 1..=nodes {
                g[nodes] += g[root - 1] * g[nodes - root];
            }
        }
        g[n]
    }
}
