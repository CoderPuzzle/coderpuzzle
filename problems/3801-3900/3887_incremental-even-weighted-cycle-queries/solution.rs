impl Solution {
    pub fn number_of_edges_added(n: i32, edges: Vec<Vec<i32>>) -> i32 {
        let n = n as usize;
        let mut parent: Vec<usize> = (0..n).collect();
        let mut rank = vec![0i32; n];
        let mut par = vec![0i32; n]; // xor distance from node to its parent

        // iterative find: returns (root, xor from x to root)
        let find = |parent: &mut Vec<usize>, par: &mut Vec<i32>, x: usize| -> (usize, i32) {
            let mut path: Vec<usize> = Vec::new();
            let mut cur = x;
            while parent[cur] != cur {
                path.push(cur);
                cur = parent[cur];
            }
            let root = cur;
            let mut xr = 0i32;
            for &node in path.iter().rev() {
                xr ^= par[node];
                parent[node] = root;
                par[node] = xr;
            }
            (root, xr)
        };

        let mut added = 0i32;
        for e in &edges {
            let u = e[0] as usize;
            let v = e[1] as usize;
            let w = e[2];
            let (ru, xu) = find(&mut parent, &mut par, u);
            let (rv, xv) = find(&mut parent, &mut par, v);
            if ru == rv {
                if (xu ^ xv) == w {
                    added += 1;
                }
            } else {
                let rel = xu ^ xv ^ w;
                if rank[ru] < rank[rv] {
                    parent[ru] = rv;
                    par[ru] = rel;
                } else if rank[ru] > rank[rv] {
                    parent[rv] = ru;
                    par[rv] = rel;
                } else {
                    parent[ru] = rv;
                    par[ru] = rel;
                    rank[rv] += 1;
                }
                added += 1;
            }
        }
        added
    }
}
