use std::collections::{HashSet, VecDeque};

impl Solution {
    pub fn min_runes_to_add(n: i32, crystals: Vec<i32>, flow_from: Vec<i32>, flow_to: Vec<i32>) -> i32 {
        let n = n as usize;
        let mut graph: Vec<Vec<usize>> = vec![Vec::new(); n];
        let mut rgraph: Vec<Vec<usize>> = vec![Vec::new(); n];
        for e in 0..flow_from.len() {
            let u = flow_from[e] as usize;
            let v = flow_to[e] as usize;
            graph[u].push(v);
            rgraph[v].push(u);
        }

        // Kosaraju SCC (iterative)
        let mut visited = vec![false; n];
        let mut order: Vec<usize> = Vec::with_capacity(n);
        for s in 0..n {
            if visited[s] {
                continue;
            }
            visited[s] = true;
            let mut stack: Vec<(usize, usize)> = vec![(s, 0)];
            while let Some(top) = stack.last_mut() {
                let u = top.0;
                if top.1 < graph[u].len() {
                    let v = graph[u][top.1];
                    top.1 += 1;
                    if !visited[v] {
                        visited[v] = true;
                        stack.push((v, 0));
                    }
                } else {
                    order.push(u);
                    stack.pop();
                }
            }
        }

        let mut comp = vec![usize::MAX; n];
        let mut cid: usize = 0;
        for &s in order.iter().rev() {
            if comp[s] != usize::MAX {
                continue;
            }
            let mut stack = vec![s];
            comp[s] = cid;
            while let Some(u) = stack.pop() {
                for &v in &rgraph[u] {
                    if comp[v] == usize::MAX {
                        comp[v] = cid;
                        stack.push(v);
                    }
                }
            }
            cid += 1;
        }

        let mut has_crystal = vec![false; cid];
        for &c in &crystals {
            has_crystal[comp[c as usize]] = true;
        }

        let mut cgraph: Vec<Vec<usize>> = vec![Vec::new(); cid];
        let mut in_deg = vec![0usize; cid];
        let mut seen: HashSet<(usize, usize)> = HashSet::new();
        for u in 0..n {
            for &v in &graph[u] {
                let cu = comp[u];
                let cv = comp[v];
                if cu != cv && seen.insert((cu, cv)) {
                    cgraph[cu].push(cv);
                    in_deg[cv] += 1;
                }
            }
        }

        // BFS from crystal-containing components
        let mut good = vec![false; cid];
        let mut q: VecDeque<usize> = VecDeque::new();
        for c in 0..cid {
            if has_crystal[c] {
                good[c] = true;
                q.push_back(c);
            }
        }
        while let Some(u) = q.pop_front() {
            for &v in &cgraph[u] {
                if !good[v] {
                    good[v] = true;
                    q.push_back(v);
                }
            }
        }

        let mut ans = 0;
        for c in 0..cid {
            if !good[c] && in_deg[c] == 0 {
                ans += 1;
            }
        }
        ans
    }
}
