impl Solution {
    pub fn maximal_path_quality(values: Vec<i32>, edges: Vec<Vec<i32>>, maxTime: i32) -> i32 {
        let mut graph = vec![Vec::<(usize, i32)>::new(); values.len()];
        for edge in edges {
            let left = edge[0] as usize;
            let right = edge[1] as usize;
            graph[left].push((right, edge[2]));
            graph[right].push((left, edge[2]));
        }

        fn search(
            node: usize,
            elapsed: i32,
            quality: i32,
            max_time: i32,
            values: &[i32],
            graph: &[Vec<(usize, i32)>],
            visits: &mut [i32],
            best: &mut i32,
        ) {
            if node == 0 {
                *best = (*best).max(quality);
            }

            for &(neighbor, travel_time) in &graph[node] {
                let next_time = elapsed + travel_time;
                if next_time > max_time {
                    continue;
                }
                let first_visit = visits[neighbor] == 0;
                visits[neighbor] += 1;
                search(
                    neighbor,
                    next_time,
                    quality + if first_visit { values[neighbor] } else { 0 },
                    max_time,
                    values,
                    graph,
                    visits,
                    best,
                );
                visits[neighbor] -= 1;
            }
        }

        let mut visits = vec![0; values.len()];
        visits[0] = 1;
        let mut best = values[0];
        search(0, 0, values[0], maxTime, &values, &graph, &mut visits, &mut best);
        best
    }
}
