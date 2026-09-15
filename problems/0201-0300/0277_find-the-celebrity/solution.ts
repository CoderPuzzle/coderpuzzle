function findCelebrity(graph: number[][]): number {
    const n = graph.length;
    // Elimination pass: a candidate that knows nobody else.
    let candidate = 0;
    for (let i = 1; i < n; i++) {
        if (graph[candidate][i] === 1) candidate = i;
    }
    // Verification pass.
    for (let i = 0; i < n; i++) {
        if (i === candidate) continue;
        if (graph[candidate][i] === 1) return -1; // candidate knows someone
        if (graph[i][candidate] === 0) return -1; // someone does not know the candidate
    }
    return candidate;
}
