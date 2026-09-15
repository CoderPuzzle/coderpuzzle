// Bundle-provided types (assembled with this submission):
//   ListNode:  { field val: i32, next: Option<Box<ListNode>> }
//   TreeNode:  { field val: i32, left/right: Option<Box<TreeNode>> }

impl Solution {
    pub fn insert_into_bst(root: Option<Box<TreeNode>>, val: i32) -> Option<Box<TreeNode>> {
        // The value is guaranteed absent, so a search for it must fail — and
        // where it fails is the answer: descend right when val is greater,
        // left otherwise, until the child slot ahead is empty, then hang a
        // fresh leaf there. Every ancestor on that path already brackets val
        // on the correct side, and any empty slot off the path lies in a
        // subtree whose root's value excludes val — so the slot is forced and
        // no restructuring is ever needed.
        let mut node = match root {
            // An empty tree never enters the loop: the fresh node is the root
            // handed back to the caller.
            None => return Some(Box::new(TreeNode::new(val))),
            Some(node) => node,
        };
        // A single &mut walks the boxes: each step reborrows through the
        // current node, so ownership never splits and the finished tree is
        // exactly the one the descent threaded. Iterating also keeps a
        // 10^4-node chain's 10000 nested calls — and their recursive box
        // drops — off the call stack.
        let mut cur: &mut TreeNode = &mut node;
        loop {
            if val > cur.val {
                if cur.right.is_none() {
                    cur.right = Some(Box::new(TreeNode::new(val)));
                    return Some(node);
                }
                cur = cur.right.as_mut().unwrap();
            } else {
                if cur.left.is_none() {
                    cur.left = Some(Box::new(TreeNode::new(val)));
                    return Some(node);
                }
                cur = cur.left.as_mut().unwrap();
            }
        }
    }
}
