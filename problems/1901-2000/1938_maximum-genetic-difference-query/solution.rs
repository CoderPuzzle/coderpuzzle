impl Solution {
    pub fn max_genetic_difference(parents: Vec<i32>, queries: Vec<Vec<i32>>) -> Vec<i32> {
        const BITS: i32 = 18;
        let n = parents.len();
        let mut children: Vec<Vec<usize>> = vec![Vec::new(); n];
        let mut root: usize = 0;
        for (i, &p) in parents.iter().enumerate() {
            if p == -1 {
                root = i;
            } else {
                children[p as usize].push(i);
            }
        }

        let mut by_node: Vec<Vec<(i32, usize)>> = vec![Vec::new(); n];
        for (idx, q) in queries.iter().enumerate() {
            by_node[q[0] as usize].push((q[1], idx));
        }

        let mut ans = vec![0i32; queries.len()];

        // trie stored as flat vectors: children[bit] indices and subtree counts
        let mut nxt: Vec<[usize; 2]> = vec![[0, 0]];
        let mut count: Vec<i64> = vec![0];

        fn insert(x: i32, delta: i64, nxt: &mut Vec<[usize; 2]>, count: &mut Vec<i64>) {
            let mut node = 0usize;
            count[node] += delta;
            for b in (0..BITS).rev() {
                let bit = ((x >> b) & 1) as usize;
                if nxt[node][bit] == 0 {
                    nxt[node][bit] = nxt.len();
                    nxt.push([0, 0]);
                    count.push(0);
                }
                node = nxt[node][bit];
                count[node] += delta;
            }
        }

        fn query_max(x: i32, nxt: &Vec<[usize; 2]>, count: &Vec<i64>) -> i32 {
            let mut node = 0usize;
            let mut res = 0i32;
            for b in (0..BITS).rev() {
                let bit = ((x >> b) & 1) as usize;
                let want = 1 - bit;
                let cand = nxt[node][want];
                if cand != 0 && count[cand] > 0 {
                    res |= 1 << b;
                    node = cand;
                } else {
                    node = nxt[node][bit];
                }
            }
            res
        }

        // stack of (node, exiting)
        let mut stack: Vec<(usize, bool)> = vec![(root, false)];
        while let Some((u, exiting)) = stack.pop() {
            if exiting {
                insert(u as i32, -1, &mut nxt, &mut count);
                continue;
            }
            stack.push((u, true));
            insert(u as i32, 1, &mut nxt, &mut count);
            for &(val, idx) in &by_node[u] {
                ans[idx] = query_max(val, &nxt, &count);
            }
            for &v in &children[u] {
                stack.push((v, false));
            }
        }

        ans
    }
}
