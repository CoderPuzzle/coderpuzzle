impl Solution {
    pub fn max_xor(n: i32, edges: Vec<Vec<i32>>, values: Vec<i32>) -> i64 {
        let n = n as usize;
        let mut graph: Vec<Vec<usize>> = vec![Vec::new(); n];
        for e in &edges {
            let a = e[0] as usize;
            let b = e[1] as usize;
            graph[a].push(b);
            graph[b].push(a);
        }

        // iterative DFS for order + parents
        let mut parent = vec![-1i64; n];
        let mut visited = vec![false; n];
        let mut order: Vec<usize> = Vec::with_capacity(n);
        visited[0] = true;
        let mut stack: Vec<usize> = vec![0];
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

        let mut sub: Vec<i64> = values.iter().map(|&v| v as i64).collect();
        for &u in order.iter().rev() {
            let p = parent[u];
            if p >= 0 {
                sub[p as usize] += sub[u];
            }
        }

        let mut max_sum = 1i64;
        for &x in &sub {
            if x > max_sum {
                max_sum = x;
            }
        }
        let bits = 64 - (max_sum.max(1) as u64).leading_zeros() as i32;

        // flat trie: children as node indices, -1 marks missing
        let mut trie: Vec<[i32; 2]> = vec![[-1, -1]];
        let mut insert = |trie: &mut Vec<[i32; 2]>, value: i64| {
            let mut node = 0usize;
            let mut b = bits - 1;
            while b >= 0 {
                let bit = ((value >> b) & 1) as usize;
                let nxt = trie[node][bit];
                if nxt == -1 {
                    let new_node = trie.len() as i32;
                    trie.push([-1, -1]);
                    trie[node][bit] = new_node;
                    node = new_node as usize;
                } else {
                    node = nxt as usize;
                }
                b -= 1;
            }
        };
        let query = |trie: &Vec<[i32; 2]>, value: i64| -> i64 {
            let mut node = 0usize;
            let mut result = 0i64;
            let mut b = bits - 1;
            while b >= 0 {
                let bit = ((value >> b) & 1) as usize;
                let want = 1 - bit;
                if trie[node][want] != -1 {
                    result |= 1i64 << b;
                    node = trie[node][want] as usize;
                } else if trie[node][bit] != -1 {
                    node = trie[node][bit] as usize;
                } else {
                    return result;
                }
                b -= 1;
            }
            result
        };

        let mut answer = query(&trie, sub[0]);

        let mut ptr = vec![0usize; n];
        let mut stk: Vec<usize> = vec![0];
        let mut par: Vec<i64> = vec![-1];
        while let Some(&u) = stk.last() {
            let p = *par.last().unwrap();
            if ptr[u] < graph[u].len() {
                let v = graph[u][ptr[u]];
                ptr[u] += 1;
                if v as i64 != p {
                    let best = query(&trie, sub[v]);
                    if best > answer {
                        answer = best;
                    }
                    stk.push(v);
                    par.push(u as i64);
                }
            } else {
                stk.pop();
                par.pop();
                insert(&mut trie, sub[u]);
            }
        }
        answer
    }
}
