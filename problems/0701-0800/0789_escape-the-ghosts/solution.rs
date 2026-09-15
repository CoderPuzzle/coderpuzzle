impl Solution {
    pub fn escape_ghosts(ghosts: Vec<Vec<i32>>, target: Vec<i32>) -> bool {
        // Everyone covers one unit per turn on an empty grid, so travel
        // times are Manhattan distances: the runner needs |target| turns,
        // ghost i needs |ghosts[i] - target| turns to camp the target. A
        // ghost no farther than the runner gets there first (or together)
        // and waits — not an escape. A strictly farther ghost cannot even
        // meet the runner on a beeline: the runner is d - t from the
        // target at turn t, so the triangle inequality would place that
        // ghost within d of the target after all.
        let mine = target[0].abs() + target[1].abs();
        for ghost in &ghosts {
            let theirs = (ghost[0] - target[0]).abs() + (ghost[1] - target[1]).abs();
            if theirs <= mine {
                return false;
            }
        }
        true
    }
}
