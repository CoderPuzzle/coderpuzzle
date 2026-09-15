impl Solution {
    pub fn minimum_cost(n: i32, edges: Vec<Vec<i32>>, query: Vec<Vec<i32>>) -> Vec<i32> {
        let n = n as usize;
        // Walks may repeat edges, so the optimum ANDs in every edge of the component.
        let mut parent: Vec<usize> = (0..n).collect();
        let mut size = vec![1usize; n];

        // Union-find: path halving in find, union by size at the merge below.
        fn find(parent: &mut Vec<usize>, mut x: usize) -> usize {
            while parent[x] != x {
                parent[x] = parent[parent[x]];
                x = parent[x];
            }
            x
        }

        for e in &edges {
            let mut ra = find(&mut parent, e[0] as usize);
            let mut rb = find(&mut parent, e[1] as usize);
            if ra == rb {
                continue;
            }
            if size[ra] < size[rb] {
                std::mem::swap(&mut ra, &mut rb);
            }
            parent[rb] = ra;
            size[ra] += size[rb];
        }

        // AND every edge weight into its component, keyed by root.
        let mut comp_and: std::collections::HashMap<usize, i32> = std::collections::HashMap::new();
        for e in &edges {
            let r = find(&mut parent, e[0] as usize);
            let entry = comp_and.entry(r).or_insert(e[2]);
            if *entry != e[2] {
                *entry &= e[2];
            }
        }

        // Different roots mean no walk exists; same root answers with the AND.
        let mut ans: Vec<i32> = Vec::with_capacity(query.len());
        for q in &query {
            let rs = find(&mut parent, q[0] as usize);
            let rt = find(&mut parent, q[1] as usize);
            if rs != rt {
                ans.push(-1);
            } else {
                ans.push(comp_and[&rs]);
            }
        }
        ans
    }
}
