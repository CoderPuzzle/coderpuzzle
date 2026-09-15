// Bundle-provided types (assembled with this submission):
//   ListNode:  { field val: i32, next: Option<Box<ListNode>> }
//   TreeNode:  { field val: i32, left/right: Option<Box<TreeNode>> }

impl Solution {
    // The walk and the voyage run in lockstep: a preorder descent that
    // consumes one voyage value per node and, whenever the next value
    // names the right child rather than the left, flips the current
    // node and records it. Values are unique, so each flip decision is
    // forced — the recorded set is the smallest one, listed in the
    // order the resulting preorder meets the flipped nodes. Any
    // disagreement, or voyage entries left over, means no flip set
    // works: [-1].
    pub fn flip_match_voyage(root: Option<Box<TreeNode>>, voyage: Vec<i32>) -> Vec<i32> {
        let mut flips: Vec<i32> = Vec::new();
        let mut pending: Vec<&TreeNode> = Vec::new();
        if let Some(node) = root.as_deref() {
            pending.push(node);
        }
        let mut cursor = 0usize;
        while let Some(node) = pending.pop() {
            if cursor == voyage.len() || voyage[cursor] != node.val {
                return vec![-1];
            }
            cursor += 1;
            let mut left = node.left.as_deref();
            let mut right = node.right.as_deref();
            if let Some(child) = left {
                if cursor == voyage.len() || voyage[cursor] != child.val {
                    flips.push(node.val);
                    std::mem::swap(&mut left, &mut right);
                }
            }
            if let Some(child) = right {
                pending.push(child);
            }
            if let Some(child) = left {
                pending.push(child);
            }
        }
        if cursor != voyage.len() {
            return vec![-1];
        }
        flips
    }
}
