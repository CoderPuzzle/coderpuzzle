impl Solution {
    pub fn min_score(n: i32, roads: Vec<Vec<i32>>) -> i32 {
        // A path may reuse roads, so every road whose two endpoints are
        // reachable from city 1 belongs to some valid path. Discover the
        // component by walking it: build the adjacency list, flood
        // outward from city 1 with an explicit stack, then take the
        // smallest distance among the roads the flood reached.
        let n = n as usize;
        let mut adjacency: Vec<Vec<usize>> = vec![Vec::new(); n + 1];
        for r in &roads {
            let (a, b) = (r[0] as usize, r[1] as usize);
            adjacency[a].push(b);
            adjacency[b].push(a);
        }

        let mut reached = vec![false; n + 1];
        reached[1] = true;
        let mut stack: Vec<usize> = vec![1];
        while let Some(city) = stack.pop() {
            for &other in &adjacency[city] {
                if !reached[other] {
                    reached[other] = true;
                    stack.push(other);
                }
            }
        }

        let mut best = 1_000_000_000;
        for r in &roads {
            if reached[r[0] as usize] && r[2] < best {
                best = r[2];
            }
        }
        best
    }
}
