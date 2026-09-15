impl Solution {
    pub fn most_similar(n: i32, roads: Vec<Vec<i32>>, names: Vec<String>, targetPath: Vec<String>) -> Vec<i32> {
        let n = n as usize;
        let mut adjacency: Vec<Vec<usize>> = vec![Vec::new(); n];
        for road in &roads {
            let a = road[0] as usize;
            let b = road[1] as usize;
            adjacency[a].push(b);
            adjacency[b].push(a);
        }

        let path_length = targetPath.len();
        let mut dp = vec![vec![0_i32; n]; path_length];
        let mut parent = vec![vec![-1_i32; n]; path_length];
        for city in 0..n {
            dp[0][city] = if names[city] == targetPath[0] { 0 } else { 1 };
        }

        for i in 1..path_length {
            for city in 0..n {
                let mut best_parent: i32 = -1;
                let mut best_cost: i32 = -1;
                for &neighbor in &adjacency[city] {
                    let candidate = dp[i - 1][neighbor];
                    if best_parent == -1 || candidate < best_cost {
                        best_cost = candidate;
                        best_parent = neighbor as i32;
                    }
                }
                let mismatch_cost = if names[city] == targetPath[i] { 0 } else { 1 };
                dp[i][city] = best_cost + mismatch_cost;
                parent[i][city] = best_parent;
            }
        }

        let mut end_city = 0;
        for city in 1..n {
            if dp[path_length - 1][city] < dp[path_length - 1][end_city] {
                end_city = city;
            }
        }

        let mut path = vec![0_i32; path_length];
        let mut city = end_city;
        for i in (0..path_length).rev() {
            path[i] = city as i32;
            city = parent[i][city] as usize;
        }
        path
    }
}
