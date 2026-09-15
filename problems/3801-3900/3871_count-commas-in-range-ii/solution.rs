impl Solution {
    pub fn count_commas(n: i64) -> i64 {
        // Numbers with d digits carry (d-1)/3 commas. Walk the comma groups
        // [1000, 999999], [10^6, 10^9 - 1], ...; every number in one group
        // carries the same comma count, so multiply the group size by that
        // count. n <= 10^15 keeps the answer below 4 * 10^15, and every
        // intermediate (lo up to 10^15) fits an i64.
        let mut total: i64 = 0;
        let mut lo: i64 = 1000;
        let mut commas: i64 = 1;
        while lo <= n {
            let mut hi = lo * 1000 - 1;
            if hi > n {
                hi = n;
            }
            total += commas * (hi - lo + 1);
            lo = hi + 1;
            commas += 1;
        }
        total
    }
}
