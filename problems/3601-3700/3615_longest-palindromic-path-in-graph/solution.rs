impl Solution {
    pub fn max_len(n: i32, edges: Vec<Vec<i32>>, label: String) -> i32 {
        let n = n as usize;
        let mut adj: Vec<Vec<usize>> = vec![Vec::new(); n];
        for e in &edges {
            let u = e[0] as usize;
            let v = e[1] as usize;
            adj[u].push(v);
            adj[v].push(u);
        }
        let codes: Vec<u8> = label.bytes().collect();
        let mut memo: Vec<i32> = vec![-1; (1usize << n) * n * n];

        // dp(mask, left, right): best length reachable when mask is the visited
        // set and left/right are the path endpoints. Invariant: the visited
        // nodes spell a palindrome read from left to right.
        fn dp(
            adj: &Vec<Vec<usize>>,
            codes: &Vec<u8>,
            memo: &mut Vec<i32>,
            n: usize,
            mask: usize,
            left: usize,
            right: usize,
        ) -> i32 {
            let idx = (mask * n + left) * n + right;
            if memo[idx] >= 0 {
                return memo[idx];
            }
            // The standing path already spells a palindrome, so its length is
            // the floor every extension must beat.
            let mut best = mask.count_ones() as i32;
            // Grow outward by one matched pair: u glues onto the left end, v
            // onto the right end; they must be distinct, unvisited, and equally
            // labeled so the path stays palindromic.
            for &u in &adj[left] {
                if (mask >> u) & 1 == 1 {
                    continue;
                }
                for &v in &adj[right] {
                    if u == v || (mask >> v) & 1 == 1 {
                        continue;
                    }
                    if codes[u] != codes[v] {
                        continue;
                    }
                    let cand = dp(adj, codes, memo, n, mask | (1usize << u) | (1usize << v), u, v);
                    if cand > best {
                        best = cand;
                    }
                }
            }
            memo[idx] = best;
            best
        }

        // Every palindrome has a center: seed odd paths from each single node
        // and even paths from each equal-label adjacent pair.
        let mut answer: i32 = 1;
        for i in 0..n {
            let length = dp(&adj, &codes, &mut memo, n, 1usize << i, i, i);
            if length > answer {
                answer = length;
            }
        }
        for e in &edges {
            let u = e[0] as usize;
            let v = e[1] as usize;
            if codes[u] == codes[v] {
                let length = dp(&adj, &codes, &mut memo, n, (1usize << u) | (1usize << v), u, v);
                if length > answer {
                    answer = length;
                }
            }
        }
        answer
    }
}
