function findOrder(numCourses: number, prerequisites: number[][]): number[] {
    // A valid order is exactly a topological ordering of the graph where
    // each pair [course, prereq] is the edge prereq -> course.
    const adjacency: number[][] = Array.from({ length: numCourses }, () => []);
    const indegree = new Array<number>(numCourses).fill(0);
    for (const [course, prereq] of prerequisites) {
        adjacency[prereq].push(course);
        indegree[course] += 1;
    }
    // Kahn's algorithm: start from every course with no prerequisites.
    const queue: number[] = [];
    for (let i = 0; i < numCourses; i++) {
        if (indegree[i] === 0) {
            queue.push(i);
        }
    }
    const order: number[] = [];
    let head = 0;
    while (head < queue.length) {
        const node = queue[head++];
        order.push(node);
        // Emitting a course consumes its edges: dependents lose one
        // prerequisite, and any that reaches zero becomes available.
        for (const nxt of adjacency[node]) {
            indegree[nxt] -= 1;
            if (indegree[nxt] === 0) {
                queue.push(nxt);
            }
        }
    }
    // A shortfall means a cycle kept positive indegrees forever; the problem
    // requires an empty list rather than a partial order.
    if (order.length === numCourses) {
        return order;
    }
    return [];
}
