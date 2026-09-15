impl Solution {
    // nums[i] and both targets are at most 1e5 < 2^17, and XOR never widens
    // a value, so every prefix XOR and every bucket key p ^ target stays
    // below 2^17. Counts are reduced modulo 1e9 + 7 at every bucket write,
    // so each stored count is below 1e9 + 7 and any pre-reduction sum below
    // 2^31; the buckets are i64 anyway.
    pub fn alternating_xor(nums: Vec<i32>, target1: i32, target2: i32) -> i32 {
        const MOD: i64 = 1_000_000_007;
        // ends_t1[v] / ends_t2[v]: counts of valid partitions of a processed
        // prefix whose last block XORs to target1 / target2, over positions
        // with prefix XOR v. Position 0 pre-loads the empty start on the
        // target2 side, ready to open a target1 block.
        let mut ends_t1 = vec![0i64; 1 << 17];
        let mut ends_t2 = vec![0i64; 1 << 17];
        ends_t2[0] = 1;
        let mut p: i32 = 0;
        let (mut cur_t1, mut cur_t2) = (0i64, 0i64);
        for &x in &nums {
            // A target1 block ending here opens after a position whose
            // prefix XOR is p ^ target1, carrying a partition that ended on
            // target2 (or the empty start); symmetrically for target2.
            p ^= x;
            cur_t1 = ends_t2[(p ^ target1) as usize];
            cur_t2 = ends_t1[(p ^ target2) as usize];
            ends_t1[p as usize] = (ends_t1[p as usize] + cur_t1) % MOD;
            ends_t2[p as usize] = (ends_t2[p as usize] + cur_t2) % MOD;
        }
        // The alternation may stop after a target1 or a target2 block.
        ((cur_t1 + cur_t2) % MOD) as i32
    }
}
