// Bundle-provided types (assembled with this submission):
//   ListNode:  { field val: i32, next: Option<Box<ListNode>> }
//   TreeNode:  { field val: i32, left/right: Option<Box<TreeNode>> }

impl Solution {
    pub fn inorder_successor(mut root: Option<Box<TreeNode>>, p: i32) -> Option<Box<TreeNode>> {
        // Phase one (borrowed): one descent from the root, remembering the
        // value of the last node the walk stepped left from — the best
        // successor candidate so far. Finding p replaces it with the
        // leftmost value of p's right subtree when that subtree exists.
        let mut successor_value: Option<i32> = None;
        let mut node = root.as_deref();
        while let Some(current) = node {
            if p < current.val {
                successor_value = Some(current.val);
                node = current.left.as_deref();
            } else if p > current.val {
                node = current.right.as_deref();
            } else {
                let mut descend = current.right.as_deref();
                while let Some(next) = descend {
                    successor_value = Some(next.val);
                    descend = next.left.as_deref();
                }
                break;
            }
        }
        let target = successor_value?;
        // Phase two (owned): hand the target node out of the tree. Values
        // are unique, so a comparison walk lands on the slot holding it; the
        // successor is only ever serialized once returned, so taking it out
        // of its parent disturbs nothing the judge still reads.
        if root.as_ref().map_or(false, |node| node.val == target) {
            return root.take();
        }
        let mut cursor = root.as_mut().unwrap();
        loop {
            let going_left = target < cursor.val;
            let slot = if going_left {
                &mut cursor.left
            } else {
                &mut cursor.right
            };
            if slot.as_ref().map_or(false, |child| child.val == target) {
                return slot.take();
            }
            cursor = slot.as_mut().unwrap();
        }
    }
}
