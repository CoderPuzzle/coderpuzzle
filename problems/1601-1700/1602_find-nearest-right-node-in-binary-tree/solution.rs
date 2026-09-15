use std::collections::VecDeque;

// Bundle-provided types (assembled with this submission):
//   ListNode:  { field val: i32, next: Option<Box<ListNode>> }
//   TreeNode:  { field val: i32, left/right: Option<Box<TreeNode>> }

impl Solution {
    pub fn find_nearest_right_node(root: Option<Box<TreeNode>>, u: i32) -> Option<Box<TreeNode>> {
        // Level-order BFS over borrowed references: drain the queue one
        // level at a time, left child before right, so a level's nodes
        // come out in left-to-right order. The node right after the one
        // matching u is the answer; TreeNode derives Clone, so the match
        // is handed back as a freshly cloned subtree.
        let root_ref = root.as_deref()?;
        let mut queue: VecDeque<&TreeNode> = VecDeque::new();
        queue.push_back(root_ref);
        while !queue.is_empty() {
            let size = queue.len();
            let mut found = false;
            for _ in 0..size {
                let node = queue.pop_front().unwrap();
                if found {
                    return Some(Box::new(node.clone()));
                }
                if node.val == u {
                    found = true;
                }
                if let Some(left) = node.left.as_deref() {
                    queue.push_back(left);
                }
                if let Some(right) = node.right.as_deref() {
                    queue.push_back(right);
                }
            }
            if found {
                return None;
            }
        }
        None
    }
}
