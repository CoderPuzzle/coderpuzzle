impl Solution {
    pub fn find_subtree_sizes(parent: Vec<i32>, s: String) -> Vec<i32> {
        let n = parent.len();
        let s = s.as_bytes();
        let mut children: Vec<Vec<usize>> = vec![Vec::new(); n];
        for i in 1..n {
            children[parent[i] as usize].push(i);
        }

        // Iterative DFS from the root. last[c] is the closest ancestor of
        // the current node holding character c; entering v saves it on the
        // stack (paired with v) and the exit visit restores it, so last[]
        // always describes the current root-to-v path. The changes are
        // simultaneous and every rewiring points at an original ancestor,
        // so resolving each node against the original tree is exact.
        // usize::MAX stands in for "no ancestor yet" (saved as -1 on the
        // stack, which stays distinct from the ENTER marker).
        let mut last = vec![usize::MAX; 26];
        let mut newparent = vec![-1i32; n];
        let mut pre: Vec<usize> = Vec::with_capacity(n);
        const ENTER: i32 = -2;
        let mut stack: Vec<(usize, i32)> = vec![(0, ENTER)];
        while let Some((v, saved)) = stack.pop() {
            let c = (s[v] - b'a') as usize;
            if saved == ENTER {
                pre.push(v);
                newparent[v] = if last[c] != usize::MAX {
                    last[c] as i32
                } else {
                    parent[v]
                };
                stack.push((v, last[c] as i32));
                last[c] = v;
                for &ch in &children[v] {
                    stack.push((ch, ENTER));
                }
            } else {
                last[c] = saved as usize;
            }
        }

        // Each new parent precedes v in preorder, so consuming preorder in
        // reverse folds subtree sizes up the final tree in one pass.
        let mut size = vec![1i32; n];
        for i in (1..n).rev() {
            let v = pre[i];
            let p = newparent[v];
            if p >= 0 {
                size[p as usize] += size[v];
            }
        }
        size
    }
}
