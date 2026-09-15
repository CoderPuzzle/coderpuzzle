impl Solution {
    pub fn first_day_been_in_all_rooms(next_visit: Vec<i32>) -> i32 {
        const MOD: i64 = 1_000_000_007;
        let n = next_visit.len();
        // f[i] = day room i is first visited; f[0] = 0 anchors the recurrence.
        let mut f = vec![0i64; n];
        for i in 1..n {
            // Thrown from i-1 back to j = next_visit[i-1], rooms 0..i-2 are
            // all even again — the exact state of day f[j]+1 — so the
            // deterministic replay costs f[i-1]-f[j]-1 days; add the first
            // visit of i-1 and the step into i for 2*f[i-1] - f[j] + 2.
            // rem_euclid keeps the modular day non-negative after the subtraction.
            let t = 2 * f[i - 1] - f[next_visit[i - 1] as usize] + 2;
            f[i] = t.rem_euclid(MOD);
        }
        f[n - 1] as i32
    }
}
