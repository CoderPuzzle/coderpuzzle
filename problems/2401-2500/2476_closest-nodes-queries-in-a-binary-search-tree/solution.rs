impl Solution {
    pub fn closest_nodes(root: Option<Box<TreeNode>>, queries: Vec<i32>) -> Vec<Vec<i32>> {
        fn inorder(node: &Option<Box<TreeNode>>, out: &mut Vec<i32>) {
            if let Some(n) = node {
                inorder(&n.left, out);
                out.push(n.val);
                inorder(&n.right, out);
            }
        }

        // A BST's inorder traversal is sorted: flatten once and each
        // query becomes two binary searches.
        let mut values = Vec::new();
        inorder(&root, &mut values);

        queries
            .iter()
            .map(|&query| {
                // lower = first index with value >= query; upper sits one
                // past the last value <= query.
                let lower = values.partition_point(|&x| x < query);
                let upper = values.partition_point(|&x| x <= query);
                // neighbours around the query slot: largest <= q and
                // first >= q, -1 when that side is empty.
                let minimum = if upper > 0 { values[upper - 1] } else { -1 };
                let maximum = if lower < values.len() { values[lower] } else { -1 };
                vec![minimum, maximum]
            })
            .collect()
    }
}
