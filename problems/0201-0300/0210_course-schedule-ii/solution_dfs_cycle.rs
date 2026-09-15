impl Solution {
    pub fn find_order(num_courses: i32, prerequisites: Vec<Vec<i32>>) -> Vec<i32> {
        let n = num_courses as usize;
        // A valid order is exactly a topological ordering of the graph where
        // each pair [course, prereq] is the edge prereq -> course.
        let mut adjacency: Vec<Vec<usize>> = vec![Vec::new(); n];
        for pair in &prerequisites {
            let course = pair[0] as usize;
            let prereq = pair[1] as usize;
            adjacency[prereq].push(course);
        }
        // Three-color DFS: 0 = unvisited, 1 = on the current DFS path, 2 = fully
        // explored. Meeting a neighbor colored 1 is a back edge, i.e. a cycle.
        let mut color = vec![0i32; n];
        // The DFS runs on an explicit stack of (node, next-child-index) frames
        // so a long chain of prerequisites cannot overflow the call stack.
        let mut order: Vec<i32> = Vec::with_capacity(n);
        for start in 0..n {
            if color[start] != 0 {
                continue;
            }
            color[start] = 1;
            let mut stack: Vec<(usize, usize)> = Vec::new();
            stack.push((start, 0));
            while let Some(frame) = stack.last_mut() {
                let node = frame.0;
                if frame.1 < adjacency[node].len() {
                    let nxt = adjacency[node][frame.1];
                    frame.1 += 1;
                    if color[nxt] == 1 {
                        return Vec::new();
                    }
                    if color[nxt] == 0 {
                        color[nxt] = 1;
                        stack.push((nxt, 0));
                    }
                } else {
                    // When a frame runs out of children its node is fully
                    // explored: color it 2 and append it after every course
                    // that depends on it.
                    color[node] = 2;
                    order.push(node as i32);
                    stack.pop();
                }
            }
        }
        // Reversing the postorder puts every prerequisite before the courses
        // that depend on it; a back edge short-circuits with an empty list.
        order.into_iter().rev().collect()
    }
}
