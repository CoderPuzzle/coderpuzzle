// Bundle-provided types (assembled with this submission):
//   ListNode:  { field val: i32, next: Option<Box<ListNode>> }
//   TreeNode:  { field val: i32, left/right: Option<Box<TreeNode>> }

impl Solution {
    // A node below low drags its whole left subtree below low with it, so
    // only its right subtree can hold hits; a node above high is the mirror
    // image; an in-window node counts and either subtree may still hit.
    // That three-way rule visits exactly the nodes that can matter. The
    // walk carries its own stack: the constraints allow a 2*10^4-node
    // chain, and recursion would nest twenty thousand frames — past
    // CPython's default limit and over the 512k stacks the judge hands
    // Java and Node.
    pub fn range_sum_bst(root: Option<Box<TreeNode>>, low: i32, high: i32) -> i32 {
        let mut total = 0;
        let mut stack: Vec<&TreeNode> = Vec::new();
        if let Some(node) = root.as_deref() {
            stack.push(node);
        }
        while let Some(node) = stack.pop() {
            if node.val < low {
                if let Some(child) = node.right.as_deref() {
                    stack.push(child);
                }
            } else if node.val > high {
                if let Some(child) = node.left.as_deref() {
                    stack.push(child);
                }
            } else {
                total += node.val;
                if let Some(child) = node.left.as_deref() {
                    stack.push(child);
                }
                if let Some(child) = node.right.as_deref() {
                    stack.push(child);
                }
            }
        }
        total
    }
}
