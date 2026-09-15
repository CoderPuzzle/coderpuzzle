impl Solution {
    pub fn remove_leaf_nodes(root: Option<Box<TreeNode>>, target: i32) -> Option<Box<TreeNode>> {
        // Post-order prune done over an arena (index-based children), so no
        // recursion and no parent-pointer aliasing: decompose the tree, judge
        // every node bottom-up in one pass, then rebuild only the survivors.
        if root.is_none() {
            return None;
        }
        // 1. Decompose into arrays indexed by node id (preorder: every child
        //    gets a higher id than its parent).
        let mut vals: Vec<i32> = Vec::new();
        let mut left: Vec<Option<usize>> = Vec::new();
        let mut right: Vec<Option<usize>> = Vec::new();
        let mut root_id = 0usize;
        let mut stack: Vec<(Option<Box<TreeNode>>, Option<(usize, u8)>)> = vec![(root, None)];
        while let Some((node, parent)) = stack.pop() {
            if let Some(mut node) = node {
                let id = vals.len();
                vals.push(node.val);
                left.push(None);
                right.push(None);
                match parent {
                    Some((p, side)) => {
                        if side == 0 {
                            left[p] = Some(id);
                        } else {
                            right[p] = Some(id);
                        }
                    }
                    None => root_id = id,
                }
                stack.push((node.right.take(), Some((id, 1))));
                stack.push((node.left.take(), Some((id, 0))));
            }
        }

        // 2. Iterative post-order judgment: alive[i] = survives the prune.
        let n = vals.len();
        let mut alive = vec![true; n];
        let mut order: Vec<(usize, bool)> = vec![(root_id, false)];
        while let Some((id, expanded)) = order.pop() {
            if !expanded {
                order.push((id, true));
                if let Some(c) = left[id] {
                    order.push((c, false));
                }
                if let Some(c) = right[id] {
                    order.push((c, false));
                }
                continue;
            }
            let left_dead = left[id].map_or(true, |c| !alive[c]);
            let right_dead = right[id].map_or(true, |c| !alive[c]);
            if left_dead && right_dead && vals[id] == target {
                alive[id] = false;
            }
        }
        if !alive[root_id] {
            return None;
        }

        // 3. Rebuild in reverse id order: children (higher ids) are already
        //    boxed when their parent is assembled.
        let mut built: Vec<Option<Box<TreeNode>>> = vec![None; n];
        for id in (0..n).rev() {
            if !alive[id] {
                continue;
            }
            let mut node = Box::new(TreeNode {
                val: vals[id],
                left: None,
                right: None,
            });
            if let Some(c) = left[id] {
                node.left = built[c].take();
            }
            if let Some(c) = right[id] {
                node.right = built[c].take();
            }
            built[id] = Some(node);
        }
        built[root_id].take()
    }
}
