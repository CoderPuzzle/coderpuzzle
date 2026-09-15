function canFinish(numCourses: number, prerequisites: number[][]): boolean {
    // Each pair [course, prereq] is an edge prereq -> course; all courses can
    // finish exactly when this graph is acyclic.
    const adjacency: number[][] = Array.from({ length: numCourses }, () => []);
    for (const [course, prereq] of prerequisites) {
        adjacency[prereq].push(course);
    }
    // Three-color DFS: 0 = unvisited, 1 = on the current DFS path, 2 = fully
    // explored. Meeting a neighbor colored 1 is a back edge, i.e. a cycle.
    const color: number[] = new Array(numCourses).fill(0);
    // The DFS runs on an explicit stack of (node, next-child-index) frames so
    // a long chain of prerequisites cannot overflow the call stack.
    for (let start = 0; start < numCourses; start++) {
        if (color[start] !== 0) continue;
        color[start] = 1;
        const stack: number[][] = [[start, 0]];
        while (stack.length > 0) {
            const frame = stack[stack.length - 1];
            const node = frame[0];
            if (frame[1] < adjacency[node].length) {
                const nxt = adjacency[node][frame[1]];
                frame[1] += 1;
                if (color[nxt] === 1) {
                    return false;
                }
                if (color[nxt] === 0) {
                    color[nxt] = 1;
                    stack.push([nxt, 0]);
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
    return true;
}
