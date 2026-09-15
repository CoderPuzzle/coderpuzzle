// A Kruskal minimum spanning forest annotated for max-edge queries:
// uniting the edges cheapest first leaves, between every pair of nodes, a
// tree path whose largest edge is as small as the graph allows, so "some
// path uses only edges < limit" reduces to reading that one tree path's
// maximum off a binary-lifting table.
pub struct DistanceLimitedPathsExist {
    depth: Vec<i32>,
    root_of: Vec<usize>,
    levels: usize,
    up: Vec<Vec<usize>>,
    max_edge: Vec<Vec<i32>>,
}

impl DistanceLimitedPathsExist {
    pub fn new(n: i32, edgeList: Vec<Vec<i32>>) -> Self {
        let n = n as usize;
        // Kruskal: sorting by distance and uniting components turns the
        // accepted edges into one minimum spanning tree per component.
        let mut edges = edgeList;
        edges.sort_by_key(|edge| edge[2]);
        let mut parent: Vec<usize> = (0..n).collect();
        let mut adjacency: Vec<Vec<(usize, i32)>> = vec![Vec::with_capacity(4); n];
        for edge in edges {
            let (u, v, dis) = (edge[0] as usize, edge[1] as usize, edge[2]);
            let (root_u, root_v) = (find(&mut parent, u), find(&mut parent, v));
            if root_u != root_v {
                parent[root_u] = root_v;
                adjacency[u].push((v, dis));
                adjacency[v].push((u, dis));
            }
        }

        // One BFS per component fixes each node's root, depth, and parent
        // edge. A root's own parent entry stays (itself, 0), so a lifting
        // hop never runs off the top of its tree.
        let mut depth = vec![0i32; n];
        let mut root_of: Vec<usize> = (0..n).collect();
        let mut parent0: Vec<usize> = (0..n).collect();
        let mut weight0 = vec![0i32; n];
        let mut visited = vec![false; n];
        let mut queue: Vec<usize> = Vec::with_capacity(n);
        for start in 0..n {
            if visited[start] {
                continue;
            }
            visited[start] = true;
            queue.clear();
            queue.push(start);
            let mut head = 0;
            while head < queue.len() {
                let node = queue[head];
                head += 1;
                for &(neighbor, dis) in &adjacency[node] {
                    if !visited[neighbor] {
                        visited[neighbor] = true;
                        root_of[neighbor] = start;
                        depth[neighbor] = depth[node] + 1;
                        parent0[neighbor] = node;
                        weight0[neighbor] = dis;
                        queue.push(neighbor);
                    }
                }
            }
        }

        // Lifting levels: up[j][node] is the 2^j-th ancestor and max_edge
        // the largest weight on that hop — two half-hops glued together.
        let deepest = depth.iter().copied().max().unwrap_or(0) as usize;
        let levels = (usize::BITS - (deepest + 1).leading_zeros()).max(1) as usize;
        let mut up = vec![parent0; levels];
        let mut max_edge = vec![weight0; levels];
        for j in 1..levels {
            for node in 0..n {
                let half = up[j - 1][node];
                up[j][node] = up[j - 1][half];
                max_edge[j][node] = max_edge[j - 1][node].max(max_edge[j - 1][half]);
            }
        }
        DistanceLimitedPathsExist {
            depth,
            root_of,
            levels,
            up,
            max_edge,
        }
    }

    pub fn query(&mut self, p: i32, q: i32, limit: i32) -> bool {
        let (p, q) = (p as usize, q as usize);
        // Distinct spanning trees means no path exists at any limit.
        if self.root_of[p] != self.root_of[q] {
            return false;
        }
        if p == q {
            return true;
        }
        let mut best = 0;
        let (mut a, mut b) = if self.depth[p] >= self.depth[q] { (p, q) } else { (q, p) };
        // Lift the deeper node level by level until both depths match,
        // collecting every edge weight the hops pass over.
        let mut diff = (self.depth[a] - self.depth[b]) as usize;
        let mut level = 0;
        while diff != 0 {
            if diff & 1 == 1 {
                best = best.max(self.max_edge[level][a]);
                a = self.up[level][a];
            }
            diff >>= 1;
            level += 1;
        }
        if a == b {
            return best < limit;
        }
        // Lift both together while their 2^level ancestors differ — that
        // stops just below the LCA — then take the final parent edges.
        for j in (0..self.levels).rev() {
            if self.up[j][a] != self.up[j][b] {
                best = best.max(self.max_edge[j][a]).max(self.max_edge[j][b]);
                a = self.up[j][a];
                b = self.up[j][b];
            }
        }
        best = best.max(self.max_edge[0][a]).max(self.max_edge[0][b]);
        best < limit
    }
}

fn find(parent: &mut [usize], mut x: usize) -> usize {
    while parent[x] != x {
        parent[x] = parent[parent[x]];
        x = parent[x];
    }
    x
}
