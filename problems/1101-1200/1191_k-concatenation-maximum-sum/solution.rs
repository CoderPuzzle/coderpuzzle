impl Solution {
    pub fn k_concatenation_max_sum(arr: Vec<i32>, k: i32) -> i32 {
        const MOD: i64 = 1_000_000_007;

        let kadane = |copies: usize| -> i64 {
            let mut best: i64 = 0;
            let mut current: i64 = 0;
            for _ in 0..copies {
                for &value in arr.iter() {
                    // clamped at 0: the empty subarray is always an option
                    current = (current + value as i64).max(0);
                    best = best.max(current);
                }
            }
            best
        };

        let max_prefix = || -> i64 {
            let mut best: i64 = 0;
            let mut current: i64 = 0;
            for &value in arr.iter() {
                current += value as i64;
                best = best.max(current);
            }
            best
        };

        let max_suffix = || -> i64 {
            let mut best: i64 = 0;
            let mut current: i64 = 0;
            for &value in arr.iter().rev() {
                current += value as i64;
                best = best.max(current);
            }
            best
        };

        let total: i64 = arr.iter().map(|&v| v as i64).sum();

        // the best subarray never needs more than two partial copies plus
        // whole copies in between, so Kadane over two copies plus prefix
        // and suffix sums cover every candidate
        if k == 1 {
            return (kadane(1) % MOD) as i32;
        }
        // two adjacent copies cover every boundary-hugging candidate
        let mut best = kadane(2);
        if k > 2 && total > 0 {
            // whole middle copies pay off only when total > 0: score the
            // best suffix + best prefix + (k - 2) full copies
            best = best.max(max_suffix() + max_prefix() + (k as i64 - 2) * total);
        }
        // reduce only at the end — residues no longer compare by magnitude
        (best % MOD) as i32
    }
}
