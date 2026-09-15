impl Solution {
    pub fn sum_of_good_subsequences(nums: Vec<i32>) -> i32 {
        const MOD: i64 = 1_000_000_007;
        // offset by 1 so that value 0 can look up value -1 at index 0
        // cnt[i] / sm[i]: number of, and total element sum of, the good
        // subsequences seen so far that end in value i-1. The differ-by-one
        // constraint only involves the last value, so this is enough state.
        let mut cnt = vec![0i64; 100003];
        let mut sm = vec![0i64; 100003];
        let mut total: i64 = 0;
        for &x in &nums {
            let idx = (x + 1) as usize;
            // New subsequences ending at x: the singleton plus every recorded
            // subsequence ending in x-1 or x+1 extended by x.
            let c_prev = cnt[idx - 1];
            let c_next = cnt[idx + 1];
            let s_prev = sm[idx - 1];
            let s_next = sm[idx + 1];
            let new_cnt = (1 + c_prev + c_next) % MOD;
            // Each of the new_cnt subsequences gains one copy of x; the
            // elements already inside carry their sums forward.
            let new_sum = (x as i64 * new_cnt + s_prev + s_next) % MOD;
            cnt[idx] = (cnt[idx] + new_cnt) % MOD;
            sm[idx] = (sm[idx] + new_sum) % MOD;
            // A subsequence's sum is folded in when its last element is
            // appended, so every good subsequence is counted exactly once.
            total = (total + new_sum) % MOD;
        }
        total as i32
    }
}
