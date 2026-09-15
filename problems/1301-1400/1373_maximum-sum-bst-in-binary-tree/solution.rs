impl Solution {
    pub fn max_sum_bst(root: Option<Box<TreeNode>>) -> i64 {
        let mut best: i64 = 0;
        Self::dfs(root, &mut best);
        best
    }

    // None = not a BST; else Some((min, max, sum)); an empty subtree yields
    // Some((i64::MAX, i64::MIN, 0)).
    fn dfs(node: Option<Box<TreeNode>>, best: &mut i64) -> Option<(i64, i64, i64)> {
        let node = match node {
            Some(n) => n,
            None => return Some((i64::MAX, i64::MIN, 0)),
        };
        let TreeNode { val, left, right } = *node;
        let l = Self::dfs(left, best);
        let r = Self::dfs(right, best);
        let (llo, lhi, lsum) = l?;
        let (rlo, rhi, rsum) = r?;
        let v = val as i64;
        if lhi >= v || rlo <= v {
            return None;
        }
        let sum = lsum + rsum + v;
        if sum > *best {
            *best = sum;
        }
        let lo = if llo < v { llo } else { v };
        let hi = if rhi > v { rhi } else { v };
        Some((lo, hi, sum))
    }
}
