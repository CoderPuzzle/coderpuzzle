impl Solution {
    pub fn build_tree(preorder: Vec<i32>, inorder: Vec<i32>) -> Option<Box<TreeNode>> {
        let n = preorder.len();
        if n == 0 {
            return None;
        }
        // Arena of slots: values live in preorder order, and `left`/`right`
        // hold slot indexes. The spine: every node whose left side is
        // (possibly still) growing and whose right child is still pending.
        let mut left: Vec<Option<usize>> = vec![None; n];
        let mut right: Vec<Option<usize>> = vec![None; n];
        let mut spine: Vec<usize> = vec![0];
        let mut cursor = 0usize; // next inorder entry awaiting its turn
        for i in 1..n {
            let value = preorder[i];
            if preorder[*spine.last().unwrap()] != inorder[cursor] {
                // The top is not due yet, so the value keeps descending left.
                let top = *spine.last().unwrap();
                left[top] = Some(i);
                spine.push(i);
            } else {
                // The top is due in inorder: its whole left side is settled,
                // so pop it (and any ancestors also due) -- the new value is
                // the right child of the deepest node popped.
                let mut last = spine.pop().unwrap();
                cursor += 1;
                while let Some(&top) = spine.last() {
                    if preorder[top] == inorder[cursor] {
                        cursor += 1;
                        last = spine.pop().unwrap();
                    } else {
                        break;
                    }
                }
                right[last] = Some(i);
                spine.push(i);
            }
        }
        // Assemble the owned tree: a child always has a higher slot than its
        // parent, so wrapping slots in reverse order finds every child boxed
        // already (this port cannot keep mutable aliases on a spine).
        let mut nodes: Vec<Option<Box<TreeNode>>> = (0..n).map(|_| None).collect();
        for i in (0..n).rev() {
            nodes[i] = Some(Box::new(TreeNode {
                val: preorder[i],
                left: left[i].and_then(|child| nodes[child].take()),
                right: right[i].and_then(|child| nodes[child].take()),
            }));
        }
        nodes[0].take()
    }
}
