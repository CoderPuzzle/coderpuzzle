impl Solution {
    pub fn count_effective(nums: Vec<i32>) -> i32 {
        // A removal strictly decreases the OR exactly when it takes away
        // every element carrying at least one set bit of the total. For a
        // non-empty bit set S, the subsequences removing all occurrences of
        // every bit in S are counted by 2^free(S), where free(S) is the
        // number of elements carrying no bit of S (they alone are optional).
        // Inclusion-exclusion over S turns those counts into the number of
        // subsequences killing at least one bit.
        const MOD: i64 = 1_000_000_007;
        let n = nums.len();
        let mut total = 0i32;
        for &x in &nums {
            total |= x;
        }
        // At most 20 bits live under 10^6; compress them to low positions.
        let bits: Vec<usize> = (0..20).filter(|&b| (total >> b) & 1 == 1).collect();
        let k = bits.len();
        let full = (1usize << k) - 1;
        // g[m] = how many elements compress to mask m; then h[m] = how many
        // compress to a SUBSET of m, so h[full ^ S] = free(S). Standard
        // sum-over-subsets: push each count down to its submasks. All
        // values stay inside i64 range under the modulus.
        let mut h = vec![0i64; 1 << k];
        for &x in &nums {
            let mut m = 0usize;
            for (i, &b) in bits.iter().enumerate() {
                if (x >> b) & 1 == 1 {
                    m |= 1 << i;
                }
            }
            h[m] += 1;
        }
        for b in 0..k {
            let bit = 1usize << b;
            let step = bit << 1;
            let mut base = 0;
            while base < 1 << k {
                for i in base..base + bit {
                    h[i + bit] = (h[i + bit] + h[i]) % MOD;
                }
                base += step;
            }
        }
        let mut pw = vec![1i64; n + 1];
        for i in 1..=n {
            pw[i] = pw[i - 1] * 2 % MOD;
        }
        let mut ans = 0i64;
        for s in 1..(1usize << k) {
            let mut term = pw[h[full ^ s] as usize];
            if s.count_ones() % 2 == 0 {
                term = MOD - term;
            }
            ans = (ans + term) % MOD;
        }
        (ans % MOD) as i32
    }
}
