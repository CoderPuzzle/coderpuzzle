impl Solution {
    // path_to walks a target home in a straight line: every node recorded
    // is a strict ancestor-or-self of the target.
    fn path_to(root: &TreeNode, target: i32) -> Vec<i32> {
        let mut path = Vec::new();
        let mut node = root;
        while node.val != target {
            path.push(node.val);
            node = if target < node.val {
                node.left.as_deref().unwrap()
            } else {
                node.right.as_deref().unwrap()
            };
        }
        path.push(target);
        path
    }

    pub fn lowest_common_ancestor(root: Option<Box<TreeNode>>, p: i32, q: i32) -> i32 {
        let root = root.unwrap();
        // Two written-down paths instead of one simultaneous descent.
        let first = Self::path_to(&root, p);
        let second = Self::path_to(&root, q);
        // Shared entries are exactly the shared ancestors; read both lists
        // in lockstep until they split (or one ends, when one target sits
        // above the other) and report the last value they agreed on.
        let mut answer = first[0];
        for i in 0..first.len().min(second.len()) {
            if first[i] != second[i] {
                break;
            }
            answer = first[i];
        }
        answer
    }
}
