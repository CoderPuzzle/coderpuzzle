impl Solution {
    pub fn find_leaves(root: Option<Box<TreeNode>>) -> Vec<Vec<i32>> {
        let mut groups: Vec<Vec<i32>> = Vec::new();
        // Post-order: each call reports the height of the subtree rooted at
        // `node` (a leaf is height 0) and files the node's value into that
        // height's group as the recursion unwinds — collecting leaves round
        // by round is just sorting the nodes by height, and finishing the
        // left subtree before entering the right one pins each group to
        // left-to-right order.
        fn height(node: &Option<Box<TreeNode>>, groups: &mut Vec<Vec<i32>>) -> i32 {
            match node {
                None => -1,
                Some(current) => {
                    let node_height = 1 + height(&current.left, groups).max(height(&current.right, groups));
                    // A first sighting of a height always arrives after every smaller
                    // height has been seen, so this grows the list by exactly one.
                    if node_height as usize == groups.len() {
                        groups.push(Vec::new());
                    }
                    groups[node_height as usize].push(current.val);
                    node_height
                }
            }
        }
        height(&root, &mut groups);
        groups
    }
}
