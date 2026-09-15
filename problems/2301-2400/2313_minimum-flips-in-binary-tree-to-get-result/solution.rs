use std::collections::HashMap;

impl Solution {
    pub fn minimum_flips(root: Option<Box<TreeNode>>, result: bool) -> i32 {
        let root_ref = match root.as_deref() {
            Some(r) => r,
            None => return 0,
        };
        let mut order: Vec<&TreeNode> = Vec::new();
        let mut queue: std::collections::VecDeque<&TreeNode> = std::collections::VecDeque::new();
        queue.push_back(root_ref);
        while let Some(node) = queue.pop_front() {
            order.push(node);
            if let Some(l) = node.left.as_deref() {
                queue.push_back(l);
            }
            if let Some(r) = node.right.as_deref() {
                queue.push_back(r);
            }
        }
        let n = order.len();
        let mut idx: HashMap<*const TreeNode, usize> = HashMap::with_capacity(n);
        for (i, node) in order.iter().enumerate() {
            idx.insert(*node as *const TreeNode, i);
        }
        // t[i] / f[i] = min flips to make subtree i true / false; the pair is
        // the whole DP state, and reverse BFS order finalizes children first
        let mut t = vec![0i32; n];
        let mut f = vec![0i32; n];
        for i in (0..n).rev() {
            let node = order[i];
            let v = node.val;
            let li = node.left.as_deref().map(|c| idx[&(c as *const TreeNode)]);
            let ri = node.right.as_deref().map(|c| idx[&(c as *const TreeNode)]);
            if li.is_none() && ri.is_none() {
                // leaf base: (0, 1) if already true, (1, 0) if already false
                if v == 1 {
                    t[i] = 0;
                    f[i] = 1;
                } else {
                    t[i] = 1;
                    f[i] = 0;
                }
            } else if v == 5 {
                // NOT: swap the single child's two costs
                let ci = li.or(ri).unwrap();
                t[i] = f[ci];
                f[i] = t[ci];
            } else {
                let (li, ri) = (li.unwrap(), ri.unwrap());
                let (lt, lf) = (t[li], f[li]);
                let (rt, rf) = (t[ri], f[ri]);
                if v == 2 {
                    // OR: true if either child is true; false only if both are
                    t[i] = lt.min(rt);
                    f[i] = lf + rf;
                } else if v == 3 {
                    // AND: mirror of OR - true needs both children true
                    t[i] = lt + rt;
                    f[i] = lf.min(rf);
                } else {
                    // XOR: true when the children differ, false when they match
                    t[i] = (lt + rf).min(lf + rt);
                    f[i] = (lt + rt).min(lf + rf);
                }
            }
        }
        if result {
            t[0]
        } else {
            f[0]
        }
    }
}
