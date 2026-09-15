function minimumTime(n: number, relations: number[][], time: number[]): number {
    const adjacency: number[][] = Array.from({ length: n + 1 }, () => []);
    const indegree: number[] = new Array(n + 1).fill(0);
    for (const [prev, nxt] of relations) {
        adjacency[prev].push(nxt);
        indegree[nxt] += 1;
    }
    // finish[i] = earliest month at which course i completes.
    const finish: number[] = new Array(n + 1).fill(0);
    // Longest weighted chain on the prerequisite DAG: with unlimited
    // parallelism a course finishes at its duration plus the latest
    // prerequisite finish. Kahn's order makes every prerequisite final
    // before a course is processed.
    const queue: number[] = [];
    for (let i = 1; i <= n; i++) {
        if (indegree[i] === 0) {
            finish[i] = time[i - 1];
            queue.push(i);
        }
    }
    // Finishing everything means finishing the latest-ending chain.
    let answer = 0;
    // BFS using index ranges instead of shifting off the front.
    for (let start = 0; start < queue.length; start++) {
        const course = queue[start];
        if (finish[course] > answer) {
            answer = finish[course];
        }
        for (const nxt of adjacency[course]) {
            // Relax with a max: the successor waits for ALL of its
            // prerequisites, not just the first to finish.
            if (finish[course] + time[nxt - 1] > finish[nxt]) {
                finish[nxt] = finish[course] + time[nxt - 1];
            }
            indegree[nxt] -= 1;
            if (indegree[nxt] === 0) {
                queue.push(nxt);
            }
        }
    }
    return answer;
}
