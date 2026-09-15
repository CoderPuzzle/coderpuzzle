// bundle-provided type (not editable here; the judge assembles its definition
// into every submission):
//   TreeNode:  { field val: i32, left/right: Option<Box<TreeNode>> }

impl Solution {
    pub fn get_target_copy(
        original: Option<Box<TreeNode>>,
        cloned: Option<Box<TreeNode>>,
        target: i32,
    ) -> Option<Box<TreeNode>> {
        // Parallel preorder over shared references: identical shapes keep
        // every pair aligned, and the returned subtree is rebuilt from
        // detached boxes so ownership stays single. Detaching uses take(),
        // which would corrupt the input — instead the walk records nothing
        // and a second function rebuilds the path from values below.
        //
        // Simpler correct route under unique values: find the root-to-node
        // path of `target` in `original` by value, then follow the same
        // left/right sequence in `cloned`, detaching along the way.
        let mut path: Vec<bool> = Vec::new(); // true = left, false = right
        {
            let mut stack: Vec<(&TreeNode, Vec<bool>)> = Vec::new();
            if let Some(root) = original.as_deref() {
                stack.push((root, Vec::new()));
            }
            while let Some((node, steps)) = stack.pop() {
                if node.val == target {
                    path = steps;
                    break;
                }
                if let Some(left) = node.left.as_deref() {
                    let mut l = steps.clone();
                    l.push(true);
                    stack.push((left, l));
                }
                if let Some(right) = node.right.as_deref() {
                    let mut r = steps.clone();
                    r.push(false);
                    stack.push((right, r));
                }
            }
        }
        let mut cursor = cloned?;
        for go_left in path {
            let next = if go_left {
                cursor.left.take()
            } else {
                cursor.right.take()
            };
            match next {
                Some(child) => cursor = child,
                None => return None,
            }
        }
        Some(cursor)
    }
}
