impl Solution {
    pub fn count_pairs(n: i32, edges: Vec<Vec<i32>>) -> i64 {
        let n = n as usize;
        // reachability in an undirected graph is an equivalence, so the answer
        // is all pairs minus the pairs inside one connected component
        let mut parent: Vec<usize> = (0..n).collect();
        let mut size = vec![1usize; n];

        fn find(parent: &mut [usize], mut x: usize) -> usize {
            // first pass locates the root, second rewires every visited node
            // directly to it: path compression without recursion
            let mut root = x;
            while parent[root] != root {
                root = parent[root];
            }
            while parent[x] != root {
                let next = parent[x];
                parent[x] = root;
                x = next;
            }
            root
        }

        for e in &edges {
            let mut ra = find(&mut parent, e[0] as usize);
            let mut rb = find(&mut parent, e[1] as usize);
            if ra != rb {
                // union by size: the smaller tree hangs off the larger's root,
                // keeping trees shallow; size[root] stays the component's count
                if size[ra] < size[rb] {
                    std::mem::swap(&mut ra, &mut rb);
                }
                parent[rb] = ra;
                size[ra] += size[rb];
            }
        }

        let total_pairs = n as i64 * (n as i64 - 1) / 2;
        // each component is counted exactly once, at its root; its C(s, 2)
        // pairs are mutually reachable, every other pair is not
        let mut reachable: i64 = 0;
        for v in 0..n {
            if find(&mut parent, v) == v {
                reachable += size[v] as i64 * (size[v] as i64 - 1) / 2;
            }
        }
        total_pairs - reachable
    }
}
