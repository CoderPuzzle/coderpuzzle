const INF: i32 = 1_000_000;

impl Solution {
    pub fn connect_two_groups(cost: Vec<Vec<i32>>) -> i32 {
        let size1 = cost.len();
        let size2 = cost[0].len();
        let full = 1usize << size2;

        // min_to_reach[j]: cheapest single edge that reaches second-group
        // point j from ANY first-group point, used to force coverage of
        // whichever second-group points the forward pass leaves untouched.
        let mut min_to_reach = vec![INF; size2];
        for j in 0..size2 {
            for i in 0..size1 {
                if cost[i][j] < min_to_reach[j] {
                    min_to_reach[j] = cost[i][j];
                }
            }
        }

        // dp[mask]: cheapest way to finish connecting everything once the
        // first-group points placed so far have reached exactly `mask`.
        let mut dp = vec![0i32; full];
        for mask in 0..full {
            let mut total = 0;
            for j in 0..size2 {
                if (mask >> j) & 1 == 0 {
                    total += min_to_reach[j];
                }
            }
            dp[mask] = total;
        }

        for i in (0..size1).rev() {
            let mut next = vec![INF; full];
            for mask in 0..full {
                let mut best = INF;
                for j in 0..size2 {
                    let candidate = cost[i][j] + dp[mask | (1 << j)];
                    if candidate < best {
                        best = candidate;
                    }
                }
                next[mask] = best;
            }
            dp = next;
        }

        dp[0]
    }
}
