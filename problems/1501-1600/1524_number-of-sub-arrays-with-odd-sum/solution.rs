impl Solution {
    pub fn num_of_subarrays(arr: Vec<i32>) -> i32 {
        // `even`/`odd` count prefixes seen so far (including the empty
        // prefix before the array) with even/odd parity; a new odd-parity
        // prefix pairs with every earlier even prefix to make an odd-sum
        // subarray, and symmetrically for a new even-parity prefix. `total`
        // is i64 so the running sum never overflows before the mod is
        // applied.
        const MOD: i64 = 1_000_000_007;
        let mut even: i64 = 1;
        let mut odd: i64 = 0;
        let mut parity = 0;
        let mut total: i64 = 0;
        for x in arr {
            parity ^= x & 1;
            if parity == 1 {
                total = (total + even) % MOD;
                odd += 1;
            } else {
                total = (total + odd) % MOD;
                even += 1;
            }
        }
        total as i32
    }
}
