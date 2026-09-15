impl Solution {
    pub fn xor_after_queries(nums: Vec<i32>, queries: Vec<Vec<i32>>) -> i32 {
        const MOD: i64 = 1_000_000_007;
        // Fold every query into a scratch copy held in i64 cells: walk
        // the indices l, l + k, ... up to r, multiplying each visited
        // element modulo the prime. At most n positions per query keep
        // the total work at n * q.
        let mut values: Vec<i64> = nums.iter().map(|&value| value as i64).collect();
        for query in &queries {
            let (l, r) = (query[0] as usize, query[1] as usize);
            let k = query[2] as usize;
            let v = query[3] as i64;
            let mut idx = l;
            while idx <= r {
                // The product reaches ~10^14 before the first fold, so
                // the multiply happens in i64 even though results fit
                // i32.
                values[idx] = values[idx] * v % MOD;
                idx += k;
            }
        }
        // Every element ends below 2^30, so the XOR fits in i32.
        values.iter().fold(0, |acc, &value| acc ^ (value as i32))
    }
}
