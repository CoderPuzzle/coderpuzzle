impl Solution {
    pub fn max_consecutive(bottom: i32, top: i32, mut special: Vec<i32>) -> i32 {
        special.sort_unstable();
        let mut best = (special[0] - bottom).max(top - special[special.len() - 1]);
        for pair in special.windows(2) {
            best = best.max(pair[1] - pair[0] - 1);
        }
        best
    }
}
