impl Solution {
    // The pair set of any valid tree is exactly its ancestor pairs, so a
    // node's adjacency names all of its ancestors and all of its
    // descendants at once. The root pairs with every other value, so the
    // largest degree must be V-1, where V is the number of distinct
    // values. Walk the values in decreasing degree order, placing each
    // one: every neighbor of v that is already placed has degree at
    // least v's, hence is an ancestor of v in every valid tree, and the
    // smallest-degree such neighbor is the deepest one — v's parent. An
    // ancestor's adjacency must then swallow v's whole adjacency minus
    // the parent itself; a neighbor of v outside the parent's adjacency
    // means no tree realizes the pairs (0). A parent whose degree
    // equals v's differs from v exactly by the pair between them — the
    // two can be swapped, so more than one tree exists (2). Otherwise
    // every parent is forced and exactly one tree exists (1).
    pub fn check_ways(pairs: Vec<Vec<i32>>) -> i32 {
        let mut adj = vec![vec![false; 501]; 501];
        let mut deg = vec![0i32; 501];
        for pair in &pairs {
            let (x, y) = (pair[0] as usize, pair[1] as usize);
            adj[x][y] = true;
            adj[y][x] = true;
            deg[x] += 1;
            deg[y] += 1;
        }
        let mut order: Vec<usize> = (1..=500).filter(|&v| deg[v] > 0).collect();
        order.sort_by(|&a, &b| deg[b].cmp(&deg[a]));
        let mut placed = vec![false; 501];
        placed[order[0]] = true;
        if deg[order[0]] as usize != order.len() - 1 {
            return 0;
        }
        let mut multiple = false;
        for &v in &order[1..] {
            let mut parent = 0usize;
            for u in 1..=500 {
                if adj[v][u] && placed[u] && (parent == 0 || deg[u] < deg[parent]) {
                    parent = u;
                }
            }
            if parent == 0 {
                return 0;
            }
            let mut contained = true;
            for w in 1..=500 {
                if adj[v][w] && w != parent && !adj[parent][w] {
                    contained = false;
                    break;
                }
            }
            if !contained {
                return 0;
            }
            if deg[parent] == deg[v] {
                multiple = true;
            }
            placed[v] = true;
        }
        if multiple {
            2
        } else {
            1
        }
    }
}
