impl Solution {
    pub fn path_sum(root: Option<Box<TreeNode>>, targetSum: i32) -> i32 {
        fn dfs(
            node: &Option<Box<TreeNode>>,
            running: i64,
            target: i64,
            counter: &mut std::collections::HashMap<i64, i64>,
        ) -> i64 {
            match node {
                None => 0,
                Some(current) => {
                    let running = running + current.val as i64;
                    // A path ending here with the target starts at an
                    // ancestor whose prefix equals running - target
                    // (prefix(v) - prefix(u) trick).
                    let mut total = *counter.get(&(running - target)).unwrap_or(&0);
                    // Register this prefix only after the lookup, then recurse.
                    *counter.entry(running).or_insert(0) += 1;
                    total += dfs(&current.left, running, target, counter);
                    total += dfs(&current.right, running, target, counter);
                    // Undo on backtrack: left-subtree prefixes must not pair
                    // with right-subtree nodes, so lookups see true ancestors.
                    *counter.entry(running).or_insert(0) -= 1;
                    total
                }
            }
        }

        // counter maps root-to-node prefix sums on the current path to
        // counts; {0: 1} counts paths starting at a node itself.
        let mut counter: std::collections::HashMap<i64, i64> = std::collections::HashMap::new();
        counter.insert(0, 1);
        dfs(&root, 0, targetSum as i64, &mut counter) as i32
    }
}
