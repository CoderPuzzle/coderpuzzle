impl Solution {
    pub fn can_finish(num_courses: i32, prerequisites: Vec<Vec<i32>>) -> bool {
        let n = num_courses as usize;
        // Each pair [course, prereq] is an edge prereq -> course; all courses
        // can finish exactly when this graph is acyclic.
        let mut adjacency: Vec<Vec<usize>> = vec![Vec::new(); n];
        let mut indegree = vec![0i32; n];
        for pair in &prerequisites {
            let course = pair[0] as usize;
            let prereq = pair[1] as usize;
            adjacency[prereq].push(course);
            indegree[course] += 1;
        }
        // Kahn's algorithm: seed with every course that has no prerequisites.
        let mut queue: Vec<usize> = Vec::with_capacity(n);
        for i in 0..n {
            if indegree[i] == 0 {
                queue.push(i);
            }
        }
        let mut taken = 0usize;
        let mut head = 0usize;
        while head < queue.len() {
            let node = queue[head];
            head += 1;
            taken += 1;
            // Taking a course removes its outgoing edges.
            let neighbors = std::mem::take(&mut adjacency[node]);
            for nxt in neighbors {
                indegree[nxt] -= 1;
                if indegree[nxt] == 0 {
                    queue.push(nxt);
                }
            }
        }
        // Courses inside a cycle never reach indegree zero, so a shortfall
        // means a cycle trapped the remainder.
        taken == n
    }
}
