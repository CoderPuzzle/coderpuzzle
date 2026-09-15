use std::collections::HashMap;

struct St {
    m: HashMap<i32, i64>,
    a: i64,
    b: i64,
}

impl Solution {
    pub fn interaction_costs(n: i32, edges: Vec<Vec<i32>>, group: Vec<i32>) -> i64 {
        let n = n as usize;
        let mut adj: Vec<Vec<usize>> = vec![Vec::new(); n];
        for e in &edges {
            let u = e[0] as usize;
            let v = e[1] as usize;
            adj[u].push(v);
            adj[v].push(u);
        }

        // Breadth-first order from the root; parents discovered on the way.
        let mut parent: Vec<i32> = vec![-1; n];
        let mut order: Vec<usize> = Vec::with_capacity(n);
        order.push(0);
        let mut head = 0;
        while head < order.len() {
            let node = order[head];
            head += 1;
            for &nxt in &adj[node] {
                if nxt as i32 != parent[node] {
                    parent[nxt] = node as i32;
                    order.push(nxt);
                }
            }
        }

        // Global size of each group label.
        let mut k = vec![0_i64; n + 1];
        for &g in &group {
            k[g as usize] += 1;
        }

        // Each subtree state carries its group-count map plus
        // A = sum k[g]*cnt[g] and B = sum cnt[g]^2.
        let mut states: Vec<Option<St>> = (0..n).map(|_| None).collect();
        let mut ans = 0_i64;
        for i in (0..n).rev() {
            let v = order[i];
            let pv = parent[v];

            let mut best_len = 0_usize;
            let mut best_c: usize = usize::MAX;
            for &c in &adj[v] {
                if c as i32 != pv {
                    if let Some(st) = &states[c] {
                        if st.m.len() > best_len {
                            best_len = st.m.len();
                            best_c = c;
                        }
                    }
                }
            }

            let (mut m, mut a, mut b) = if best_c != usize::MAX {
                let St { m, a, b } = states[best_c].take().unwrap();
                (m, a, b)
            } else {
                (HashMap::new(), 0_i64, 0_i64)
            };

            let g = group[v];
            let old_self = m.entry(g).or_insert(0);
            *old_self += 1;
            a += k[g as usize];
            b += 2 * (*old_self - 1) + 1;

            for &c in &adj[v] {
                if c as i32 == pv || c == best_c {
                    continue;
                }
                if let Some(st) = states[c].take() {
                    for (gg, cc) in st.m {
                        let old = *m.entry(gg).or_insert(0);
                        a += k[gg as usize] * cc;
                        b += 2 * old * cc + cc * cc;
                        m.insert(gg, old + cc);
                    }
                }
            }

            if v != 0 {
                // The edge above v carries sum of cnt*(k-cnt) = a - b.
                ans += a - b;
            }
            states[v] = Some(St { m, a, b });
        }
        ans
    }
}
