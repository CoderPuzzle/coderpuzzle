impl Solution {
    pub fn tallest_billboard(rods: Vec<i32>) -> i32 {
        // DP over the support-height difference. best[d] is the tallest left
        // support reachable with left - right == d; unreachable differences
        // hold -1. Each rod is welded left, welded right, or discarded.
        let total: usize = rods.iter().map(|&rod| rod as usize).sum();
        let span = 2 * total + 1;
        let mut best = vec![-1; span];
        // index d + total keeps every difference non-negative
        best[total] = 0;
        for &rod in &rods {
            let r = rod as usize;
            let mut nxt = vec![-1; span];
            for idx in 0..span {
                let left = best[idx];
                if left < 0 {
                    continue;
                }
                if left > nxt[idx] {
                    nxt[idx] = left; // discard the rod
                }
                if left + rod > nxt[idx + r] {
                    nxt[idx + r] = left + rod; // weld onto the left support
                }
                if left > nxt[idx - r] {
                    nxt[idx - r] = left; // weld onto the right support
                }
            }
            best = nxt;
        }
        // difference 0 means equal supports; its left height is the answer.
        best[total]
    }
}
