impl Solution {
    pub fn tree_queries(n: i32, edges: Vec<Vec<i32>>, queries: Vec<Vec<i32>>) -> Vec<i32> {
        let n = n as usize;
        let mut adj: Vec<Vec<(usize, i64)>> = vec![Vec::new(); n + 1];
        for e in &edges {
            let (u, v, w) = (e[0] as usize, e[1] as usize, e[2] as i64);
            adj[u].push((v, w));
            adj[v].push((u, w));
        }

        let mut parent = vec![0usize; n + 1];
        let mut up_w = vec![0i64; n + 1];
        let mut base = vec![0i64; n + 1];
        let mut tin = vec![0usize; n + 1];
        let mut tout = vec![0usize; n + 1];
        let mut timer = 0usize;
        // frames: (node, parent, weight to parent, state 0=enter / 1=exit)
        let mut stack: Vec<(usize, usize, i64, u8)> = vec![(1, 0, 0, 0)];
        while let Some((u, p, w, state)) = stack.pop() {
            if state == 0 {
                parent[u] = p;
                up_w[u] = w;
                if p != 0 {
                    base[u] = base[p] + w;
                }
                timer += 1;
                tin[u] = timer;
                stack.push((u, p, w, 1));
                for &(v, ww) in adj[u].iter().rev() {
                    if v != p {
                        stack.push((v, u, ww, 0));
                    }
                }
            } else {
                tout[u] = timer;
            }
        }

        let size = n + 2;
        let mut bit = vec![0i64; size + 1];
        let mut answer: Vec<i32> = Vec::new();
        for query in &queries {
            if query[0] == 2 {
                let x = query[1] as usize;
                let mut s = 0i64;
                let mut i = tin[x];
                while i > 0 {
                    s += bit[i];
                    i -= i & i.wrapping_neg();
                }
                answer.push((base[x] + s) as i32);
            } else {
                let (u, v, wp) = (query[1] as usize, query[2] as usize, query[3] as i64);
                let child = if parent[u] == v { u } else { v };
                let delta = wp - up_w[child];
                up_w[child] = wp;
                let mut i = tin[child];
                while i <= size {
                    bit[i] += delta;
                    i += i & i.wrapping_neg();
                }
                let mut i = tout[child] + 1;
                while i <= size {
                    bit[i] -= delta;
                    i += i & i.wrapping_neg();
                }
            }
        }
        answer
    }
}
