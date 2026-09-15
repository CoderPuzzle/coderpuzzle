impl Solution {
    // An explicit stack first flattens the boxed tree into index-linked
    // arena vectors (children always land above their parent), so the
    // bottom-up pass in reverse index order needs no recursion — a chain
    // can run 2000 nodes deep. info[slot] is the subtree size when the
    // subtree is perfect, else 0: a perfect internal node needs both
    // children perfect with equal sizes, and a leaf is perfect with
    // size 1.
    pub fn kth_largest_perfect_subtree(root: Option<Box<TreeNode>>, k: i32) -> i32 {
        let mut lefts: Vec<Option<usize>> = Vec::new();
        let mut rights: Vec<Option<usize>> = Vec::new();
        let mut stack: Vec<(&TreeNode, usize, bool)> = Vec::new();
        if let Some(node) = root.as_deref() {
            stack.push((node, usize::MAX, false));
        }
        while let Some((node, parent, is_left)) = stack.pop() {
            let me = lefts.len();
            lefts.push(None);
            rights.push(None);
            if parent != usize::MAX {
                if is_left {
                    lefts[parent] = Some(me);
                } else {
                    rights[parent] = Some(me);
                }
            }
            if let Some(child) = node.left.as_deref() {
                stack.push((child, me, true));
            }
            if let Some(child) = node.right.as_deref() {
                stack.push((child, me, false));
            }
        }
        let mut info: Vec<i32> = vec![0; lefts.len()];
        let mut sizes: Vec<i32> = Vec::new();
        for i in (0..lefts.len()).rev() {
            info[i] = match (lefts[i], rights[i]) {
                (None, None) => 1,
                (Some(l), Some(r)) if info[l] > 0 && info[l] == info[r] => 1 + info[l] + info[r],
                _ => 0,
            };
            if info[i] > 0 {
                sizes.push(info[i]);
            }
        }
        if k as usize > sizes.len() {
            return -1;
        }
        sizes.sort_unstable_by(|a, b| b.cmp(a));
        sizes[k as usize - 1]
    }
}
