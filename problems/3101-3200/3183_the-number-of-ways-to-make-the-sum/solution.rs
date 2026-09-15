impl Solution {
    pub fn number_of_ways(n: i32) -> i32 {
        // Count first with the unlimited coins {1, 2, 6}: once b six-coins
        // are set aside, the leftover r is filled freely by one- and
        // two-coins, which gives r / 2 + 1 arrangements per r. The value-4
        // coin exists exactly twice, so its contribution is zero, one, or
        // two indistinguishable copies, each leaving a smaller target for
        // the same count. Exact totals pass a billion, so accumulate in
        // i64 and fold the modulus once at the end.
        const MODULO: i64 = 1_000_000_007;
        let mut total: i64 = 0;
        for fours in [0i64, 4, 8] {
            let mut rest = n as i64 - fours;
            while rest >= 0 {
                total += rest / 2 + 1;
                rest -= 6;
            }
        }
        (total % MODULO) as i32
    }
}
