use std::collections::HashMap;

impl Solution {
    // Residues are below 2^30, so products fit in i64 before the %.
    fn qpow(mut base: i64, mut exp: i64, m: i64) -> i64 {
        let mut result: i64 = 1;
        while exp > 0 {
            if exp & 1 == 1 {
                result = result * base % m;
            }
            base = base * base % m;
            exp >>= 1;
        }
        result
    }

    pub fn max_frequency_score(nums: Vec<i32>, k: i32) -> i32 {
        // Sliding window maintaining the score as the sum of per-value
        // power terms; a slide replaces only the entering and leaving
        // values' terms, which is O(log MOD) per step. The +MOD
        // re-normalizes after each potentially negative subtraction.
        const MOD: i64 = 1_000_000_007;
        let mut counts: HashMap<i32, i64> = HashMap::new();
        let mut terms: HashMap<i32, i64> = HashMap::new();
        let (mut score, mut best): (i64, i64) = (0, 0);
        for i in 0..nums.len() {
            let value = nums[i];
            *counts.entry(value).or_insert(0) += 1;
            let c = counts[&value];
            let term = Self::qpow(value as i64, c, MOD);
            score = (score + term - *terms.get(&value).unwrap_or(&0) + MOD) % MOD;
            terms.insert(value, term);
            if i >= k as usize {
                let leaving = nums[i - k as usize];
                let lc = {
                    let e = counts.get_mut(&leaving).unwrap();
                    *e -= 1;
                    *e
                };
                if lc == 0 {
                    // the leaving value exits entirely; its term vanishes
                    score = (score - terms[&leaving] + MOD) % MOD;
                    terms.remove(&leaving);
                } else {
                    let lt = Self::qpow(leaving as i64, lc, MOD);
                    score = (score + lt - terms[&leaving] + MOD) % MOD;
                    terms.insert(leaving, lt);
                }
            }
            if i >= k as usize - 1 && score > best {
                best = score;
            }
        }
        best as i32
    }
}
