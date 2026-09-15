use std::collections::HashSet;

impl Solution {
    // intersect() counts DISTINCT shared integers, so each row first
    // collapses to a set: [1, 1] and [1, 1] share only the value 1.
    // Pairwise set intersections then spell out the edges, and an iterative
    // stack DFS counts the components.
    pub fn number_of_components(properties: Vec<Vec<i32>>, k: i32) -> i32 {
        let n = properties.len();
        let sets: Vec<HashSet<i32>> = properties.iter().map(|row| row.iter().copied().collect()).collect();
        let mut adjacency: Vec<Vec<usize>> = vec![Vec::new(); n];
        for i in 0..n {
            for j in (i + 1)..n {
                let shared = sets[i].intersection(&sets[j]).count();
                if shared as i32 >= k {
                    adjacency[i].push(j);
                    adjacency[j].push(i);
                }
            }
        }
        let mut seen = vec![false; n];
        let mut components = 0;
        let mut stack: Vec<usize> = Vec::new();
        for start in 0..n {
            if seen[start] {
                continue;
            }
            components += 1;
            // Mark on push so a node never enters the stack twice.
            seen[start] = true;
            stack.push(start);
            while let Some(node) = stack.pop() {
                for &neighbor in &adjacency[node] {
                    if !seen[neighbor] {
                        seen[neighbor] = true;
                        stack.push(neighbor);
                    }
                }
            }
        }
        components
    }
}
