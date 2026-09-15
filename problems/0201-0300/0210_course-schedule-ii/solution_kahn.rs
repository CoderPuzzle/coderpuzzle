impl Solution {
    pub fn find_order(num_courses: i32, prerequisites: Vec<Vec<i32>>) -> Vec<i32> {
        let n = num_courses as usize;
        // A valid order is exactly a topological ordering of the graph where
        // each pair [course, prereq] is the edge prereq -> course.
        let mut adjacency: Vec<Vec<usize>> = vec![Vec::new(); n];
        let mut indegree = vec![0i32; n];
        for pair in &prerequisites {
            let course = pair[0] as usize;
            let prereq = pair[1] as usize;
            adjacency[prereq].push(course);
            indegree[course] += 1;
        }
        // Kahn's algorithm: start from every course with no prerequisites.
        let mut queue: Vec<usize> = Vec::with_capacity(n);
        for i in 0..n {
            if indegree[i] == 0 {
                queue.push(i);
            }
        }
        let mut order: Vec<i32> = Vec::with_capacity(n);
        let mut head = 0usize;
        while head < queue.len() {
            let node = queue[head];
            head += 1;
            order.push(node as i32);
            // Emitting a course consumes its edges: dependents lose one
            // prerequisite, and any that reaches zero becomes available.
            let neighbors = std::mem::take(&mut adjacency[node]);
            for nxt in neighbors {
                indegree[nxt] -= 1;
                if indegree[nxt] == 0 {
                    queue.push(nxt);
                }
            }
        }
        // A shortfall means a cycle kept positive indegrees forever; the
        // problem requires an empty list rather than a partial order.
        if order.len() == n {
            order
        } else {
            Vec::new()
        }
    }
}
