impl Solution {
    pub fn min_eating_speed(piles: Vec<i32>, h: i32) -> i32 {
        // Pile p costs ceil(p / k) hours; hours(k) only shrinks as k
        // grows, so feasibility is a threshold. Ceil via (p + k - 1)
        // / k with i64 math: the total can reach 10^4 * 10^9.
        let hours_needed = |k: i64| -> i64 { piles.iter().map(|&p| (p as i64 + k - 1) / k).sum() };
        // Range [1, max(piles)]: the max speed empties any pile in a
        // single hour, and h >= piles.len() makes it always feasible.
        let mut lo = 1i64;
        let mut hi = *piles.iter().max().unwrap() as i64;
        while lo < hi {
            let mid = lo + (hi - lo) / 2;
            // Lower-bound bisection: feasible means the answer is mid
            // or smaller; infeasible raises lo. Exiting, lo is the
            // smallest feasible speed.
            if hours_needed(mid) <= h as i64 {
                hi = mid;
            } else {
                lo = mid + 1;
            }
        }
        lo as i32
    }
}
