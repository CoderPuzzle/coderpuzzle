impl Solution {
    pub fn min_increments(n: i32, cost: Vec<i32>) -> i64 {
        // Walk heap indices from the deepest parent up to the root. At
        // each node the two child subtrees must end on a common maximum,
        // so their difference is charged once and the larger combined
        // maximum travels up. Charges accumulate past 2^31, hence the
        // i64 accumulator and return.
        let n = n as usize;
        let mut subtree: Vec<i64> = cost.iter().map(|&c| c as i64).collect();
        let mut total: i64 = 0;
        for node in (1..=n / 2).rev() {
            let left = subtree[2 * node - 1];
            let right = subtree[2 * node];
            total += (left - right).abs();
            subtree[node - 1] = left.max(right) + cost[node - 1] as i64;
        }
        total
    }
}
