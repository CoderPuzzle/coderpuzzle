impl Solution {
    pub fn min_flips(s: String) -> i32 {
        const INF: i32 = 1_000_000_000;
        let mut dp = [[INF; 3]; 3];
        dp[0][0] = 0;
        let p1 = b"011";
        let p2 = b"110";
        let bytes = s.as_bytes();
        for &c in bytes {
            let mut next = [[INF; 3]; 3];
            for a in 0..3 {
                for b in 0..3 {
                    if dp[a][b] == INF {
                        continue;
                    }
                    for &put in b"01" {
                        let total = dp[a][b] + if put != c { 1 } else { 0 };
                        let na = if put == p1[a] { a + 1 } else { a };
                        let nb = if put == p2[b] { b + 1 } else { b };
                        if na == 3 || nb == 3 {
                            continue;
                        }
                        next[na][nb] = next[na][nb].min(total);
                    }
                }
            }
            dp = next;
        }

        let mut answer = INF;
        for a in 0..3 {
            for b in 0..3 {
                answer = answer.min(dp[a][b]);
            }
        }
        answer
    }
}
