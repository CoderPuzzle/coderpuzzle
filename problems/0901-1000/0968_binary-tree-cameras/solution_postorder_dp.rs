impl Solution {
    pub fn min_camera_cover(root: Option<Box<TreeNode>>) -> i32 {
        // Larger than any true count for a tree of at most 1000 nodes; it
        // marks impossible states without ever reaching an addition.
        const INF: i32 = 1_000_000;

        // Triple of minimum monitor counts for the subtree rooted at `node`:
        // .0 the root holds a monitor, .1 the root is covered without one,
        // .2 the root waits uncovered for its parent.
        fn dfs(node: &Option<Box<TreeNode>>) -> (i32, i32, i32) {
            match node {
                // A missing child is free whenever any state is allowed and
                // can never be the monitor holder, so it folds in as
                // (INF, 0, INF).
                None => (INF, 0, INF),
                Some(n) => {
                    let l = dfs(&n.left);
                    let r = dfs(&n.right);
                    // A monitor placed here observes both children, so each
                    // child may sit in any of its three states.
                    let any_state = l.0.min(l.1).min(l.2) + r.0.min(r.1).min(r.2);
                    // Coverage without own monitor must arrive from a child,
                    // and the other child is then on its own — no monitor
                    // here can help it.
                    let covered = (l.0 + r.0.min(r.1)).min(r.0 + l.0.min(l.1));
                    // Staying uncovered forbids monitors here and at both
                    // children, so each child must already be covered from
                    // below.
                    let uncovered = l.0.min(l.1) + r.0.min(r.1);
                    (1 + any_state, covered, uncovered)
                }
            }
        }

        // The root has no parent to wait for, so it must already be covered.
        let (with_monitor, covered, _) = dfs(&root);
        with_monitor.min(covered)
    }
}
