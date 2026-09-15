impl Solution {
    // Vertical and horizontal movement never interact, so the plane
    // splits into two independent lines: the U/D balance and the L/R
    // balance. One sweep with two counters captures all there is to
    // check.
    pub fn judge_circle(moves: String) -> bool {
        let mut vertical = 0i32;
        let mut horizontal = 0i32;
        for &ch in moves.as_bytes() {
            match ch {
                b'U' => vertical += 1,
                b'D' => vertical -= 1,
                b'L' => horizontal -= 1,
                _ => horizontal += 1,
            }
        }
        // The robot is home exactly when both counters cancel to zero; a
        // leftover on either axis leaves it displaced no matter how the
        // moves were ordered.
        vertical == 0 && horizontal == 0
    }
}
