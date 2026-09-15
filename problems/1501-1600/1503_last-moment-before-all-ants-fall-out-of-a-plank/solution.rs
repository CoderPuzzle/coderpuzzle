impl Solution {
    pub fn get_last_moment(n: i32, left: Vec<i32>, right: Vec<i32>) -> i32 {
        // Two ants bouncing off each other is indistinguishable from passing
        // through while swapping identities; the plank empties at a time that
        // depends only on positions, so collisions can be ignored.
        let mut best = 0;
        // A left-mover at position p needs p seconds to reach 0.
        for &position in &left {
            best = best.max(position);
        }
        // A right-mover at p needs n - p seconds to reach n.
        for &position in &right {
            best = best.max(n - position);
        }
        best
    }
}
