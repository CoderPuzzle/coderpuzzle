// Bundle-provided types (assembled with this submission):
//   ListNode:  { field val: i32, next: Option<Box<ListNode>> }
//   TreeNode:  { field val: i32, left/right: Option<Box<TreeNode>> }

impl Solution {
    // The only operator is '+', commutative and associative, so two
    // expression trees agree on every variable assignment exactly when
    // they carry the same multiset of leaf variables, whatever their
    // shape. -1 marks an operator node (always 2 children); 0-25 marks a
    // leaf's encoded letter (always 0 children).
    pub fn check_equivalence(root1: Option<Box<TreeNode>>, root2: Option<Box<TreeNode>>) -> bool {
        Self::leaf_counts(root1.as_deref()) == Self::leaf_counts(root2.as_deref())
    }

    fn leaf_counts(root: Option<&TreeNode>) -> [i32; 26] {
        let mut counts = [0i32; 26];
        let mut stack: Vec<&TreeNode> = Vec::new();
        if let Some(node) = root {
            stack.push(node);
        }
        while let Some(node) = stack.pop() {
            if node.left.is_none() && node.right.is_none() {
                counts[node.val as usize] += 1;
            } else {
                if let Some(l) = node.left.as_deref() {
                    stack.push(l);
                }
                if let Some(r) = node.right.as_deref() {
                    stack.push(r);
                }
            }
        }
        counts
    }
}
