impl Solution {
    pub fn bst_from_preorder(preorder: Vec<i32>) -> Option<Box<TreeNode>> {
        Self::build(&preorder, i64::MIN, i64::MAX).0
    }

    fn build(preorder: &[i32], low: i64, high: i64) -> (Option<Box<TreeNode>>, &[i32]) {
        match preorder.split_first() {
            Some((&value, rest)) => {
                let v = value as i64;
                // outside this subtree's bounds: the value belongs to some
                // ancestor's right subtree — peek but leave it unconsumed
                if v < low || v > high {
                    return (None, preorder);
                }
                // preorder emits root, then the whole left subtree, then the
                // right one, so claiming left first matches the array order
                let (left, rest) = Self::build(rest, low, v - 1);
                let (right, rest) = Self::build(rest, v + 1, high);
                (
                    Some(Box::new(TreeNode {
                        val: value,
                        left,
                        right,
                    })),
                    rest,
                )
            }
            None => (None, preorder),
        }
    }
}
