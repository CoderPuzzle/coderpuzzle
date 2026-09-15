impl Solution {
    pub fn can_finish(num_courses: i32, prerequisites: Vec<Vec<i32>>) -> bool {
        let n = num_courses as usize;
        // Each pair [course, prereq] is an edge prereq -> course; all courses
        // can finish exactly when this graph is acyclic.
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
                        return false;
                    }
                    if color[nxt] == 0 {
                        color[nxt] = 1;
                        stack.push((nxt, 0));
                    }
                } else {
                    // When a frame runs out of children its node is fully
                    // explored: color it 2 so no later sweep ever descends into
                    // it again.
                    color[node] = 2;
                    stack.pop();
                }
            }
        }
        true
    }
}
