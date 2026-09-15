use std::collections::HashSet;

impl Solution {
    pub fn root_count(edges: Vec<Vec<i32>>, guesses: Vec<Vec<i32>>, k: i32) -> i32 {
        let n = edges.len() + 1;
        let mut graph: Vec<Vec<usize>> = vec![Vec::new(); n];
        for e in &edges {
            let (a, b) = (e[0] as usize, e[1] as usize);
            graph[a].push(b);
            graph[b].push(a);
        }
        let key = |a: usize, b: usize| -> i64 { (a as i64) << 32 | (b as i64) & 0xFFFFFFFF };
        // Guess set of packed (parent, child) keys gives O(1) direction checks.
        let guess_set: HashSet<i64> = guesses.iter().map(|g| key(g[0] as usize, g[1] as usize)).collect();

        // Iterative DFS from root 0 records each node's parent and an order
        // where parents precede children — rerooting without recursion.
        let mut parent: Vec<i64> = vec![-1; n];
        let mut order: Vec<usize> = Vec::with_capacity(n);
        let mut visited = vec![false; n];
        let mut stack: Vec<usize> = vec![0];
        visited[0] = true;
        while let Some(u) = stack.pop() {
            order.push(u);
            for &v in &graph[u] {
                if !visited[v] {
                    visited[v] = true;
                    parent[v] = u as i64;
                    stack.push(v);
                }
            }
        }

        let mut cnt: Vec<i64> = vec![0; n];
        // Correct-guess count for root 0: one point per edge whose
        // (parent, child) direction was guessed.
        for v in 1..n {
            if guess_set.contains(&key(parent[v] as usize, v)) {
                cnt[0] += 1;
            }
        }

        let mut ans: i32 = if cnt[0] >= k as i64 { 1 } else { 0 };
        for &u in &order[1..] {
            // Moving the root across edge p -> u flips only that one edge:
            // guess (p, u) becomes wrong and reversed guess (u, p) becomes
            // right. Parents come first in `order`, so cnt[p] is final here.
            let p = parent[u] as usize;
            let mut c = cnt[p];
            if guess_set.contains(&key(p, u)) {
                c -= 1;
            }
            if guess_set.contains(&key(u, p)) {
                c += 1;
            }
            cnt[u] = c;
            if c >= k as i64 {
                ans += 1;
            }
        }
        ans
    }
}
