// Bundle-provided types (assembled with this submission):
//   ListNode:  { field val: i32, next: Option<Box<ListNode>> }
//   TreeNode:  { field val: i32, left/right: Option<Box<TreeNode>> }

impl Solution {
    // Flip equivalence is a question of pairing: some way of walking the
    // trees together, committing at each paired node to the straight or
    // the swapped alignment of children, must run out of nodes without a
    // disagreement. The stack carries the pairs.
    pub fn flip_equiv(root1: Option<Box<TreeNode>>, root2: Option<Box<TreeNode>>) -> bool {
        let mut pending: Vec<(Option<&TreeNode>, Option<&TreeNode>)> = Vec::new();
        match (root1.as_deref(), root2.as_deref()) {
            (Some(a), Some(b)) => pending.push((Some(a), Some(b))),
            (None, None) => return true,
            _ => return false,
        }
        while let Some((a, b)) = pending.pop() {
            let (a, b) = match (a, b) {
                (Some(a), Some(b)) => (a, b),
                (None, None) => continue,
                _ => return false,
            };
            if a.val != b.val {
                return false;
            }
            let straight = Self::aligned(a.left.as_deref(), b.left.as_deref())
                && Self::aligned(a.right.as_deref(), b.right.as_deref());
            let crossed = Self::aligned(a.left.as_deref(), b.right.as_deref())
                && Self::aligned(a.right.as_deref(), b.left.as_deref());
            if straight {
                pending.push((a.left.as_deref(), b.left.as_deref()));
                pending.push((a.right.as_deref(), b.right.as_deref()));
            } else if crossed {
                pending.push((a.left.as_deref(), b.right.as_deref()));
                pending.push((a.right.as_deref(), b.left.as_deref()));
            } else {
                return false;
            }
        }
        true
    }

    // Values are unique within each tree, which is what makes the
    // commitment above exhaustive: both alignments can line up at a node
    // only when they coincide, so testing the straight one first and
    // falling back to the swapped one covers every flip choice.
    fn aligned(a: Option<&TreeNode>, b: Option<&TreeNode>) -> bool {
        match (a, b) {
            (None, None) => true,
            (Some(a), Some(b)) => a.val == b.val,
            _ => false,
        }
    }
}
