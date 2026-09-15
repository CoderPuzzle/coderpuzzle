/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {boolean}
 */
var canFinish = function (numCourses, prerequisites) {
    // Each pair [course, prereq] is an edge prereq -> course; all courses can
    // finish exactly when this graph is acyclic.
    const adjacency = Array.from({ length: numCourses }, () => []);
    const indegree = new Array(numCourses).fill(0);
    for (const [course, prereq] of prerequisites) {
        adjacency[prereq].push(course);
        indegree[course] += 1;
    }
    // Kahn's algorithm: seed with every course that has no prerequisites.
    const queue = [];
    for (let i = 0; i < numCourses; i++) {
        if (indegree[i] === 0) {
            queue.push(i);
        }
    }
    let taken = 0;
    let head = 0;
    while (head < queue.length) {
        const node = queue[head++];
        taken += 1;
        // Taking a course removes its outgoing edges.
        for (const nxt of adjacency[node]) {
            indegree[nxt] -= 1;
            if (indegree[nxt] === 0) {
                queue.push(nxt);
            }
        }
    }
    // Courses inside a cycle never reach indegree zero, so a shortfall means
    // a cycle trapped the remainder.
    return taken === numCourses;
};
