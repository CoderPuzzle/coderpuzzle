impl Solution {
    pub fn possible_bipartition(n: i32, dislikes: Vec<Vec<i32>>) -> bool {
        let n = n as usize;
        // Dislike is symmetric, so build an undirected adjacency list: the
        // unions below need, for every person, everyone that person avoids.
        let mut adjacency: Vec<Vec<usize>> = vec![Vec::new(); n + 1];
        for d in &dislikes {
            let a = d[0] as usize;
            let b = d[1] as usize;
            adjacency[a].push(b);
            adjacency[b].push(a);
        }

        let mut parent: Vec<usize> = (0..=n).collect();

        // Path-halving: splice every other node directly under its
        // grandparent, flattening the tree while walking to the root.
        fn find(parent: &mut [usize], mut x: usize) -> usize {
            while parent[x] != x {
                parent[x] = parent[parent[x]];
                x = parent[x];
            }
            x
        }

        // Everyone a person dislikes must land in one set (the opposite
        // group), so union them all onto that person's first enemy.
        for person in 1..=n {
            let avoided = &adjacency[person];
            for i in 1..avoided.len() {
                let ra = find(&mut parent, avoided[0]);
                let rb = find(&mut parent, avoided[i]);
                if ra != rb {
                    parent[ra] = rb;
                }
            }
        }

        // The split works exactly when no dislike pair ended up merged.
        for d in &dislikes {
            if find(&mut parent, d[0] as usize) == find(&mut parent, d[1] as usize) {
                return false;
            }
        }
        true
    }
}
