impl Solution {
    pub fn min_edge_reversals(n: i32, edges: Vec<Vec<i32>>) -> Vec<i32> {
        let n = n as usize;
        let mut graph: Vec<Vec<(usize, i32)>> = vec![Vec::new(); n];
        for e in &edges {
            let u = e[0] as usize;
            let v = e[1] as usize;
            graph[u].push((v, 0)); // traversing u -> v costs 0
            graph[v].push((u, 1)); // traversing v -> u costs 1 (reversal)
        }
        let mut parent: Vec<i32> = vec![-1; n];
        let mut order: Vec<usize> = Vec::with_capacity(n);
        order.push(0);
        let mut i = 0;
        while i < order.len() {
            let x = order[i];
            for &(y, _) in &graph[x] {
                if y as i32 != parent[x] {
                    parent[y] = x as i32;
                    order.push(y);
                }
            }
            i += 1;
        }

        let mut dp = vec![0i32; n];
        for idx in (0..n).rev() {
            let x = order[idx];
            for &(y, cost) in &graph[x] {
                if parent[y] == x as i32 {
                    dp[x] += dp[y] + cost;
                }
            }
        }

        let mut ans = vec![0i32; n];
        ans[0] = dp[0];
        for &x in &order {
            for &(y, cost) in &graph[x] {
                if parent[y] == x as i32 {
                    ans[y] = ans[x] + if cost == 0 { 1 } else { -1 };
                }
            }
        }
        ans
    }
}
