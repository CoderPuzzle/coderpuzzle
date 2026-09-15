impl Solution {
    pub fn count_interesting_subarrays(nums: Vec<i32>, modulo: i32, k: i32) -> i64 {
        let (m, kk) = (modulo as i64, k as i64);
        // Only whether nums[i] % modulo == k matters, so track pref: the
        // number of hits among the prefix. A subarray is interesting iff its
        // hit count has residue k — prefix-sum counting, applied to
        // residues. Seed residue 0 for the empty prefix so subarrays
        // starting at index 0 are counted.
        let mut count: std::collections::HashMap<i64, i64> = std::collections::HashMap::new();
        count.insert(0, 1);
        let mut pref: i64 = 0;
        let mut ans: i64 = 0;
        for &x in &nums {
            if (x as i64) % m == kk {
                pref += 1;
            }
            // Right endpoint at i pairs with every earlier boundary l where
            // pref[right] - pref[l] = k (mod modulo); rem_euclid keeps the
            // residue non-negative for map lookups.
            let need = (pref - kk).rem_euclid(m);
            ans += *count.get(&need).unwrap_or(&0);
            let key = pref % m;
            *count.entry(key).or_insert(0) += 1;
        }
        ans
    }
}
