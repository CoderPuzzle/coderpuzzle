use std::cmp::Reverse;

impl Solution {
    pub fn max_points(technique1: Vec<i32>, technique2: Vec<i32>, k: i32) -> i64 {
        // Taking technique 1 everywhere satisfies any k, so start there and
        // switch tasks to technique 2 in descending order of the gain
        // technique2[i] - technique1[i], never exceeding n - k switches.
        // A switch only helps while its gain is positive; because gains
        // arrive largest-first, every prefix is the best use of that many
        // switches, so the answer is the running maximum over those totals.
        let mut total: i64 = technique1.iter().map(|&a| a as i64).sum();
        let mut best = total;
        let mut gains: Vec<Reverse<i64>> = technique1
            .iter()
            .zip(&technique2)
            .map(|(&a, &b)| Reverse((b as i64 - a as i64)))
            .collect();
        gains.sort_unstable();
        let budget = (technique1.len() as i32 - k) as usize;
        for &Reverse(gain) in gains.iter().take(budget) {
            if gain <= 0 {
                break;
            }
            total += gain;
            best = best.max(total);
        }
        best
    }
}
