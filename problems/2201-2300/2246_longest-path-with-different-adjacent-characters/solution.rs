impl Solution {
    pub fn longest_path(parent: Vec<i32>, s: String) -> i32 {
        let s = s.as_bytes();
        let n = parent.len();
        let mut children: Vec<Vec<usize>> = vec![Vec::new(); n];
        for i in 1..n {
            children[parent[i] as usize].push(i);
        }

        // iterative DFS ordering (parents before children)
        let mut order: Vec<usize> = Vec::with_capacity(n);
        let mut stack: Vec<usize> = vec![0];
        while let Some(u) = stack.pop() {
            order.push(u);
            for &v in &children[u] {
                stack.push(v);
            }
        }

        let mut best: i32 = 1;
        let mut down = vec![0i32; n]; // longest valid chain starting at u, going into its subtree
        for &u in order.iter().rev() {
            let mut first = 0i32;
            let mut second = 0i32;
            for &v in &children[u] {
                let d = if s[v] != s[u] { down[v] } else { 0 };
                if d > first {
                    second = first;
                    first = d;
                } else if d > second {
                    second = d;
                }
            }
            down[u] = first + 1;
            if first + second + 1 > best {
                best = first + second + 1;
            }
        }
        best
    }
}
