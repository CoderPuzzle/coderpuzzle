use std::collections::VecDeque;

impl Solution {
    pub fn validate_binary_tree_nodes(n: i32, left_child: Vec<i32>, right_child: Vec<i32>) -> bool {
        // At most one parent each, exactly one root, and full reachability
        // from that root: together necessary and sufficient.
        let n = n as usize;
        let mut indegree = vec![0i32; n];
        for children in [&left_child, &right_child] {
            for &child in children {
                if child != -1 {
                    indegree[child as usize] += 1;
                }
            }
        }
        let mut root: usize = 0;
        let mut roots = 0;
        for (i, &count) in indegree.iter().enumerate() {
            if count == 0 {
                root = i;
                roots += 1;
            } else if count > 1 {
                return false;
            }
        }
        if roots != 1 {
            return false;
        }
        let mut seen = vec![false; n];
        seen[root] = true;
        let mut queue = VecDeque::new();
        queue.push_back(root);
        let mut visited = 1;
        while let Some(node) = queue.pop_front() {
            for child in [left_child[node], right_child[node]] {
                if child != -1 && !seen[child as usize] {
                    seen[child as usize] = true;
                    visited += 1;
                    queue.push_back(child as usize);
                }
            }
        }
        visited == n
    }
}
