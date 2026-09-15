// Bundle-provided types (assembled with this submission):
//   ListNode:  { field val: i32, next: Option<Box<ListNode>> }
//   TreeNode:  { field val: i32, left/right: Option<Box<TreeNode>> }

impl Solution {
    pub fn trim_bst(root: Option<Box<TreeNode>>, low: i32, high: i32) -> Option<Box<TreeNode>> {
        // Rust's nodes are owned boxes, so a child cannot be repaired while
        // it sits inside its parent: processing a subtree means taking it
        // out, and the finished subtree must be handed back and reattached.
        // The walk is therefore an explicit evaluation machine — a task
        // stack plus a results stack. A Trim task trims one subtree and
        // leaves the answer on `done`; LeftDone/RightDone tasks stitch a
        // finished child back into the parent that awaits it, replaying
        // exactly the reattachments the recursive trim would make, so
        // surviving nodes keep their original descendants. Iterating also
        // keeps a single 10^4-node chain's 10000 nested calls — and their
        // recursive box drops — off the call stack.
        enum Task {
            Trim(Option<Box<TreeNode>>),
            LeftDone(Box<TreeNode>),
            RightDone(Box<TreeNode>),
        }
        let mut stack = vec![Task::Trim(root)];
        let mut done: Vec<Option<Box<TreeNode>>> = Vec::new();
        while let Some(task) = stack.pop() {
            match task {
                Task::Trim(None) => done.push(None),
                Task::Trim(Some(mut node)) => {
                    if node.val < low {
                        // The node and its whole left subtree are below low;
                        // dropping the box drops that subtree with it.
                        stack.push(Task::Trim(node.right.take()));
                    } else if node.val > high {
                        stack.push(Task::Trim(node.left.take()));
                    } else {
                        // In range. Repair the child links, staying inside
                        // the node's own box so ownership never splits: a
                        // left child below low carries its own left subtree
                        // below low too, so the repair hoists the child's
                        // right child until the link holds a node in range
                        // (only the low side can break here — every left
                        // value is below the in-range parent, hence at most
                        // high). A right child above high hoists its left
                        // child, symmetrically.
                        while node.left.as_deref().map_or(false, |child| child.val < low) {
                            let child = node.left.take().unwrap();
                            node.left = child.right;
                        }
                        while node.right.as_deref().map_or(false, |child| child.val > high) {
                            let child = node.right.take().unwrap();
                            node.right = child.left;
                        }
                        // Trim the left subtree first, reattach it, then the
                        // right: each Trim finishes before its Done task
                        // resurfaces, so `done`'s top is always the awaited
                        // child.
                        let left = node.left.take();
                        stack.push(Task::LeftDone(node));
                        stack.push(Task::Trim(left));
                    }
                }
                Task::LeftDone(mut node) => {
                    node.left = done.pop().unwrap();
                    let right = node.right.take();
                    stack.push(Task::RightDone(node));
                    stack.push(Task::Trim(right));
                }
                Task::RightDone(mut node) => {
                    node.right = done.pop().unwrap();
                    done.push(Some(node));
                }
            }
        }
        done.pop().unwrap()
    }
}
