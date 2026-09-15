impl Solution {
    pub fn maximum_score(a: i32, b: i32, c: i32) -> i32 {
        // With x <= y <= z the answer is min(x + y, total / 2): the
        // smaller piles limit how often the big one can be paired, and
        // each move spends exactly two stones.
        let mut v = [a, b, c];
        v.sort_unstable();
        let (x, y, z) = (v[0], v[1], v[2]);
        if x + y <= z {
            x + y
        } else {
            (x + y + z) / 2
        }
    }
}
