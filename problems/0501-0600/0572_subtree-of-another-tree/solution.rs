// Bundle-provided types (assembled with this submission):
//   ListNode:  { field val: i32, next: Option<Box<ListNode>> }
//   TreeNode:  { field val: i32, left/right: Option<Box<TreeNode>> }

impl Solution {
    // A subtree hangs from some node of root and takes every descendant
    // below it, so the question splits in two: an equality test that
    // settles whether two trees agree in value and shape, and an anchor
    // walk that tries that test rooted at every node of root. Both walks
    // carry their own stacks: a skewed 2000-node root would nest 2000
    // calls — past CPython's default recursion limit of 1000 — and a
    // 1000-node subRoot chain would sit exactly at that edge, so every
    // runtime iterates instead. The anchor walk pops a node, tries the
    // test rooted there, and stacks its children; the first accepting
    // anchor answers the whole question.
    pub fn is_subtree(root: Option<Box<TreeNode>>, subRoot: Option<Box<TreeNode>>) -> bool {
        let mut anchors: Vec<&TreeNode> = Vec::new();
        if let Some(node) = root.as_deref() {
            anchors.push(node);
        }
        while let Some(node) = anchors.pop() {
            if Self::same_tree(Some(node), subRoot.as_deref()) {
                return true;
            }
            if let Some(child) = node.left.as_deref() {
                anchors.push(child);
            }
            if let Some(child) = node.right.as_deref() {
                anchors.push(child);
            }
        }
        false
    }

    // One stack entry settles one aligned node pair; an exhausted stack
    // means every pair agreed.
    fn same_tree(a: Option<&TreeNode>, b: Option<&TreeNode>) -> bool {
        let mut pending: Vec<(Option<&TreeNode>, Option<&TreeNode>)> = vec![(a, b)];
        while let Some((left, right)) = pending.pop() {
            match (left, right) {
                // Two missing subtrees match; exactly one missing is a
                // shape difference no value can repair.
                (None, None) => continue,
                (None, Some(_)) | (Some(_), None) => return false,
                // Both nodes exist: values must agree here, and both child
                // pairs join the stack for the same treatment.
                (Some(left), Some(right)) => {
                    if left.val != right.val {
                        return false;
                    }
                    pending.push((left.left.as_deref(), right.left.as_deref()));
                    pending.push((left.right.as_deref(), right.right.as_deref()));
                }
            }
        }
        true
    }
}
