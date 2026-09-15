impl Solution {
    // The only cars that escape forever are the leading run of 'L's
    // (nothing ahead of them ever) and the trailing run of 'R's (nothing
    // behind them ever). Charge every collision to the moving car that
    // arrives at it: a head-on pair costs 2 and involves exactly two
    // movers, and a mover hitting a stationary car or a stopped pile
    // costs 1 and involves exactly one arriving mover — its first
    // collision. So each mover inside the trimmed span contributes
    // exactly 1 and stationary cars contribute nothing: the answer is
    // simply the count of non-'S' characters between the two escape
    // runs.
    pub fn count_collisions(directions: String) -> i32 {
        let bytes = directions.as_bytes();
        let n = bytes.len();
        let mut left = 0;
        while left < n && bytes[left] == b'L' {
            left += 1;
        }
        let mut right = n;
        while right > left && bytes[right - 1] == b'R' {
            right -= 1;
        }
        bytes[left..right].iter().filter(|&&b| b != b'S').count() as i32
    }
}
