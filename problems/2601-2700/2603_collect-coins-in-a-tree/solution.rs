use std::collections::HashSet;

impl Solution {
    pub fn collect_the_coins(coins: Vec<i32>, edges: Vec<Vec<i32>>) -> i32 {
        let n = coins.len();
        let mut adj: Vec<HashSet<usize>> = vec![HashSet::new(); n];
        for e in &edges {
            let a = e[0] as usize;
            let b = e[1] as usize;
            adj[a].insert(b);
            adj[b].insert(a);
        }

        // Phase 1: repeatedly remove leaves that carry no coin.
        let mut leaves: Vec<usize> = (0..n).filter(|&i| adj[i].len() == 1 && coins[i] == 0).collect();
        while !leaves.is_empty() {
            let mut nxt: Vec<usize> = Vec::new();
            for u in leaves {
                if let Some(&v) = adj[u].iter().next() {
                    adj[v].remove(&u);
                    if adj[v].len() == 1 && coins[v] == 0 {
                        nxt.push(v);
                    }
                }
                adj[u].clear();
            }
            leaves = nxt;
        }

        // Phase 2: drop two more layers of leaves (distance-2 collection).
        for _ in 0..2 {
            leaves = (0..n).filter(|&i| adj[i].len() == 1).collect();
            for u in leaves {
                if let Some(&v) = adj[u].iter().next() {
                    adj[v].remove(&u);
                }
                adj[u].clear();
            }
        }

        let remaining = adj.iter().filter(|s| !s.is_empty()).count() as i64;
        let ans = (remaining - 1) * 2;
        if ans < 0 {
            0
        } else {
            ans as i32
        }
    }
}
