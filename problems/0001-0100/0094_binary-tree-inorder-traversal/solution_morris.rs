// Bundle-provided types (assembled with this submission):
//   ListNode:  { field val: i32, next: Option<Box<ListNode>> }
//   TreeNode:  { field val: i32, left/right: Option<Box<TreeNode>> }

impl Solution {
    pub fn inorder_traversal(root: Option<Box<TreeNode>>) -> Vec<i32> {
        // Threading plants a right pointer aimed back at an ancestor — an
        // alias the owned-Box shape cannot spell with a second owner. So,
        // like every other language here, the walk drives raw pointers into
        // the tree this function owns; every thread it plants is cut again
        // before the walk moves past its node, so the Boxes still drop a
        // fully restored tree.
        let mut result: Vec<i32> = Vec::new();
        type Ptr = *mut TreeNode;
        let mut root = root;
        let mut node: Ptr = match root.as_deref_mut() {
            Some(top) => top as Ptr,
            None => return result,
        };
        while !node.is_null() {
            unsafe {
                if (*node).left.is_some() {
                    // Hunt the inorder predecessor first — the rightmost
                    // node of the left subtree — stopping early if the
                    // right spine already ends in a thread pointing back
                    // here.
                    let mut pred = (*node).left.as_deref_mut().unwrap() as Ptr;
                    let mut threaded = false;
                    while let Some(next) = (*pred).right.as_deref_mut() {
                        let next = next as Ptr;
                        if next == node {
                            threaded = true;
                            break;
                        }
                        pred = next;
                    }
                    if threaded {
                        // The thread says the left subtree is finished:
                        // read the node, cut the thread — forgetting the
                        // aliasing Box, whose target the tree itself still
                        // owns — and step right.
                        result.push((*node).val);
                        std::mem::forget((*pred).right.take());
                        node = match (*node).right.as_deref_mut() {
                            Some(child) => child as Ptr,
                            None => std::ptr::null_mut(),
                        };
                    } else {
                        // Fresh ground: thread the predecessor back to
                        // this node and descend left, planning to return
                        // via the thread.
                        (*pred).right = Some(Box::from_raw(node));
                        node = (*node).left.as_deref_mut().unwrap() as Ptr;
                    }
                } else {
                    result.push((*node).val);
                    node = match (*node).right.as_deref_mut() {
                        Some(child) => child as Ptr,
                        None => std::ptr::null_mut(),
                    };
                }
            }
        }
        result
    }
}
