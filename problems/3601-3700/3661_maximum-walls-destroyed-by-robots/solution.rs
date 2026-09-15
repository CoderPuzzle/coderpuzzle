impl Solution {
    pub fn max_walls(robots: Vec<i32>, distance: Vec<i32>, walls: Vec<i32>) -> i32 {
        // Sort robots by position (carrying each range along) and sort the
        // wall positions once: every reachable set below is then counted
        // with two binary searches instead of a scan. Interval ends reach
        // 1e9 + 1e5 — inside i32, but the arithmetic below runs in i64 so
        // nothing depends on that headroom.
        let mut bots: Vec<(i64, i64)> = robots
            .iter()
            .zip(distance.iter())
            .map(|(&p, &d)| (p as i64, d as i64))
            .collect();
        bots.sort();
        let mut walls: Vec<i64> = walls.iter().map(|&w| w as i64).collect();
        walls.sort();
        // How many walls lie in the closed interval [lo, hi].
        let count = |lo: i64, hi: i64| -> i64 {
            if lo > hi {
                return 0;
            }
            (walls.partition_point(|&w| w < hi + 1) - walls.partition_point(|&w| w < lo)) as i64
        };
        // Firing left the bullet stops at the previous robot; a wall on the
        // blocker's position survives (only the blocker itself can destroy
        // it).
        let left_lo = |i: usize| -> i64 {
            let (pos, rng) = bots[i];
            let mut lo = pos - rng;
            if i > 0 {
                lo = lo.max(bots[i - 1].0 + 1);
            }
            lo
        };
        // Firing right the bullet stops at the next robot.
        let right_hi = |i: usize| -> i64 {
            let (pos, rng) = bots[i];
            let mut hi = pos + rng;
            if i + 1 < bots.len() {
                hi = hi.min(bots[i + 1].0 - 1);
            }
            hi
        };
        // prev_left / prev_right: best totals for the robots already decided
        // when the last of them fired left / right.
        let mut prev_left = count(left_lo(0), bots[0].0);
        let mut prev_right = count(bots[0].0, right_hi(0));
        for i in 1..bots.len() {
            let pos = bots[i].0;
            let here_left = count(left_lo(i), pos);
            let here_right = count(pos, right_hi(i));
            // Facing shots share the gap: when this robot fires left and the
            // previous one fired right, the walls both bullets reach were
            // already counted and must not count twice.
            let shared = count(left_lo(i), (bots[i - 1].0 + bots[i - 1].1).min(pos - 1));
            let best = prev_left.max(prev_right);
            prev_left = (prev_left + here_left).max(prev_right + here_left - shared);
            // A rightward shot can never overlap anything already decided.
            prev_right = best + here_right;
        }
        prev_left.max(prev_right) as i32
    }
}
