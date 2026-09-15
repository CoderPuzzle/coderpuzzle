impl Solution {
    pub fn kth_smallest(par: Vec<i32>, vals: Vec<i32>, queries: Vec<Vec<i32>>) -> Vec<i32> {
        // Path XOR root -> node, then bottom-up small-to-large merging of
        // sorted distinct XOR lists: a subtree's list is its largest
        // child's list (reused) grown by the node's own value and every
        // other child's distinct values, so each element only moves into
        // lists that keep doubling. A small child (under 64 values)
        // splices element-by-element — binary search plus one contiguous
        // insert — while a large child folds in with a single two-pointer
        // pass that dedupes as it goes. Queries are grouped by node and
        // answered by indexing the final list at k - 1, or -1 past the
        // end. The tree can be a 5 * 10^4-node chain, so the DFS is an
        // explicit stack.
        let n = vals.len();
        let mut children: Vec<Vec<usize>> = vec![Vec::new(); n];
        for node in 1..n {
            children[par[node] as usize].push(node);
        }
        let mut order: Vec<usize> = Vec::with_capacity(n); // preorder: parent first
        let mut path = vec![0i32; n];
        let mut stack = vec![0usize];
        while let Some(node) = stack.pop() {
            order.push(node);
            path[node] = if node > 0 {
                vals[node] ^ path[par[node] as usize]
            } else {
                vals[node]
            };
            stack.extend_from_slice(&children[node]);
        }
        let mut by_node: Vec<Vec<(i32, usize)>> = vec![Vec::new(); n]; // node -> (k, index)
        for (j, query) in queries.iter().enumerate() {
            by_node[query[0] as usize].push((query[1], j));
        }
        let mut answers = vec![0i32; queries.len()];
        let mut lists: Vec<Vec<i32>> = (0..n).map(|_| Vec::new()).collect();
        for t in (0..n).rev() {
            let node = order[t];
            let kids = children[node].clone();
            let mut base: i32 = -1;
            for &child in &kids {
                if base < 0 || lists[child].len() > lists[base as usize].len() {
                    base = child as i32;
                }
            }
            let mut acc: Vec<i32> = if base >= 0 {
                std::mem::replace(&mut lists[base as usize], Vec::new())
            } else {
                Vec::new()
            };
            let own = path[node];
            let own_pos = acc.binary_search(&own).unwrap_or_else(|p| p);
            if own_pos == acc.len() || acc[own_pos] != own {
                acc.insert(own_pos, own);
            }
            for &child in &kids {
                if child as i32 == base {
                    continue;
                }
                let small = std::mem::replace(&mut lists[child], Vec::new());
                if small.len() >= 64 {
                    let mut merged: Vec<i32> = Vec::with_capacity(acc.len() + small.len());
                    let (mut i, mut j) = (0usize, 0usize); // two-pointer pass, deduping
                    while i < acc.len() && j < small.len() {
                        if acc[i] < small[j] {
                            merged.push(acc[i]);
                            i += 1;
                        } else if small[j] < acc[i] {
                            merged.push(small[j]);
                            j += 1;
                        } else {
                            merged.push(acc[i]);
                            i += 1;
                            j += 1;
                        }
                    }
                    merged.extend_from_slice(&acc[i..]);
                    merged.extend_from_slice(&small[j..]);
                    acc = merged;
                } else {
                    for value in small {
                        let pos = acc.binary_search(&value).unwrap_or_else(|p| p);
                        if pos == acc.len() || acc[pos] != value {
                            acc.insert(pos, value);
                        }
                    }
                }
            }
            for (k, j) in &by_node[node] {
                answers[*j] = if *k <= acc.len() as i32 {
                    acc[(*k - 1) as usize]
                } else {
                    -1
                };
            }
            lists[node] = acc;
        }
        answers
    }
}
