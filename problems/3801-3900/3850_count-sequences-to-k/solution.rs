use std::collections::HashMap;

impl Solution {
    // Every element is 1..6, hence 5-smooth: val is always the rational
    // 2^a * 3^b * 5^c, and each action shifts the exponent triple by +e,
    // -e, or 0, where e is the element's own (2, 3, 5) split. A sequence
    // wins exactly when the final triple matches k's, so k keeping any
    // prime factor above 5 is an immediate 0. A triple packs into one key
    // ((a + 40) * 41 + b + 20) * 41 + (c + 20): |a| <= 2n <= 38 and
    // |b|, |c| <= n <= 19 keep the low digits inside a stride of 41, so
    // key +/- the element's packed step never borrows across digits.
    pub fn count_sequences(nums: Vec<i32>, k: i64) -> i32 {
        let primes = [2i64, 3, 5];
        let mut k = k;
        let mut t = [0i64; 3];
        for i in 0..3 {
            while k % primes[i] == 0 {
                k /= primes[i];
                t[i] += 1;
            }
        }
        if k != 1 {
            return 0;
        }
        let target = ((t[0] + 40) * 41 + (t[1] + 20)) * 41 + (t[2] + 20);
        let mut dp: HashMap<i64, i64> = HashMap::new();
        dp.insert((40 * 41 + 20) * 41 + 20, 1);
        for &v in &nums {
            let mut e = [0i64; 3];
            let mut w = v as i64;
            for i in 0..3 {
                while w % primes[i] == 0 {
                    w /= primes[i];
                    e[i] += 1;
                }
            }
            let step = (e[0] * 41 + e[1]) * 41 + e[2];
            let mut ndp: HashMap<i64, i64> = HashMap::with_capacity(dp.len() * 3);
            for (&key, &wt) in &dp {
                // multiply by v, leave val alone, divide by v
                for nk in [key + step, key, key - step] {
                    *ndp.entry(nk).or_insert(0) += wt;
                }
            }
            dp = ndp;
        }
        // Every count is bounded by the total sequence count
        // 3^19 = 1,162,261,467, inside 32 bits; accumulators run in i64.
        dp.get(&target).copied().unwrap_or(0) as i32
    }
}
