use std::collections::VecDeque;

impl Solution {
    pub fn remaining_methods(n: i32, k: i32, invocations: Vec<Vec<i32>>) -> Vec<i32> {
        let n = n as usize;
        let k = k as usize;
        let mut graph = vec![Vec::new(); n];
        for edge in invocations.iter() {
            graph[edge[0] as usize].push(edge[1] as usize);
        }
        // Iterative DFS from k: a 10^5-long invocation chain would overflow
        // the recursion stack under the judged limits.
        let mut suspicious = vec![false; n];
        suspicious[k] = true;
        let mut stack = VecDeque::from([k]);
        while let Some(node) = stack.pop_back() {
            for &nxt in graph[node].iter() {
                if !suspicious[nxt] {
                    suspicious[nxt] = true;
                    stack.push_back(nxt);
                }
            }
        }
        // The group may only be removed when no outside method invokes
        // into it; otherwise nothing is removed at all.
        for edge in invocations.iter() {
            if !suspicious[edge[0] as usize] && suspicious[edge[1] as usize] {
                return (0..n as i32).collect();
            }
        }
        (0..n as i32).filter(|&node| !suspicious[node as usize]).collect()
    }
}
