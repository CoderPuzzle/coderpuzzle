impl Solution {
    pub fn mice_and_cheese(reward1: Vec<i32>, reward2: Vec<i32>, k: i32) -> i32 {
        // Start from the second mouse eating everything, then hand k cheeses
        // to the first mouse. Swapping cheese i changes the total by
        // reward1[i] - reward2[i], so the k swaps with the largest gains are
        // optimal — gains may be negative when forced, and taking the top k
        // regardless is exactly what "exactly k" demands.
        let mut gains: Vec<i64> = reward1.iter().zip(&reward2).map(|(a, b)| (a - b) as i64).collect();
        let total: i64 = reward2.iter().map(|&v| v as i64).sum();
        gains.sort_unstable_by(|a, b| b.cmp(a));
        let taken: i64 = gains.iter().take(k as usize).sum();
        (total + taken) as i32
    }
}
