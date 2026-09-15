// Bundle-provided types (assembled with this submission):
//   ListNode:  { field val: i32, next: Option<Box<ListNode>> }
//   TreeNode:  { field val: i32, left/right: Option<Box<TreeNode>> }

impl Solution {
    pub fn closest_value(root: Option<Box<TreeNode>>, target: f64) -> i32 {
        // One root-to-leaf descent: the search path for target visits the
        // largest value below it and the smallest above it, so the closest
        // value is decided on the path alone.
        let mut best = 0;
        let mut best_distance = f64::INFINITY;
        let mut node = root.as_deref();
        while let Some(current) = node {
            let distance = (current.val as f64 - target).abs();
            // Strictly closer wins; at exactly equal distance the smaller
            // value wins, which settles ties like target 3.5 over 3 and 4.
            if distance < best_distance || (distance == best_distance && current.val < best) {
                best = current.val;
                best_distance = distance;
            }
            node = if target < current.val as f64 {
                current.left.as_deref()
            } else {
                current.right.as_deref()
            };
        }
        best
    }
}
