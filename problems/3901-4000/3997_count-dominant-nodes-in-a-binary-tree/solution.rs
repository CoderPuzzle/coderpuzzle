impl Solution {
    fn dom(n: &Option<Box<TreeNode>>) -> (i32, i32) {
        if let Some(v) = n {
            let (a, x) = Self::dom(&v.left);
            let (b, y) = Self::dom(&v.right);
            let m = v.val.max(a).max(b);
            (m, x + y + (v.val == m) as i32)
        } else {
            (-1, 0)
        }
    }
    pub fn count_dominant_nodes(root: Option<Box<TreeNode>>) -> i32 {
        Self::dom(&root).1
    }
}
