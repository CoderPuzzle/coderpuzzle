/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {number[]}
 */
var findOrder = function (numCourses, prerequisites) {
    // A valid order is exactly a topological ordering of the graph where each
    // pair [course, prereq] is the edge prereq -> course.
    const adjacency = Array.from({ length: numCourses }, () => []);
    for (const [course, prereq] of prerequisites) {
        adjacency[prereq].push(course);
    }
    // Three-color DFS: 0 = unvisited, 1 = on the current DFS path, 2 = fully
    // explored. Meeting a neighbor colored 1 is a back edge, i.e. a cycle.
    const color = new Array(numCourses).fill(0);
    // The DFS runs on an explicit stack of (node, next-child-index) frames so
    // a long chain of prerequisites cannot overflow the call stack.
    const order = [];
    for (let start = 0; start < numCourses; start++) {
        if (color[start] !== 0) continue;
        color[start] = 1;
        const stack = [[start, 0]];
        while (stack.length > 0) {
            const frame = stack[stack.length - 1];
            const node = frame[0];
            if (frame[1] < adjacency[node].length) {
                const nxt = adjacency[node][frame[1]];
                frame[1] += 1;
                if (color[nxt] === 1) {
                    return [];
                }
                if (color[nxt] === 0) {
                    color[nxt] = 1;
                    stack.push([nxt, 0]);
                }
            } else {
                // When a frame runs out of children its node is fully
                // explored: color it 2 and append it after every course that
                // depends on it.
                color[node] = 2;
                order.push(node);
                stack.pop();
            }
        }
    }
    // Reversing the postorder puts every prerequisite before the courses that
    // depend on it; a back edge short-circuits with an empty list.
    order.reverse();
    return order;
};
