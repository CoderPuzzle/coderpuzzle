// Bundle-provided types (assembled with this submission):
//   ListNode:  { field val: i32, next: Option<Box<ListNode>> }
//   TreeNode:  { field val: i32, left/right: Option<Box<TreeNode>> }

impl Solution {
    pub fn find_closest_leaf(root: Option<Box<TreeNode>>, k: i32) -> i32 {
        // Distance here runs over the tree's edges as an undirected graph:
        // the nearest leaf may sit in another subtree, up through parents
        // and across the root, so a descending search alone cannot prove a
        // leaf nearest. One breadth-first pass from the root collects every
        // node and numbers them, wiring each node's index to its parent's
        // and its children's — an adjacency list for the undirected graph.
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
        let target = match (0..order.len()).find(|index| order[*index].val == k) {
            Some(index) => index,
            // The constraints guarantee a node with value k exists.
            None => return -1,
        };

        // A level-synchronized walk from the k node spreads one edge per
        // step through the undirected neighbors. The first level holding a
        // leaf holds every nearest leaf; the smallest value among them
        // settles the tie rule.
        let mut frontier: Vec<usize> = vec![target];
        let mut seen: Vec<bool> = vec![false; order.len()];
        seen[target] = true;
        loop {
            let mut best: Option<i32> = None;
            for index in frontier.iter() {
                let node = order[*index];
                if node.left.is_none() && node.right.is_none() {
                    best = Some(match best {
                        Some(value) if value < node.val => value,
                        _ => node.val,
                    });
                }
            }
            if let Some(value) = best {
                return value;
            }
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
        }
    }
}
