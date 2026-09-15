impl Solution {
    pub fn number_of_good_subarray_splits(nums: Vec<i32>) -> i32 {
        const MOD: i64 = 1_000_000_007;
        let mut answer: i64 = 0;
        let mut prev: i64 = -1; // index of the previous 1; -1 means none seen yet
        for (i, &value) in nums.iter().enumerate() {
            if value == 1 {
                if prev == -1 {
                    // First 1 found: the array is splittable, empty product = 1.
                    answer = 1;
                } else {
                    // residue * factor < (1e9+7) * 1e5 < 2^63 — exact in i64.
                    answer = answer * (i as i64 - prev) % MOD;
                }
                prev = i as i64;
            }
        }
        answer as i32
    }
}
