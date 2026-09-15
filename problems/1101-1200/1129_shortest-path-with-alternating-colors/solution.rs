use std::collections::VecDeque;

impl Solution {
    pub fn shortest_alternating_paths(n: i32, red_edges: Vec<Vec<i32>>, blue_edges: Vec<Vec<i32>>) -> Vec<i32> {
        let n = n as usize;
        // adjacency[c][u] lists endpoints of color-c edges from u.
        let mut adjacency: Vec<Vec<Vec<usize>>> = vec![vec![Vec::new(); n]; 2];
        for edge in &red_edges {
            adjacency[0][edge[0] as usize].push(edge[1] as usize);
        }
        for edge in &blue_edges {
            adjacency[1][edge[0] as usize].push(edge[1] as usize);
        }

        // State = (node, color of the edge used to enter it): the same node
        // can be worth visiting once per incoming color, so BFS runs over the
        // 2n states of this expanded graph. Node 0 has no incoming edge, so
        // both colors are seeded at distance 0.
        let inf = usize::MAX;
        let mut dist = vec![[inf; 2]; n];
        dist[0][0] = 0; // arrived at 0 via a red edge (virtual start)
        dist[0][1] = 0;
        let mut answer = vec![-1i32; n];
        answer[0] = 0;
        let mut queue: VecDeque<(usize, usize)> = VecDeque::new();
        queue.push_back((0, 0));
        queue.push_back((0, 1));
        while let Some((node, color)) = queue.pop_front() {
            // Only edges of the opposite color may leave this state; INF
            // doubles as the visited test (BFS first arrival is minimal).
            for &nxt in &adjacency[1 - color][node] {
                if dist[nxt][1 - color] == inf {
                    dist[nxt][1 - color] = dist[node][color] + 1;
                    let value = dist[nxt][1 - color] as i32;
                    if answer[nxt] == -1 || value < answer[nxt] {
                        answer[nxt] = value;
                    }
                    queue.push_back((nxt, 1 - color));
                }
            }
        }
        answer
    }
}
