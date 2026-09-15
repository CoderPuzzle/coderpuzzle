impl Solution {
    pub fn distinct_sequences(n: i32) -> i32 {
        const MOD: i64 = 1_000_000_007;
        fn gcd(mut a: usize, mut b: usize) -> usize {
            while b != 0 {
                let t = a % b;
                a = b;
                b = t;
            }
            a
        }
        if n == 1 {
            return 6;
        }
        // dp[a][b] counts valid sequences ending in ..., a, b; the gap rule
        // looks back exactly two positions, so nothing older matters
        let mut dp = [[0i64; 7]; 7];
        // base: length-2 sequences, one per ordered coprime pair with a != b
        for a in 1..=6 {
            for b in 1..=6 {
                if a != b && gcd(a, b) == 1 {
                    dp[a][b] = 1;
                }
            }
        }
        for _ in 3..=n {
            let mut ndp = [[0i64; 7]; 7];
            for a in 1..=6 {
                for b in 1..=6 {
                    let cnt = dp[a][b];
                    // coprime pairs are sparse: skipping dead states prunes
                    // most of the 36-entry table
                    if cnt == 0 {
                        continue;
                    }
                    for c in 1..=6 {
                        // c != b: no adjacent equal (coprimality alone misses
                        // (1,1)); c != a: no repeat at distance 2 (gcd would
                        // not object when a = 1)
                        if c != a && c != b && gcd(c, b) == 1 {
                            // ..., a, b, c ends in (b, c)
                            ndp[b][c] = (ndp[b][c] + cnt) % MOD;
                        }
                    }
                }
            }
            dp = ndp;
        }
        // every entry is the ending of one full length-n sequence
        let mut total = 0i64;
        for a in 1..=6 {
            for b in 1..=6 {
                total = (total + dp[a][b]) % MOD;
            }
        }
        total as i32
    }
}
