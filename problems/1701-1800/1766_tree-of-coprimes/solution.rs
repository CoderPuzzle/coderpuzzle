use std::collections::VecDeque;

impl Solution {
    pub fn get_coprimes(nums: Vec<i32>, edges: Vec<Vec<i32>>) -> Vec<i32> {
        // Values only reach 50, so track ancestors per value: on the current
        // root path, stacks[v] holds the nodes carrying value v, deepest
        // last. A node's answer is the deepest stack top among the values
        // coprime with its own.
        let n = nums.len();
        let mut adj: Vec<Vec<usize>> = vec![Vec::new(); n];
        for edge in &edges {
            let (u, v) = (edge[0] as usize, edge[1] as usize);
            adj[u].push(v);
            adj[v].push(u);
        }
        let mut coprimes: Vec<Vec<usize>> = vec![Vec::new(); 51];
        for v in 1..=50usize {
            for w in 1..=50usize {
                if Self::gcd(v as i32, w as i32) == 1 {
                    coprimes[v].push(w);
                }
            }
        }

        let mut ans = vec![-1i32; n];
        let mut depth = vec![0i32; n];
        let mut stacks: Vec<Vec<usize>> = vec![Vec::new(); 51];
        // The tree can be one 1e5-deep chain, so the traversal is
        // iterative: enter frames answer a node against the current stacks
        // and push it onto its value's stack, exit frames pop it again.
        let mut frames: VecDeque<(usize, i64, bool)> = VecDeque::new();
        frames.push_back((0, -1, false));
        while let Some((node, parent, leaving)) = frames.pop_back() {
            if leaving {
                stacks[nums[node] as usize].pop();
                continue;
            }
            let mut best = -1i32;
            let mut best_depth = -1i32;
            for &w in &coprimes[nums[node] as usize] {
                let candidates = &stacks[w];
                if let Some(&top) = candidates.last() {
                    if depth[top] > best_depth {
                        best = top as i32;
                        best_depth = depth[top];
                    }
                }
            }
            ans[node] = best;
            stacks[nums[node] as usize].push(node);
            frames.push_back((node, parent, true));
            for &y in &adj[node] {
                if y as i64 != parent {
                    depth[y] = depth[node] + 1;
                    frames.push_back((y, node as i64, false));
                }
            }
        }
        ans
    }

    fn gcd(mut a: i32, mut b: i32) -> i32 {
        while b != 0 {
            let t = a % b;
            a = b;
            b = t;
        }
        a
    }
}
