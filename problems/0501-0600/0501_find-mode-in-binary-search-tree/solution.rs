// Bundle-provided types (assembled with this submission):
//   ListNode:  { field val: i32, next: Option<Box<ListNode>> }
//   TreeNode:  { field val: i32, left/right: Option<Box<TreeNode>> }

impl Solution {
    pub fn find_mode(root: Option<Box<TreeNode>>) -> Vec<i32> {
        // An inorder walk of a BST emits values in ascending order, so all
        // copies of a value sit next to each other: a mode is just the
        // longest run of equal values in that walk. Two passes find it
        // without ever storing a table of counts. The traversal carries its
        // own stack of nodes: the tree may be a single 10^4-node chain,
        // whose walk would nest 10000 calls — past the call stack's hold,
        // and past the recursive drop of its boxes.
        // Pass one measures the longest streak; nothing else is remembered,
        // so no table of counts is ever stored.
        let mut max_streak = 0;
        let mut streak = 0;
        let mut prev: Option<i32> = None;
        if let Some(node) = &root {
            inorder(node, &mut |value| {
                streak = if prev == Some(value) { streak + 1 } else { 1 };
                prev = Some(value);
                if streak > max_streak {
                    max_streak = streak;
                }
            });
        }

        // Pass two re-walks and emits a value exactly when its streak
        // reaches the maximum — once per mode, in ascending order.
        let mut modes: Vec<i32> = Vec::new();
        streak = 0;
        prev = None;
        if let Some(node) = &root {
            inorder(node, &mut |value| {
                streak = if prev == Some(value) { streak + 1 } else { 1 };
                prev = Some(value);
                if streak == max_streak {
                    modes.push(value);
                }
            });
        }
        modes
    }
}

// Iterative inorder: descend the left spine stacking every node, then emit
// each popped node and descend its right child.
fn inorder(root: &TreeNode, visit: &mut dyn FnMut(i32)) {
    let mut stack: Vec<&TreeNode> = Vec::new();
    let mut current: Option<&TreeNode> = Some(root);
    while current.is_some() || !stack.is_empty() {
        while let Some(node) = current {
            stack.push(node);
            current = node.left.as_deref();
        }
        let node = stack.pop().unwrap();
        visit(node.val);
        current = node.right.as_deref();
    }
}
