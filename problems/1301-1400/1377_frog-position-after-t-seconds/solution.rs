// No bundle-provided type is needed beyond plain vectors; n up to 100 keeps an arena
// decomposition unnecessary — a simple parent-marked BFS suffices.

impl Solution {
    pub fn frog_position(n: i32, edges: Vec<Vec<i32>>, t: i32, target: i32) -> f64 {
        if n == 1 {
            return 1.0;
        }
        let n = n as usize;
        let mut neighbors = vec![Vec::new(); n + 1];
        for e in &edges {
            neighbors[e[0] as usize].push(e[1] as usize);
            neighbors[e[1] as usize].push(e[0] as usize);
        }

        // BFS from vertex 1; probability splits equally among unvisited
        // children. A leaf keeps its probability: the frog stays there forever.
        let mut prob = vec![0.0f64; n + 1];
        let mut depth = vec![0usize; n + 1];
        let mut child_count = vec![0usize; n + 1];
        let mut visited = vec![false; n + 1];
        let mut queue = vec![1usize];
        prob[1] = 1.0;
        visited[1] = true;
        let mut head = 0;
        while head < queue.len() {
            let node = queue[head];
            head += 1;
            let children = neighbors[node].iter().filter(|&&nxt| !visited[nxt]).count();
            child_count[node] = children;
            if children > 0 {
                for i in 0..neighbors[node].len() {
                    let nxt = neighbors[node][i];
                    if visited[nxt] {
                        continue;
                    }
                    visited[nxt] = true;
                    depth[nxt] = depth[node] + 1;
                    prob[nxt] = prob[node] / children as f64;
                    queue.push(nxt);
                }
            }
        }

        let target = target as usize;
        let t = t as usize;
        if depth[target] == t {
            return prob[target];
        }
        if depth[target] < t && child_count[target] == 0 {
            return prob[target];
        }
        0.0
    }
}
