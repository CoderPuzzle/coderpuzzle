impl Solution {
    pub fn minimum_sum(n: i32, k: i32) -> i32 {
        let below = if k / 2 < n { k / 2 } else { n };
        let above = n - below;
        below * (below + 1) / 2 + above * k + above * (above - 1) / 2
    }
}
