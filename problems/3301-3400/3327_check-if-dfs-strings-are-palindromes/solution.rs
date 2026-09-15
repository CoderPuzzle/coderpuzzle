impl Solution {
    pub fn find_answer(parent: Vec<i32>, s: String) -> Vec<bool> {
        let n = parent.len();
        let s = s.as_bytes();
        let mut children: Vec<Vec<usize>> = vec![Vec::new(); n];
        for i in 1..n {
            children[parent[i] as usize].push(i);
        }

        // Postorder tour of the whole tree: dfs(x) appends every subtree
        // string of x before s[x], so the subtree of node i is exactly the
        // tour segment of length size[i] ending at i's own position. The
        // stack version below visits children in decreasing order, whose
        // reverse is the required postorder (children increasing, node
        // last).
        let mut pre: Vec<usize> = Vec::with_capacity(n);
        let mut stack: Vec<usize> = vec![0];
        while let Some(v) = stack.pop() {
            pre.push(v);
            for &c in &children[v] {
                stack.push(c);
            }
        }
        let mut tour = vec![b'?'; n];
        let mut pos = vec![0usize; n];
        let mut size = vec![1usize; n];
        for (idx, &v) in pre.iter().rev().enumerate() {
            tour[idx] = s[v];
            pos[v] = idx;
        }
        for &v in pre.iter().rev() {
            if parent[v] >= 0 {
                size[parent[v] as usize] += size[v];
            }
        }

        // Manacher's algorithm on the tour: p[i] is the palindrome radius
        // at center i of the '#' interleaving. A substring [l, r] is a
        // palindrome iff the radius at its transformed center l + r + 1
        // covers its full length, so each node costs one comparison.
        let m = 2 * n + 1;
        let mut t = vec![b'#'; m];
        for i in 0..n {
            t[2 * i + 1] = tour[i];
        }
        let mut p = vec![0usize; m];
        let mut center = 0usize;
        let mut right = 0usize;
        for i in 0..m {
            if i < right {
                p[i] = (right - i).min(p[2 * center - i]);
            }
            while i >= p[i] + 1 && i + p[i] + 1 < m && t[i - p[i] - 1] == t[i + p[i] + 1] {
                p[i] += 1;
            }
            if i + p[i] > right {
                center = i;
                right = i + p[i];
            }
        }

        (0..n).map(|i| p[2 * pos[i] + 2 - size[i]] >= size[i]).collect()
    }
}
