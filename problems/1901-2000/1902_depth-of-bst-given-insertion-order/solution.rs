impl Solution {
    pub fn max_depth_bst(order: Vec<i32>) -> i32 {
        // Inverting `order` gives pos[v], and the BST built by inserting
        // in that order is exactly the min-Cartesian tree of pos[1..n]:
        // the root is the first-inserted value and every subtree spans a
        // contiguous range of values. A monotonic stack over values 1..n
        // (pos increasing bottom to top) then recovers every parent in
        // O(n) — popping for v, the last value popped re-hangs as v's
        // left child, since it is the later-inserted of the two
        // value-neighbours v lands between, while a value popped earlier
        // keeps the stack-below parent it was given when pushed. Depths
        // fill in insertion order afterwards — a parent is always
        // inserted before its children — so two flat sweeps, no
        // recursion, cope with the 10^5-deep chains the constraints
        // allow.
        let n = order.len();
        let mut pos = vec![0usize; n + 1];
        for (i, v) in order.iter().enumerate() {
            pos[*v as usize] = i;
        }
        let mut parent = vec![0usize; n + 1];
        let mut stack: Vec<usize> = Vec::with_capacity(n);
        for v in 1..=n {
            let mut last = 0;
            while let Some(&top) = stack.last() {
                if pos[top] > pos[v] {
                    last = top;
                    stack.pop();
                } else {
                    break;
                }
            }
            if last > 0 {
                parent[last] = v;
            }
            if let Some(&top) = stack.last() {
                parent[v] = top;
            }
            stack.push(v);
        }
        let mut depth = vec![0i32; n + 1];
        let mut best = 0;
        for &v in &order {
            let p = parent[v as usize];
            depth[v as usize] = if p > 0 { depth[p] + 1 } else { 1 };
            best = best.max(depth[v as usize]);
        }
        best
    }
}
