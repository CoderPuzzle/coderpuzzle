use std::collections::HashSet;

impl Solution {
    pub fn del_nodes(root: Option<Box<TreeNode>>, to_delete: Vec<i32>) -> Vec<Option<Box<TreeNode>>> {
        let deleted: HashSet<i32> = to_delete.into_iter().collect();
        let mut forest = Vec::new();

        fn dfs(
            node: Option<Box<TreeNode>>,
            deleted: &HashSet<i32>,
            forest: &mut Vec<Option<Box<TreeNode>>>,
        ) -> Option<Box<TreeNode>> {
            let mut node = node?;
            // Recurse into both children first; the pruned results reattach
            // below, so deletions deep in the tree are already settled.
            node.left = dfs(node.left.take(), deleted, forest);
            node.right = dfs(node.right.take(), deleted, forest);
            if deleted.contains(&node.val) {
                // This node vanishes; whichever children survived are cut
                // loose here and become new tree roots.
                if node.left.is_some() {
                    forest.push(node.left.take());
                }
                if node.right.is_some() {
                    forest.push(node.right.take());
                }
                None
            } else {
                Some(node)
            }
        }

        // The one surviving root no deletion created is the original root.
        let remaining = dfs(root, &deleted, &mut forest);
        if remaining.is_some() {
            forest.push(remaining);
        }
        forest
    }
}
