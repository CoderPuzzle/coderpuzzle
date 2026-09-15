impl Solution {
    pub fn max_output(n: i32, edges: Vec<Vec<i32>>, price: Vec<i32>) -> i64 {
        let n = n as usize;
        if n == 1 {
            return 0;
        }
        let mut adj: Vec<Vec<usize>> = vec![Vec::new(); n];
        for e in &edges {
            let a = e[0] as usize;
            let b = e[1] as usize;
            adj[a].push(b);
            adj[b].push(a);
        }

        // Root at 0 once: BFS fixes parents and a top-down visit order,
        // so every later pass walks flat arrays and nothing recurses.
        let mut parent = vec![-1i32; n];
        let mut order: Vec<usize> = Vec::with_capacity(n);
        order.push(0);
        let mut head = 0;
        while head < order.len() {
            let u = order[head];
            head += 1;
            for &v in &adj[u] {
                if parent[v] == -1 && v != 0 {
                    parent[v] = u as i32;
                    order.push(v);
                }
            }
        }

        // d[v]: best price sum of an "arm", a vertical path starting at
        // v and descending into v's subtree. t1/t2/t1src remember the
        // best two child arms per node so the downward pass can hand each
        // child its "best arm excluding your own branch" value. Path sums
        // reach n * max(price) = 10^10, beyond i32 range, hence i64.
        let mut d = vec![0i64; n];
        let mut t1 = vec![0i64; n];
        let mut t2 = vec![0i64; n];
        let mut up = vec![0i64; n];
        let mut t1src = vec![-1i32; n];
        for i in (0..n).rev() {
            let v = order[i];
            d[v] = price[v] as i64 + t1[v];
            let p = parent[v];
            if p >= 0 {
                let p = p as usize;
                if d[v] > t1[p] {
                    t2[p] = t1[p];
                    t1[p] = d[v];
                    t1src[p] = v as i32;
                } else if d[v] > t2[p] {
                    t2[p] = d[v];
                }
            }
        }

        // Rerooting. The minimum path at any root is always the lone root,
        // which cancels against its own price inside every arm sum, so the
        // asked difference is exactly the largest arm leaving each node:
        // either straight down into a child subtree (t1) or climbing out
        // through the parent (up).
        let mut ans = t1[0];
        for i in 1..n {
            let v = order[i];
            let p = parent[v] as usize;
            let others = if t1src[p] == v as i32 { t2[p] } else { t1[p] };
            up[v] = price[p] as i64 + others.max(up[p]);
            ans = ans.max(t1[v]).max(up[v]);
        }
        ans
    }
}
