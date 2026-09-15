impl Solution {
    // A balanced permutation is decided by how many copies of each
    // digit land on even indices: a_d of the cnt[d] copies, with
    // sum(a_d) = ceil(n/2) and sum(d * a_d) = total / 2 (the
    // odd-index sum is then implied by the total), each choice
    // contributing C(cnt[d], a_d). A bottom-up DP over digits with
    // states (even slots used, even-index sum) accumulates those
    // binomial products. Arranging the two chosen multisets over the
    // even and odd slots multiplies by even_count! * odd_count! /
    // cnt[d]!, folded in via one modular inverse at the end. All
    // arithmetic is modulo 1e9 + 7 in i64s (products < 2^63),
    // iterative — no recursion.
    pub fn count_balanced_permutations(num: String) -> i32 {
        const MOD: i64 = 1_000_000_007;
        let n = num.len();
        let mut cnt = [0usize; 10];
        for b in num.bytes() {
            cnt[(b - b'0') as usize] += 1;
        }
        let total: usize = (0..10).map(|d| d * cnt[d]).sum();
        if total % 2 != 0 {
            return 0;
        }
        let even_count = (n + 1) / 2;
        let half = total / 2;
        let mut binom = vec![vec![0i64; n + 1]; n + 1];
        for i in 0..=n {
            binom[i][0] = 1;
            for j in 1..=i {
                binom[i][j] = (binom[i - 1][j - 1] + binom[i - 1][j]) % MOD;
            }
        }
        let mut dp = vec![vec![0i64; half + 1]; even_count + 1];
        dp[0][0] = 1;
        for d in 0..10 {
            let c = cnt[d];
            if c == 0 {
                continue;
            }
            let mut ndp = vec![vec![0i64; half + 1]; even_count + 1];
            for k in 0..=even_count {
                for s in 0..=half {
                    let v = dp[k][s];
                    if v == 0 {
                        continue;
                    }
                    let mut j = 0;
                    while j <= c && k + j <= even_count && s + d * j <= half {
                        ndp[k + j][s + d * j] = (ndp[k + j][s + d * j] + v * binom[c][j]) % MOD;
                        j += 1;
                    }
                }
            }
            dp = ndp;
        }
        let mut fact = vec![1i64; n + 1];
        for i in 1..=n {
            fact[i] = fact[i - 1] * i as i64 % MOD;
        }
        let slot_ways = fact[even_count] * fact[n - even_count] % MOD;
        let mut denom = 1i64;
        for &c in cnt.iter() {
            denom = denom * fact[c] % MOD;
        }
        let mut inv = 1i64;
        let mut base = denom;
        let mut exp = MOD - 2;
        while exp > 0 {
            if exp & 1 == 1 {
                inv = inv * base % MOD;
            }
            base = base * base % MOD;
            exp >>= 1;
        }
        (dp[even_count][half] * slot_ways % MOD * inv % MOD) as i32
    }
}
