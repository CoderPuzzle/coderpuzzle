impl Solution {
    pub fn maximum_score(scores: Vec<i32>, edges: Vec<Vec<i32>>) -> i32 {
        let n = scores.len();
        let mut adj: Vec<Vec<usize>> = vec![Vec::new(); n];
        for e in &edges {
            let (a, b) = (e[0] as usize, e[1] as usize);
            adj[a].push(b);
            adj[b].push(a);
        }

        // keep only the 3 highest-scoring neighbours of each node
        // (sort_by is stable, matching Python's sorted)
        let mut top3: Vec<Vec<usize>> = Vec::with_capacity(n);
        for neighbors in &adj {
            let mut nbrs = neighbors.clone();
            nbrs.sort_by(|&x, &y| scores[y].cmp(&scores[x]));
            nbrs.truncate(3);
            top3.push(nbrs);
        }

        let mut best: i32 = -1;
        for e in &edges {
            let (a, b) = (e[0] as usize, e[1] as usize);
            let base = scores[a] + scores[b];
            for &x in &top3[a] {
                if x == b {
                    continue;
                }
                for &y in &top3[b] {
                    if y == a || x == y {
                        continue;
                    }
                    let total = base + scores[x] + scores[y];
                    if total > best {
                        best = total;
                    }
                }
            }
        }
        best
    }
}
