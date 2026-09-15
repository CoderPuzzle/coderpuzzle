impl Solution {
    pub fn maximum_detonation(bombs: Vec<Vec<i32>>) -> i32 {
        let count = bombs.len();
        let mut graph = vec![Vec::new(); count];
        for source in 0..count {
            for target in 0..count {
                let dx = bombs[source][0] as i64 - bombs[target][0] as i64;
                let dy = bombs[source][1] as i64 - bombs[target][1] as i64;
                let radius = bombs[source][2] as i64;
                if dx * dx + dy * dy <= radius * radius {
                    graph[source].push(target);
                }
            }
        }

        let mut answer = 0_i32;
        for start in 0..count {
            let mut seen = vec![false; count];
            seen[start] = true;
            let mut stack = vec![start];
            let mut reached = 0_i32;
            while let Some(source) = stack.pop() {
                reached += 1;
                for &target in &graph[source] {
                    if !seen[target] {
                        seen[target] = true;
                        stack.push(target);
                    }
                }
            }
            answer = answer.max(reached);
        }
        answer
    }
}
