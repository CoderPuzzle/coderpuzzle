impl Solution {
    pub fn number_of_edges_added(n: i32, edges: Vec<Vec<i32>>) -> i32 {
        let n = n as usize;
        let mut parent: Vec<usize> = (0..n).collect();
        let mut size = vec![1usize; n];
        let mut color = vec![0i32; n]; // absolute color of each node within its component
        let mut members: Vec<Vec<usize>> = (0..n).map(|i| vec![i]).collect(); // per-root member lists

        // membership only: path halving, no parity bookkeeping
        let find = |parent: &mut Vec<usize>, x: usize| -> usize {
            let mut cur = x;
            while parent[cur] != cur {
                parent[cur] = parent[parent[cur]];
                cur = parent[cur];
            }
            cur
        };

        let mut added = 0i32;
        for e in &edges {
            let u = e[0] as usize;
            let v = e[1] as usize;
            let w = e[2];
            let mut ru = find(&mut parent, u);
            let mut rv = find(&mut parent, v);
            if ru == rv {
                // the standing path parity is color[u] ^ color[v]: an O(1) verdict
                if (color[u] ^ color[v]) == w {
                    added += 1;
                }
            } else {
                if size[ru] < size[rv] {
                    std::mem::swap(&mut ru, &mut rv); // ru is now the larger root
                }
                if (color[u] ^ color[v]) != w {
                    // recolor the smaller component: every relation inside it
                    // survives a uniform flip, while the new edge's demand flips
                    for &m in members[rv].iter() {
                        color[m] ^= 1;
                    }
                }
                parent[rv] = ru;
                size[ru] += size[rv];
                let absorbed = std::mem::take(&mut members[rv]);
                members[ru].extend(absorbed);
                added += 1;
            }
        }
        added
    }
}
