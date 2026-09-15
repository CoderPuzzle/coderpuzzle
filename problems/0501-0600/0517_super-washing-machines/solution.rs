impl Solution {
    pub fn find_min_moves(machines: Vec<i32>) -> i32 {
        // A move passes dresses around but creates none, so equalizing first
        // requires total % n == 0. Afterwards the answer is the largest of
        // two one-per-move bottlenecks: the net dresses forced across any
        // one boundary, and any single machine's excess — a machine gives
        // away one dress per move even when both neighbors are short.
        //
        // The total reaches n * 10^5 = 10^9, well past i32 headroom, so the
        // sweep runs in i64; only the answer (at most 2.5 * 10^8) comes
        // back down.
        let count = machines.len() as i64;
        let total: i64 = machines.iter().map(|&dresses| dresses as i64).sum();
        if total % count != 0 {
            return -1;
        }
        let average = total / count;
        let mut moves = 0i64;
        let mut crossing = 0i64;
        for &dresses in &machines {
            // `crossing` is the traffic the boundary on this machine's right
            // must carry: the left block's surplus, forced in any schedule.
            let excess = dresses as i64 - average;
            crossing += excess;
            moves = moves.max(crossing.abs()).max(excess);
        }
        moves as i32
    }
}
