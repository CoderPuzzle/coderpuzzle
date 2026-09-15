impl Solution {
    // A mask is feasible when m elements can each be raised, total
    // increments within k, to a value carrying every mask bit; deciding
    // bits from high to low and keeping every feasible bit yields the
    // maximum AND. Values are at most 1e9 and k at most 1e9, so every
    // raised value and the answer stay below 2^31 and i32 carries them;
    // one element's cost can still approach 2^31 and the m-cost sum 5e4 of
    // them (about 1.1e14), so costs and the sum are i64.
    pub fn maximum_and(nums: Vec<i32>, k: i32, m: i32) -> i32 {
        let mut res: i32 = 0;
        for b in (0..=30).rev() {
            let cand = res | (1 << b);
            let mut costs: Vec<i64> = vec![0; nums.len()];
            for (i, &num) in nums.iter().enumerate() {
                let missing = cand & !num;
                if missing == 0 {
                    continue;
                }
                // With h the highest missing bit, the cheapest target >=
                // num covering cand keeps num's bits above h, sets bit h,
                // and fills cand's bits below h.
                let h = 31 - missing.leading_zeros();
                let t = ((num >> (h + 1)) << (h + 1)) | (1 << h) | (cand & ((1 << h) - 1));
                costs[i] = (t - num) as i64;
            }
            // Raises on different indices are independent, so the m
            // cheapest per-element costs decide feasibility.
            costs.sort();
            let sum: i64 = costs.iter().take(m as usize).sum();
            if sum <= k as i64 {
                res = cand;
            }
        }
        res
    }
}
