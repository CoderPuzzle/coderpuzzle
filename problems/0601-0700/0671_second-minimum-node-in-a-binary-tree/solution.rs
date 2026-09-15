// Bundle-provided types (assembled with this submission):
//   ListNode:  { field val: i32, next: Option<Box<ListNode>> }
//   TreeNode:  { field val: i32, left/right: Option<Box<TreeNode>> }

impl Solution {
    pub fn find_second_minimum_value(root: Option<Box<TreeNode>>) -> i32 {
        // The min property makes root.val the minimum of the whole tree:
        // a parent is the smaller of its children, so every value below
        // the root is >= the root's own. The second minimum is therefore
        // the smallest value strictly greater than root.val. The walk
        // descends only through nodes that still carry the root's value —
        // a node with a larger value is itself the best its whole subtree
        // can offer (everything beneath it is at least as large), so it
        // is taken as a candidate and its subtree is pruned. best starts
        // at -1, which no node value can equal (values are >= 1), so it
        // doubles as the fallback answer.
        let mut stack: Vec<Box<TreeNode>> = Vec::new();
        let root_value = match root {
            Some(node) => {
                let value = node.val;
                stack.push(node);
                value
            }
            // The constraints promise a non-empty tree; an empty one has
            // no second minimum anyway.
            None => return -1,
        };
        let mut best: i32 = -1;
        while let Some(node) = stack.pop() {
            let TreeNode { val, left, right } = *node;
            if val == root_value {
                // 0 or 2 children: if one exists so does the other, but
                // pushing each Some child needs no such assumption.
                if let Some(child) = left {
                    stack.push(child);
                }
                if let Some(child) = right {
                    stack.push(child);
                }
            } else if best == -1 || val < best {
                best = val;
            }
        }
        best
    }
}
