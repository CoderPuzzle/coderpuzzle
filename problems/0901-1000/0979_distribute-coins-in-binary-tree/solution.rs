impl Solution {
    pub fn distribute_coins(root: Option<Box<TreeNode>>) -> i32 {
        fn dfs(node: &Option<Box<TreeNode>>, moves: &mut i32) -> i32 {
            match node {
                None => 0,
                Some(n) => {
                    let left = dfs(&n.left, moves);
                    let right = dfs(&n.right, moves);
                    // Each |excess| is the flow on that child edge; flows on
                    // separate edges never interfere, so summing them is the
                    // total moves.
                    *moves += left.abs() + right.abs();
                    // Keep one coin for this node; the rest is the
                    // parent-bound flow (the subtree's excess).
                    n.val + left + right - 1
                }
            }
        }
        let mut moves = 0;
        dfs(&root, &mut moves);
        moves
    }
}
