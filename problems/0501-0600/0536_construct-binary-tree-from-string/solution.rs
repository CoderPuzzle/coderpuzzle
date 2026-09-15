// Bundle-provided types (assembled with this submission):
//   ListNode:  { field val: i32, next: Option<Box<ListNode>> }
//   TreeNode:  { field val: i32, left/right: Option<Box<TreeNode>> }

impl Solution {
    pub fn str2tree(s: String) -> Option<Box<TreeNode>> {
        // The parens spell a preorder walk: every integer opens a node, and
        // every parenthesized group is one whole subtree written right after
        // the node that owns it. The stack holds the ancestors still open
        // for children, so one left-to-right scan decides each node in the
        // very order its pieces appear. Rust's nodes are owned Boxes, so a
        // finished subtree is popped by value and moved into its parent.
        let bytes = s.as_bytes();
        let mut stack: Vec<Box<TreeNode>> = Vec::new();
        let mut i = 0;
        while i < bytes.len() {
            match bytes[i] {
                b'(' => i += 1,
                b')' => {
                    // A group just closed: the subtree on top is finished
                    // and belongs to the node underneath — in the left slot
                    // if that is still open, otherwise the right.
                    let child = stack.pop().unwrap();
                    if let Some(parent) = stack.last_mut() {
                        if parent.left.is_none() {
                            parent.left = Some(child);
                        } else {
                            parent.right = Some(child);
                        }
                    }
                    i += 1;
                }
                _ => {
                    // Anything else starts a value: a run of digits with an
                    // optional leading '-', up to the next parenthesis. The
                    // input is ASCII, so byte offsets cut on character
                    // boundaries and the slice parses as one integer.
                    let start = i;
                    i += 1;
                    while i < bytes.len() && bytes[i] != b'(' && bytes[i] != b')' {
                        i += 1;
                    }
                    let value: i32 = s[start..i].parse().unwrap();
                    stack.push(Box::new(TreeNode::new(value)));
                }
            }
        }
        // Every node but the root is closed by its group's ')', so exactly
        // the root remains — or nothing, for the empty string.
        stack.pop()
    }
}
