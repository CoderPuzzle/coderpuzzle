use std::collections::HashMap;

impl Solution {
    pub fn lca_deepest_leaves(root: Option<Box<TreeNode>>) -> Option<Box<TreeNode>> {
        // A pre-order stack walk lists parents before children, so the
        // reversed list settles every child's height before its parent.
        // Pointer-as-usize keys give every node a dense index.
        let mut order: Vec<&TreeNode> = Vec::new();
        let mut stack: Vec<&TreeNode> = root.as_deref().into_iter().collect();
        while let Some(node) = stack.pop() {
            order.push(node);
            if let Some(right) = node.right.as_deref() {
                stack.push(right);
            }
            if let Some(left) = node.left.as_deref() {
                stack.push(left);
            }
        }
        let key = |node: &TreeNode| -> usize { node as *const TreeNode as usize };
        let mut index: HashMap<usize, usize> = HashMap::new();
        for (i, node) in order.iter().enumerate() {
            index.insert(key(node), i);
        }
        let mut height = vec![-1i32; order.len()];
        for i in (0..order.len()).rev() {
            let node = order[i];
            let mut best = -1i32;
            if let Some(left) = node.left.as_deref() {
                best = best.max(height[index[&key(left)]]);
            }
            if let Some(right) = node.right.as_deref() {
                best = best.max(height[index[&key(right)]]);
            }
            height[i] = best + 1;
        }
        // Descend toward the taller child; a tie means both sides reach the
        // deepest leaves, so this node is their lowest common ancestor. The
        // answer is returned as a clone of the found subtree.
        let mut node = order[0];
        loop {
            let left_h = node
                .left
                .as_deref()
                .map(|child| height[index[&key(child)]])
                .unwrap_or(-1);
            let right_h = node
                .right
                .as_deref()
                .map(|child| height[index[&key(child)]])
                .unwrap_or(-1);
            if left_h > right_h {
                node = node.left.as_deref().unwrap();
            } else if right_h > left_h {
                node = node.right.as_deref().unwrap();
            } else {
                return Some(Box::new(node.clone()));
            }
        }
    }
}
