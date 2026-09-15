impl Solution {
    pub fn minimum_total_price(n: i32, edges: Vec<Vec<i32>>, price: Vec<i32>, trips: Vec<Vec<i32>>) -> i32 {
        let n = n as usize;
        let mut adj: Vec<Vec<usize>> = vec![Vec::new(); n];
        for e in &edges {
            let a = e[0] as usize;
            let b = e[1] as usize;
            adj[a].push(b);
            adj[b].push(a);
        }

        let mut freq = vec![0i64; n];
        for t in &trips {
            let start = t[0] as usize;
            let end = t[1] as usize;
            let mut parent = vec![-1i64; n];
            let mut visited = vec![false; n];
            let mut stack = vec![start];
            visited[start] = true;
            while let Some(v) = stack.pop() {
                if v == end {
                    break;
                }
                for &u in &adj[v] {
                    if !visited[u] {
                        visited[u] = true;
                        parent[u] = v as i64;
                        stack.push(u);
                    }
                }
            }
            let mut cur = end as i64;
            while cur != -1 {
                freq[cur as usize] += 1;
                if cur as usize == start {
                    break;
                }
                cur = parent[cur as usize];
            }
        }

        fn dfs(v: usize, p: i64, adj: &Vec<Vec<usize>>, price: &Vec<i32>, freq: &Vec<i64>) -> (i64, i64) {
            let pv = price[v] as i64;
            let mut dp0 = pv * freq[v];
            let mut dp1 = (pv / 2) * freq[v];
            for &u in &adj[v] {
                if u as i64 == p {
                    continue;
                }
                let (c0, c1) = dfs(u, v as i64, adj, price, freq);
                dp0 += c0.min(c1);
                dp1 += c0;
            }
            (dp0, dp1)
        }

        let (a, b) = dfs(0, -1, &adj, &price, &freq);
        a.min(b) as i32
    }
}
