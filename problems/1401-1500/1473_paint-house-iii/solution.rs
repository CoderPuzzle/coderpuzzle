impl Solution {
    pub fn min_cost(houses: Vec<i32>, cost: Vec<Vec<i32>>, m: i32, n: i32, target: i32) -> i32 {
        let m = m as usize;
        let n = n as usize;
        let target = target as usize;
        let inf = i64::MAX / 4;
        let mut dp = vec![vec![inf; target + 1]; n + 1];
        if houses[0] != 0 {
            dp[houses[0] as usize][1] = 0;
        } else {
            for j in 1..=n {
                dp[j][1] = cost[0][j - 1] as i64;
            }
        }
        for i in 1..m {
            let mut ndp = vec![vec![inf; target + 1]; n + 1];
            for j in 1..=n {
                if houses[i] != 0 && houses[i] != j as i32 {
                    continue;
                }
                let cj = if houses[i] != 0 { 0 } else { cost[i][j - 1] as i64 };
                for pj in 1..=n {
                    for k in 1..=target {
                        if dp[pj][k] >= inf {
                            continue;
                        }
                        let nk = if pj == j { k } else { k + 1 };
                        if nk <= target && dp[pj][k] + cj < ndp[j][nk] {
                            ndp[j][nk] = dp[pj][k] + cj;
                        }
                    }
                }
            }
            dp = ndp;
        }
        let best = (1..=n).map(|j| dp[j][target]).min().unwrap();
        if best >= inf {
            -1
        } else {
            best as i32
        }
    }
}
