// Bundle-provided types (assembled with this submission):
//   ListNode:  { field val: i32, next: Option<Box<ListNode>> }
//   TreeNode:  { field val: i32, left/right: Option<Box<TreeNode>> }

impl Solution {
    pub fn distance_k(root: Option<Box<TreeNode>>, target: i32, k: i32) -> Vec<i32> {
        // Distance k counts edges on paths that may climb through parents as
        // well as descend through children, so the answer can spill out of
        // the target's own subtree — a downward search alone cannot reach
        // it. One breadth-first pass from the root collects every node and
        // numbers them, wiring each node's index to its parent's and its
        // children's — an adjacency list for the undirected graph.
        let mut order: Vec<&TreeNode> = Vec::new();
        let mut neighbors: Vec<Vec<usize>> = Vec::new();
        if let Some(node) = root.as_deref() {
            order.push(node);
            neighbors.push(Vec::new());
        }
        let mut head = 0;
        while head < order.len() {
            let parent = head;
            head += 1;
            let node = order[parent];
            for child in [node.left.as_deref(), node.right.as_deref()] {
                if let Some(child) = child {
                    neighbors[parent].push(order.len());
                    neighbors.push(vec![parent]);
                    order.push(child);
                }
            }
        }
        let start = match (0..order.len()).find(|index| order[*index].val == target) {
            Some(index) => index,
            // The constraints guarantee a node with the target value exists.
            None => return Vec::new(),
        };

        // A level-synchronized walk from the target spreads one edge per
        // step through the undirected neighbors, never revisiting a node,
        // so after k steps the frontier holds exactly the nodes at distance
        // k. Sorting the collected values settles the ascending output
        // order the statement pins.
        let mut frontier: Vec<usize> = vec![start];
        let mut seen: Vec<bool> = vec![false; order.len()];
        seen[start] = true;
        for _ in 0..k {
            let mut reached: Vec<usize> = Vec::new();
            for index in frontier.iter() {
                for neighbor in neighbors[*index].iter() {
                    if !seen[*neighbor] {
                        seen[*neighbor] = true;
                        reached.push(*neighbor);
                    }
                }
            }
            frontier = reached;
            if frontier.is_empty() {
                break;
            }
        }
        let mut result: Vec<i32> = frontier.iter().map(|index| order[*index].val).collect();
        result.sort();
        result
    }
}
