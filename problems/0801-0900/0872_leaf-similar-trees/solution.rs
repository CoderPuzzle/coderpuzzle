// Bundle-provided types (assembled with this submission):
//   ListNode:  { field val: i32, next: Option<Box<ListNode>> }
//   TreeNode:  { field val: i32, left/right: Option<Box<TreeNode>> }

impl Solution {
    // Two trees are leaf-similar exactly when their leaf value sequences
    // agree, so the whole question is writing each sequence down and
    // comparing them.
    pub fn leaf_similar(root1: Option<Box<TreeNode>>, root2: Option<Box<TreeNode>>) -> bool {
        Self::leaf_values(root1.as_deref()) == Self::leaf_values(root2.as_deref())
    }

    // The walk carries an explicit stack: pop a node, record its value
    // when both children are missing — that node is a leaf — otherwise
    // push the right child and then the left, so the left subtree is
    // always the next to pop and the values come out in left-to-right
    // order. Only leaves are recorded, so internal values and the shapes
    // above the leaves never enter the comparison; an exhausted stack
    // means the sequence is complete.
    fn leaf_values(root: Option<&TreeNode>) -> Vec<i32> {
        let mut values: Vec<i32> = Vec::new();
        let mut pending: Vec<&TreeNode> = Vec::new();
        if let Some(node) = root {
            pending.push(node);
        }
        while let Some(node) = pending.pop() {
            match (node.left.as_deref(), node.right.as_deref()) {
                (None, None) => values.push(node.val),
                (left, right) => {
                    if let Some(right) = right {
                        pending.push(right);
                    }
                    if let Some(left) = left {
                        pending.push(left);
                    }
                }
            }
        }
        values
    }
}
