impl Solution {
    pub fn distance_limited_paths_exist(n: i32, edgeList: Vec<Vec<i32>>, queries: Vec<Vec<i32>>) -> Vec<bool> {
        let n = n as usize;
        let mut parent: Vec<usize> = (0..n).collect();
        fn find(parent: &mut [usize], mut x: usize) -> usize {
            while parent[x] != x {
                parent[x] = parent[parent[x]];
                x = parent[x];
            }
            x
        }
        // Answer offline: the edge sets usable under growing limits are
        // nested, so union-find only ever grows. Sorting query indices (not
        // the queries) lets answers return to their original positions.
        let mut edges = edgeList;
        edges.sort_by_key(|e| e[2]);
        let mut order: Vec<usize> = (0..queries.len()).collect();
        order.sort_by_key(|&i| queries[i][2]);
        let mut answer = vec![false; queries.len()];
        let mut ei = 0;
        for qi in order {
            let p = queries[qi][0] as usize;
            let q = queries[qi][1] as usize;
            let limit = queries[qi][2];
            // Union every edge strictly below the limit — the strict <
            // excludes edges of weight exactly equal to it.
            while ei < edges.len() && edges[ei][2] < limit {
                let ra = find(&mut parent, edges[ei][0] as usize);
                let rb = find(&mut parent, edges[ei][1] as usize);
                if ra != rb {
                    parent[ra] = rb;
                }
                ei += 1;
            }
            // The query reduces to a connectivity check.
            answer[qi] = find(&mut parent, p) == find(&mut parent, q);
        }
        answer
    }
}
