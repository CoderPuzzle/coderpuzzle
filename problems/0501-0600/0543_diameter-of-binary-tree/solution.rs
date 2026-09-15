impl Solution {
    pub fn diameter_of_binary_tree(root: Option<Box<TreeNode>>) -> i32 {
        let mut diameter = 0;
        Self::height(&root, &mut diameter);
        diameter
    }

    fn height(node: &Option<Box<TreeNode>>, diameter: &mut i32) -> i32 {
        let n = match node {
            Some(n) => n,
            None => return 0,
        };
        let left = Self::height(&n.left, diameter);
        let right = Self::height(&n.right, diameter);
        // The longest path anchored at this node joins its two subtree
        // heights (in edges); the best anchor may bypass the root, so
        // every node contributes a candidate.
        if left + right > *diameter {
            *diameter = left + right;
        }
        // Return the one-sided height — what the parent's candidate
        // needs, deliberately distinct from the two-sided diameter.
        1 + left.max(right)
    }
}
