use std::collections::HashMap;

fn intern(x: i32, y: i32, points: &mut Vec<(i32, i32)>, index: &mut HashMap<(i32, i32), usize>) -> usize {
    *index.entry((x, y)).or_insert_with(|| {
        points.push((x, y));
        points.len() - 1
    })
}

impl Solution {
    pub fn minimum_cost(start: Vec<i32>, target: Vec<i32>, specialRoads: Vec<Vec<i32>>) -> i32 {
        // By hint 1 an optimal route only ever stops at road endpoints (plus
        // start and target): any other intermediate point is dominated by
        // walking straight past it. Build that candidate set deduped, join
        // every pair with a Manhattan-priced walk, add each special road as
        // one directed edge priced at its own cost, and run Dijkstra.
        let mut points: Vec<(i32, i32)> = Vec::with_capacity(2 * specialRoads.len() + 2);
        let mut index: HashMap<(i32, i32), usize> = HashMap::new();
        let start_id = intern(start[0], start[1], &mut points, &mut index);
        let target_id = intern(target[0], target[1], &mut points, &mut index);
        let mut roads = Vec::with_capacity(specialRoads.len());
        for road in &specialRoads {
            let a = intern(road[0], road[1], &mut points, &mut index);
            let b = intern(road[2], road[3], &mut points, &mut index);
            roads.push((a, b, road[4]));
        }
        let n = points.len();
        const INF: i32 = i32::MAX;
        let mut dist = vec![INF; n];
        let mut used = vec![false; n];
        dist[start_id] = 0;
        for _round in 0..n {
            // Nearest unvisited node scan keeps the code heap-free; with at
            // most ~402 candidates the quadratic cost is negligible.
            let mut u: i32 = -1;
            for v in 0..n {
                if !used[v] && (u == -1 || dist[v] < dist[u as usize]) {
                    u = v as i32;
                }
            }
            if u == -1 || dist[u as usize] == INF {
                break;
            }
            let u = u as usize;
            used[u] = true;
            for v in 0..n {
                if used[v] {
                    continue;
                }
                let walk = dist[u] + (points[v].0 - points[u].0).abs() + (points[v].1 - points[u].1).abs();
                if walk < dist[v] {
                    dist[v] = walk;
                }
            }
            for &(a, b, cost) in &roads {
                if a == u && dist[u] + cost < dist[b] {
                    dist[b] = dist[u] + cost;
                }
            }
        }
        dist[target_id]
    }
}
