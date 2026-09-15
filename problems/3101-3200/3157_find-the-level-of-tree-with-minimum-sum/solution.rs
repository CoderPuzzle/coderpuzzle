// Bundle-provided types (assembled with this submission):
//   TreeNode:  { field val: i32, left/right: Option<Box<TreeNode>> }

impl Solution {
    // One breadth-first pass groups nodes level by level; each level's
    // sum competes against the running minimum with a strict less-than,
    // so on a tie the earliest — lowest — level stays the answer. An
    // explicit queue, never recursion: a skewed tree runs 10^5 nodes
    // deep. Level sums reach 10^5 * 10^9 = 10^14, past i32 range:
    // accumulate in i64.
    pub fn minimum_level(root: Option<Box<TreeNode>>) -> i32 {
        let mut best_level = 1;
        let mut best_sum: i64 = -1;
        let mut level = 1;
        if let Some(node) = root.as_deref() {
            let mut pending: Vec<&TreeNode> = vec![node];
            while !pending.is_empty() {
                let mut total: i64 = 0;
                let mut next: Vec<&TreeNode> = Vec::new();
                for node in &pending {
                    total += node.val as i64;
                    for child in [node.left.as_deref(), node.right.as_deref()] {
                        if let Some(child) = child {
                            next.push(child);
                        }
                    }
                }
                if best_sum < 0 || total < best_sum {
                    best_sum = total;
                    best_level = level;
                }
                pending = next;
                level += 1;
            }
        }
        best_level
    }
}
