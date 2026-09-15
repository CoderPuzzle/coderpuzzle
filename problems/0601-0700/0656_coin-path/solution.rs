impl Solution {
    pub fn cheapest_jump(coins: Vec<i32>, maxJump: i32) -> Vec<i32> {
        // Suffix costs, built right to left: cost[i] is the cheapest total
        // for the rest of the walk when standing on i, coins[i] included,
        // while UNREACHABLE marks blocked or stranded cells and is never
        // added to. Scanning the window i+1..i+maxJump in increasing index
        // order and replacing the best only on a strict improvement leaves
        // next[i] at the SMALLEST index achieving the minimum continuation,
        // so the lexicographic tie rule is stored in the table itself.
        const UNREACHABLE: i32 = 101 * 1000 + 1;
        let n = coins.len();
        let mut cost = vec![UNREACHABLE; n];
        let mut next = vec![-1; n];
        if coins[n - 1] != -1 {
            cost[n - 1] = coins[n - 1];
        }
        for i in (0..n.saturating_sub(1)).rev() {
            if coins[i] == -1 {
                continue;
            }
            let limit = (i + maxJump as usize).min(n - 1);
            let mut best = UNREACHABLE;
            let mut best_from: i32 = -1;
            for j in i + 1..=limit {
                if cost[j] < best {
                    best = cost[j];
                    best_from = j as i32;
                }
            }
            if best_from != -1 {
                cost[i] = coins[i] + best;
                next[i] = best_from;
            }
        }
        // The walk from index 1 follows next[] and is the lexicographically
        // smallest minimum-cost path: at every divergence between two
        // equal-cost optimal paths the smaller next index wins outright,
        // whatever the remaining suffixes do.
        let mut path = Vec::new();
        if cost[0] != UNREACHABLE {
            let mut i = 0;
            while i != -1 {
                path.push(i + 1);
                i = next[i as usize];
            }
        }
        path
    }
}
