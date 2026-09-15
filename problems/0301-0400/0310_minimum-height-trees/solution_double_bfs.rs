use std::collections::VecDeque;

impl Solution {
    pub fn find_min_height_trees(n: i32, edges: Vec<Vec<i32>>) -> Vec<i32> {
        let n = n as usize;
        let mut adjacency: Vec<Vec<usize>> = vec![Vec::new(); n];
        for e in &edges {
            let a = e[0] as usize;
            let b = e[1] as usize;
            adjacency[a].push(b);
            adjacency[b].push(a);
        }
        // Two-shot diameter: the farthest node from any start is one end of
        // a longest path, and the farthest node from there is the other end.
        let u = farthest_from(0, n, &adjacency).0;
        let (v, dist, parent) = farthest_from(u, n, &adjacency);
        // Climb v back to u along discovery parents: the diameter path.
        let d = dist[v] as usize;
        let mut path: Vec<usize> = Vec::new();
        let mut x = v as i64;
        while x != -1 {
            path.push(x as usize);
            x = parent[x as usize];
        }
        // The minimal-height roots are the path's middle: one node when the
        // diameter has an even number of edges, two adjacent middles when odd.
        if d % 2 == 0 {
            return vec![path[d / 2] as i32];
        }
        let (a, b) = (path[d / 2], path[d / 2 + 1]);
        if a < b {
            vec![a as i32, b as i32]
        } else {
            vec![b as i32, a as i32]
        }
    }
}

// One BFS from src: returns the farthest node from src, the distance of
// every node, and the parent each node was discovered through.
fn farthest_from(src: usize, n: usize, adjacency: &Vec<Vec<usize>>) -> (usize, Vec<i64>, Vec<i64>) {
    let mut dist: Vec<i64> = vec![-1; n];
    let mut parent: Vec<i64> = vec![-1; n];
    dist[src] = 0;
    let mut queue: VecDeque<usize> = VecDeque::new();
    queue.push_back(src);
    while let Some(u) = queue.pop_front() {
        for &v in &adjacency[u] {
            if dist[v] < 0 {
                dist[v] = dist[u] + 1;
                parent[v] = u as i64;
                queue.push_back(v);
            }
        }
    }
    let mut best = 0;
    for i in 1..n {
        if dist[i] > dist[best] {
            best = i;
        }
    }
    (best, dist, parent)
}
