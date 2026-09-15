impl Solution {
    pub fn number_ways(hats: Vec<Vec<i32>>) -> i32 {
        const MOD: i64 = 1_000_000_007;
        let n = hats.len();
        let full = (1usize << n) - 1;
        let mut h2p: Vec<Vec<usize>> = vec![Vec::new(); 41];
        for (p, prefs) in hats.iter().enumerate() {
            for &h in prefs {
                h2p[h as usize].push(p);
            }
        }
        // dp[mask]: ways to hat exactly the people in mask using hats so far
        // (<=10 people -> 1024 states; hats fold into the loop dimension)
        let mut dp = vec![0i64; full + 1];
        dp[0] = 1;
        for h in 1..=40usize {
            let people = &h2p[h];
            if people.is_empty() {
                continue;
            }
            // copy encodes leaving this hat unused; updating into the copy
            // (reading old dp) also ensures no hat is worn by two people
            let mut ndp = dp.clone();
            for mask in 0..=full {
                let v = dp[mask];
                if v == 0 {
                    continue;
                }
                for &p in people {
                    let bit = 1usize << p;
                    if mask & bit == 0 {
                        let nm = mask | bit;
                        ndp[nm] = (ndp[nm] + v) % MOD;
                    }
                }
            }
            dp = ndp;
        }
        // full mask: every person hatted; unused hats cost nothing
        dp[full] as i32
    }
}
