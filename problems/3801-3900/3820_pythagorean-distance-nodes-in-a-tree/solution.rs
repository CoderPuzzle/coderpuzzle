impl Solution {
    pub fn special_nodes(n: i32, edges: Vec<Vec<i32>>, x: i32, y: i32, z: i32) -> i32 {
        let n = n as usize;
        let mut adjacency: Vec<Vec<usize>> = vec![Vec::new(); n];
        for edge in &edges {
            let (u, v) = (edge[0] as usize, edge[1] as usize);
            adjacency[u].push(v);
            adjacency[v].push(u);
        }

        // Every tree edge has unit weight, so a breadth-first search from a
        // target reaches nodes in increasing distance order. The explicit
        // frontier vector keeps a 10^5-node path off the call stack.
        let distances = |source: usize| -> Vec<i32> {
            let mut dist = vec![-1_i32; n];
            dist[source] = 0;
            let mut frontier: Vec<usize> = Vec::with_capacity(n);
            frontier.push(source);
            let mut index = 0;
            while index < frontier.len() {
                let node = frontier[index];
                index += 1;
                for &neighbor in &adjacency[node] {
                    if dist[neighbor] < 0 {
                        dist[neighbor] = dist[node] + 1;
                        frontier.push(neighbor);
                    }
                }
            }
            dist
        };

        let dx = distances(x as usize);
        let dy = distances(y as usize);
        let dz = distances(z as usize);

        let mut answer = 0;
        for node in 0..n {
            let mut triple = [dx[node], dy[node], dz[node]];
            triple.sort_unstable();
            // Distances stay below 10^5, so squares reach 10^10: widen the
            // sorted triple before squaring.
            let (a, b, c) = (triple[0] as i64, triple[1] as i64, triple[2] as i64);
            if a * a + b * b == c * c {
                answer += 1;
            }
        }
        answer
    }
}
