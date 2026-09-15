impl Solution {
    pub fn number_of_ways(n: i32, limit: Vec<i32>) -> i64 {
        const MOD: i64 = 1_000_000_007;
        let n = n as i64;
        let m = limit.len() as i64;
        let mut a = limit;
        a.sort_unstable();
        // num_ge(t): colors whose limit reaches t — m minus the sorted
        // caps strictly below t. The i == j diagonal of a split needs one
        // cap to cover max(x, n - x).
        let num_ge = |t: i64| -> i64 { m - a.partition_point(|&v| (v as i64) < t) as i64 };
        // Ways for one split length x: ordered pairs of distinct colors
        // whose caps cover x and n - x. Never exceeds m^2, exact in i64.
        let ways = |x: i64| -> i64 { num_ge(x) * num_ge(n - x) - num_ge(x.max(n - x)) };
        // Breakpoints of the step function: x crossing 1, n, the max()
        // switch ceil(n / 2), L + 1 or n - L flips one num_ge term; one
        // representative per run, scaled by the run length, covers every
        // split in 1..n-1.
        let mut points: Vec<i64> = Vec::with_capacity(a.len() * 2 + 3);
        points.push(1);
        points.push(n);
        points.push((n + 1) / 2);
        for &cap in &a {
            for candidate in [cap as i64 + 1, n - cap as i64] {
                if (1..=n).contains(&candidate) {
                    points.push(candidate);
                }
            }
        }
        points.sort_unstable();
        points.dedup();
        let mut total: i64 = 0;
        for pair in points.windows(2) {
            let run = pair[1] - pair[0];
            total = (total + ways(pair[0]) % MOD * run) % MOD;
        }
        total
    }
}
