function minimumSemesters(n: number, relations: number[][]): number {
    const adjacency: number[][] = Array.from({ length: n + 1 }, () => []);
    const indegree: number[] = new Array(n + 1).fill(0);
    for (const [prev, nxt] of relations) {
        adjacency[prev].push(nxt);
        indegree[nxt] += 1;
    }
    // semester 1: every course with no prerequisites
    const queue: number[] = [];
    for (let i = 1; i <= n; i++) {
        if (indegree[i] === 0) {
            queue.push(i);
        }
    }
    let semesters = 0;
    let taken = 0;
    // Level-by-level BFS using index ranges: one range drained per semester
    // (the answer is the longest prerequisite chain).
    let start = 0;
    while (start < queue.length) {
        semesters += 1;
        const end = queue.length;
        for (let idx = start; idx < end; idx++) {
            const course = queue[idx];
            taken += 1;
            for (const nxt of adjacency[course]) {
                indegree[nxt] -= 1;
                // prerequisite count hits zero: ready for next semester
                if (indegree[nxt] === 0) {
                    queue.push(nxt);
                }
            }
        }
        start = end;
    }
    // fewer than n taken means a cycle kept some courses at indegree > 0
    return taken === n ? semesters : -1;
}
