impl Solution {
    pub fn min_cost(s: String, t: String, rules: Vec<Vec<String>>, costs: Vec<i32>) -> i32 {
        let (s, t) = (s.as_bytes(), t.as_bytes());
        let n = s.len();
        let mut dp = vec![1_000_000_000; n + 1];
        dp[0] = 0;
        for i in 0..n {
            if dp[i] == 1_000_000_000 {
                continue;
            }
            if s[i] == t[i] {
                dp[i + 1] = dp[i + 1].min(dp[i])
            }
            for (q, r) in rules.iter().enumerate() {
                let (p, rep) = (r[0].as_bytes(), r[1].as_bytes());
                let z = p.len();
                if i + z > n || &t[i..i + z] != rep {
                    continue;
                }
                let mut ok = true;
                let mut stars = 0;
                for j in 0..z {
                    if p[j] == b'*' {
                        stars += 1
                    } else if p[j] != s[i + j] {
                        ok = false
                    }
                }
                if ok {
                    dp[i + z] = dp[i + z].min(dp[i] + costs[q] + stars)
                }
            }
        }
        if dp[n] == 1_000_000_000 {
            -1
        } else {
            dp[n]
        }
    }
}
