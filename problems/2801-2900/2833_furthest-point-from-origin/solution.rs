impl Solution {
    // Only the split between the fixed moves matters: each 'L' steps
    // -1 and each 'R' +1, so together they settle at the offset
    // left - right. Every '_' is free to become either character, and
    // spending all of them on one side dominates any mixed assignment
    // — a mixture only lets some of them cancel out against the rest.
    // The furthest point is therefore |left - right| + wilds, reached
    // by rewriting every '_' as whichever fixed character already
    // leads; ties choose either side at no cost.
    pub fn furthest_distance_from_origin(moves: String) -> i32 {
        let mut left = 0i32;
        let mut right = 0i32;
        let mut wilds = 0i32;
        for &b in moves.as_bytes() {
            match b {
                b'L' => left += 1,
                b'R' => right += 1,
                _ => wilds += 1,
            }
        }
        (left - right).abs() + wilds
    }
}
