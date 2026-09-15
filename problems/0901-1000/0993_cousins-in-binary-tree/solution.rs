// Bundle-provided types (assembled with this submission):
//   ListNode:  { field val: i32, next: Option<Box<ListNode>> }
//   TreeNode:  { field val: i32, left/right: Option<Box<TreeNode>> }

impl Solution {
    // Cousinhood is a fact about two coordinates, not about either node
    // alone: the depth a node sits at and the parent it hangs from. One
    // descent — an explicit stack whose frames are (node, depth, parent
    // value) — records both coordinates for the nodes valued x and y, and
    // stops the moment the second of them is met. The verdict then reads
    // straight off the records: same depth, different parents. The root
    // rides with the sentinel parent 0, harmless because no node value is
    // 0 and the root is alone at depth 0.
    pub fn is_cousins(root: Option<Box<TreeNode>>, x: i32, y: i32) -> bool {
        let mut depth_x: i32 = -1;
        let mut depth_y: i32 = -1;
        let mut parent_x: i32 = 0;
        let mut parent_y: i32 = 0;
        let mut pending: Vec<(&TreeNode, i32, i32)> = Vec::new();
        if let Some(node) = root.as_deref() {
            pending.push((node, 0, 0));
        }
        while let Some((node, depth, parent)) = pending.pop() {
            if node.val == x {
                depth_x = depth;
                parent_x = parent;
            } else if node.val == y {
                depth_y = depth;
                parent_y = parent;
            }
            if depth_x >= 0 && depth_y >= 0 {
                break;
            }
            let next_depth = depth + 1;
            if let Some(child) = node.right.as_deref() {
                pending.push((child, next_depth, node.val));
            }
            if let Some(child) = node.left.as_deref() {
                pending.push((child, next_depth, node.val));
            }
        }
        depth_x == depth_y && parent_x != parent_y
    }
}
