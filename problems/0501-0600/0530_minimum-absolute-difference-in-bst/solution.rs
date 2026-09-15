// Bundle-provided types (assembled with this submission):
//   ListNode:  { field val: i32, next: Option<Box<ListNode>> }
//   TreeNode:  { field val: i32, left/right: Option<Box<TreeNode>> }

impl Solution {
    pub fn get_minimum_difference(root: Option<Box<TreeNode>>) -> i32 {
        // An inorder walk of a BST emits values in ascending order, and a
        // sorted sequence keeps its closest pair next to each other: for any
        // two values with a third between them, that middle value is closer
        // to one end than the outer pair is wide. The minimum absolute
        // difference is therefore always a gap between consecutively visited
        // values, and one pass holding just the previously emitted value
        // sees every candidate. The traversal carries its own stack of
        // nodes: the tree may be a single 10^4-node chain, whose walk would
        // nest 10000 calls — past the call stack's hold, and past the
        // recursive drop of its boxes.
        let mut best: Option<i32> = None;
        let mut prev: Option<i32> = None;
        let mut stack: Vec<&TreeNode> = Vec::new();
        let mut current: Option<&TreeNode> = root.as_deref();
        while current.is_some() || !stack.is_empty() {
            // Descend the left spine stacking every node, then visit each
            // popped node and descend its right child.
            while let Some(node) = current {
                stack.push(node);
                current = node.left.as_deref();
            }
            let node = stack.pop().unwrap();
            if let Some(earlier) = prev {
                let gap = node.val - earlier;
                best = Some(match best {
                    Some(smaller) if smaller <= gap => smaller,
                    _ => gap,
                });
            }
            prev = Some(node.val);
            current = node.right.as_deref();
        }
        best.unwrap()
    }
}
