impl Solution {
    pub fn balance_bst(root: Option<Box<TreeNode>>) -> Option<Box<TreeNode>> {
        // phase 1: fold the tree into a descending "vine" — a left-only
        // chain in decreasing value order — via left rotations at every
        // node with a right child. `slot` walks the vine as it grows,
        // borrowed one level deeper each time a node has no right child
        // left to fold in.
        let mut dummy = Box::new(TreeNode::new(0));
        dummy.left = root;
        let mut size = 0;
        {
            let mut slot: &mut Option<Box<TreeNode>> = &mut dummy.left;
            loop {
                if slot.is_none() {
                    break;
                }
                if slot.as_ref().unwrap().right.is_some() {
                    let mut node = slot.take().unwrap();
                    let mut child = node.right.take().unwrap();
                    node.right = child.left.take();
                    child.left = Some(node);
                    *slot = Some(child);
                } else {
                    size += 1;
                    slot = &mut slot.as_mut().unwrap().left;
                }
            }
        }

        // phase 2: compress the vine into a complete tree with right
        // rotations, working from the leaves inward. The first round
        // trims the vine down to the largest 2**k - 1 size (its "extra"
        // leaves); every following round halves what remains, exactly
        // like the book DSW algorithm mirrored end for end.
        fn compress(dummy: &mut TreeNode, count: i32) {
            let mut slot: &mut Option<Box<TreeNode>> = &mut dummy.left;
            for _ in 0..count {
                let mut child = slot.take().unwrap();
                let mut grandchild = child.left.take().unwrap();
                child.left = grandchild.right.take();
                grandchild.right = Some(child);
                *slot = Some(grandchild);
                slot = &mut slot.as_mut().unwrap().left;
            }
        }

        let mut power = 1;
        while power * 2 <= size + 1 {
            power *= 2;
        }
        compress(&mut dummy, size + 1 - power);
        let mut size = power - 1;
        while size > 1 {
            compress(&mut dummy, size / 2);
            size /= 2;
        }

        dummy.left
    }
}
