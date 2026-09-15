// Bundle-provided types (assembled with this submission):
//   ListNode:  { field val: i32, next: Option<Box<ListNode>> }
//   TreeNode:  { field val: i32, left/right: Option<Box<TreeNode>> }

impl Solution {
    pub fn sufficient_subset(root: Option<Box<TreeNode>>, limit: i32) -> Option<Box<TreeNode>> {
        // Post-order with an explicit stack of frames, each holding raw
        // pointers into the tree this function owns. A frame is revisited
        // after its children are pruned in place: a leaf survives iff its
        // value clears the remaining budget, and an internal node survives
        // iff at least one child survived the prune. Pruning detaches a
        // child by setting the parent's field to None (dropping that Box);
        // a kept root is returned by moving `root` out at the end.
        let mut root = root?;
        type Ptr = *mut TreeNode;
        let mut stack: Vec<(Ptr, i32, Ptr, bool, bool)> =
            vec![(&mut *root as Ptr, limit, std::ptr::null_mut(), false, false)];
        let mut root_kept = false;
        while let Some((node_p, remaining, parent_p, is_left, revisited)) = stack.pop() {
            if node_p.is_null() {
                continue;
            }
            // Read the frame's node through a borrow that ends here, so no
            // reference outlives a prune performed further down.
            let (is_leaf, val, left_p, right_p) = unsafe {
                let n = &mut *node_p;
                (
                    n.left.is_none() && n.right.is_none(),
                    n.val,
                    n.left.as_deref_mut().map(|c| c as Ptr).unwrap_or(std::ptr::null_mut()),
                    n.right.as_deref_mut().map(|c| c as Ptr).unwrap_or(std::ptr::null_mut()),
                )
            };
            if !revisited {
                if is_leaf {
                    if val < remaining {
                        if parent_p.is_null() {
                            root_kept = false;
                        } else {
                            unsafe {
                                let parent = &mut *parent_p;
                                if is_left {
                                    parent.left = None;
                                } else {
                                    parent.right = None;
                                }
                            }
                        }
                    } else if parent_p.is_null() {
                        root_kept = true;
                    }
                    continue;
                }
                stack.push((node_p, remaining, parent_p, is_left, true));
                stack.push((right_p, remaining - val, node_p, false, false));
                stack.push((left_p, remaining - val, node_p, true, false));
            } else {
                let childless = unsafe {
                    let n = &*node_p;
                    n.left.is_none() && n.right.is_none()
                };
                if childless {
                    // Both children were pruned, so no leaf below reaches
                    // the limit.
                    if parent_p.is_null() {
                        root_kept = false;
                    } else {
                        unsafe {
                            let parent = &mut *parent_p;
                            if is_left {
                                parent.left = None;
                            } else {
                                parent.right = None;
                            }
                        }
                    }
                } else if parent_p.is_null() {
                    root_kept = true;
                }
            }
        }
        if root_kept {
            Some(root)
        } else {
            None
        }
    }
}
