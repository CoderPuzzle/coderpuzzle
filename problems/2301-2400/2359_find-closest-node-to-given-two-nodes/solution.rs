impl Solution {
    // One outgoing edge per node means the walk is forced; a node already
    // seen marks the cycle, so stop there. -1 doubles as the INF marker.
    fn distances(edges: &[i32], start: usize) -> Vec<i32> {
        let mut distance = vec![-1; edges.len()];
        let mut steps: i32 = 0;
        let mut current = start;
        while distance[current] == -1 {
            distance[current] = steps;
            current = match edges[current] {
                -1 => return distance,
                next => next as usize,
            };
            steps += 1;
        }
        distance
    }

    pub fn closest_meeting_node(edges: Vec<i32>, node1: i32, node2: i32) -> i32 {
        let from1 = Self::distances(&edges, node1 as usize);
        let from2 = Self::distances(&edges, node2 as usize);
        let mut best_node = -1;
        let mut best_max = -1; // only meaningful once best_node != -1
        for node in 0..edges.len() {
            // ascending: ties keep the smaller
            if from1[node] == -1 || from2[node] == -1 {
                continue;
            }
            let reach_max = from1[node].max(from2[node]);
            if best_node == -1 || reach_max < best_max {
                best_node = node as i32;
                best_max = reach_max;
            }
        }
        best_node
    }
}
