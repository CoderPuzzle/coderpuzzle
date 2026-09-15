use std::collections::HashSet;

impl Solution {
    pub fn number_of_paths(n: i32, corridors: Vec<Vec<i32>>) -> i32 {
        let mut degree = vec![0_usize; n as usize + 1];
        for corridor in &corridors {
            degree[corridor[0] as usize] += 1;
            degree[corridor[1] as usize] += 1;
        }

        let mut forward = vec![HashSet::new(); n as usize + 1];
        for corridor in corridors {
            let mut u = corridor[0] as usize;
            let mut v = corridor[1] as usize;
            if degree[u] > degree[v] || (degree[u] == degree[v] && u > v) {
                std::mem::swap(&mut u, &mut v);
            }
            forward[u].insert(v);
        }

        let mut triangles = 0_i32;
        for u in 1..=n as usize {
            for &v in &forward[u] {
                for &w in &forward[u] {
                    if forward[v].contains(&w) {
                        triangles += 1;
                    }
                }
            }
        }
        triangles
    }
}
