impl Solution {
    pub fn people_aware_of_secret(n: i32, delay: i32, forget: i32) -> i32 {
        const MOD: i64 = 1_000_000_007;
        let n = n as usize;
        let delay = delay as usize;
        let forget = forget as usize;
        // know[d] = number of people who first learn the secret on day d;
        // day 1 seeds the whole cascade
        let mut know = vec![0i64; n + 1];
        know[1] = 1;
        for day in 2..=n {
            // sharers still active on `day` are those who learned on some d
            // with d + delay <= day <= d + forget - 1; both window endpoints
            // advance by one per day — saturating_sub keeps the clamp at day 1
            let lo = day.saturating_sub(forget - 1).max(1);
            let hi = day.saturating_sub(delay);
            let mut total = 0i64;
            for d in lo..=hi {
                total += know[d];
            }
            know[day] = total % MOD;
        }
        // aware at the end of day n = learned within the last forget - 1
        // days; earlier learners have forgotten
        let mut answer = 0i64;
        for d in (n + 1).saturating_sub(forget)..=n {
            answer += know[d];
        }
        (answer % MOD) as i32
    }
}
