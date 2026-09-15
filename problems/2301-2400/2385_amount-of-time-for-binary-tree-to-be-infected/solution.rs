use std::collections::{HashMap, HashSet};

impl Solution {
    // Infection crosses one edge per minute in both directions, so the
    // answer is the maximum distance from `start` once parent edges are
    // added. BFS layers off an adjacency map measure it.
    pub fn amount_of_time(root: Option<Box<TreeNode>>, start: i32) -> i32 {
        let mut adj: HashMap<i32, Vec<i32>> = HashMap::new();
        let mut stack: Vec<&TreeNode> = Vec::new();
        if let Some(r) = root.as_deref() {
            stack.push(r);
        }
        while let Some(node) = stack.pop() {
            for child in [node.left.as_deref(), node.right.as_deref()].into_iter().flatten() {
                adj.entry(node.val).or_default().push(child.val);
                adj.entry(child.val).or_default().push(node.val);
                stack.push(child);
            }
        }
        let mut seen: HashSet<i32> = HashSet::new();
        seen.insert(start);
        let mut frontier = vec![start];
        let mut minutes = 0i32;
        while !frontier.is_empty() {
            let mut next = Vec::new();
            for u in frontier {
                if let Some(nbrs) = adj.get(&u) {
                    for v in nbrs.clone() {
                        if seen.insert(v) {
                            next.push(v);
                        }
                    }
                }
            }
            if next.is_empty() {
                break;
            }
            minutes += 1;
            frontier = next;
        }
        minutes
    }
}
