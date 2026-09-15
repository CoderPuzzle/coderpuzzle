impl Solution {
    pub fn two_sum_bsts(root1: Option<Box<TreeNode>>, root2: Option<Box<TreeNode>>, target: i32) -> bool {
        let a = inorder(root1.as_deref());
        let b = inorder(root2.as_deref());
        let mut i = 0usize;
        let mut j = b.len() as isize - 1;
        while i < a.len() && j >= 0 {
            // Values reach +-1e9, so the pair sum is computed in 64 bits.
            let total = a[i] as i64 + b[j as usize] as i64;
            if total == target as i64 {
                return true;
            }
            if total < target as i64 {
                i += 1;
            } else {
                j -= 1;
            }
        }
        false
    }
}

// Lists a BST's values ascending; iterative because a degenerate 5000-node
// tree would recurse past the smallest judged stacks.
fn inorder(root: Option<&TreeNode>) -> Vec<i32> {
    let mut values = Vec::new();
    let mut stack: Vec<&TreeNode> = Vec::new();
    let mut node = root;
    while !stack.is_empty() || node.is_some() {
        while let Some(current) = node {
            stack.push(current);
            node = current.left.as_deref();
        }
        let current = stack.pop().expect("non-empty stack");
        values.push(current.val);
        node = current.right.as_deref();
    }
    values
}
