use std::collections::HashMap;

impl Solution {
    pub fn get_sum(nums: Vec<i32>) -> i32 {
        // Per-value chain-sum DP over four hash maps keyed by value. For
        // each direction, inc_cnt/dec_cnt count the chains seen so far that
        // end at an element of a value and inc_sum/dec_sum carry their total
        // element-sum; buckets accumulate across duplicate occurrences, so
        // element x extends every earlier chain ending at x-1 (or x+1) —
        // subsequence semantics, not substring. New chains ending here have
        // count cnt + 1 (the singleton [x]) and sum sum + cnt * x + x; the
        // singleton lives in both directions but is counted once, so the
        // step contributes inc_sum' + dec_sum' - x. Reduced mod 10^9 + 7
        // every update: stored values < 10^9 + 7, widest intermediate is
        // cnt * x + sum < ~1.1 * 10^14, within i64.
        const MOD: i64 = 1_000_000_007;
        let mut inc_cnt: HashMap<i32, i64> = HashMap::new();
        let mut inc_sum: HashMap<i32, i64> = HashMap::new();
        let mut dec_cnt: HashMap<i32, i64> = HashMap::new();
        let mut dec_sum: HashMap<i32, i64> = HashMap::new();
        let mut total: i64 = 0;
        for &x in &nums {
            let ci = *inc_cnt.get(&(x - 1)).unwrap_or(&0);
            let si = *inc_sum.get(&(x - 1)).unwrap_or(&0);
            let cd = *dec_cnt.get(&(x + 1)).unwrap_or(&0);
            let sd = *dec_sum.get(&(x + 1)).unwrap_or(&0);
            let ni = (ci + 1) % MOD;
            let nsi = (si + ni * x as i64) % MOD;
            let nd = (cd + 1) % MOD;
            let nsd = (sd + nd * x as i64) % MOD;
            total = ((total + nsi + nsd - x as i64) % MOD + MOD) % MOD;
            *inc_cnt.entry(x).or_insert(0) = (*inc_cnt.get(&x).unwrap_or(&0) + ni) % MOD;
            *inc_sum.entry(x).or_insert(0) = (*inc_sum.get(&x).unwrap_or(&0) + nsi) % MOD;
            *dec_cnt.entry(x).or_insert(0) = (*dec_cnt.get(&x).unwrap_or(&0) + nd) % MOD;
            *dec_sum.entry(x).or_insert(0) = (*dec_sum.get(&x).unwrap_or(&0) + nsd) % MOD;
        }
        total as i32
    }
}
