impl Solution {
    pub fn min_camera_cover(root: Option<Box<TreeNode>>) -> i32 {
        // States: 0 = uncovered, 1 = has a camera, 2 = covered.
        fn dfs(node: &Option<Box<TreeNode>>, cameras: &mut i32) -> i32 {
            match node {
                // Null reports covered so leaves start uncovered and push
                // the first camera one level up.
                None => 2,
                Some(n) => {
                    let left = dfs(&n.left, cameras);
                    let right = dfs(&n.right, cameras);
                    if left == 0 || right == 0 {
                        // An uncovered child forces a camera here — the
                        // parent of an uncovered node is always the best
                        // placement.
                        *cameras += 1;
                        1
                    } else if left == 1 || right == 1 {
                        2
                    } else {
                        0
                    }
                }
            }
        }
        let mut cameras = 0;
        if dfs(&root, &mut cameras) == 0 {
            cameras += 1;
        }
        cameras
    }
}
