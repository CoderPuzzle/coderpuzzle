function minScore(n: number, roads: number[][]): number {
    // A path may reuse roads, so every road whose two endpoints are
    // reachable from city 1 belongs to some valid path. Discover the
    // component by walking it: build the adjacency list, flood outward
    // from city 1 with an explicit stack, then take the smallest
    // distance among the roads the flood reached.
    const adjacency: number[][] = Array.from({ length: n + 1 }, () => []);
    for (const [a, b] of roads) {
        adjacency[a].push(b);
        adjacency[b].push(a);
    }

    const reached = new Array<boolean>(n + 1).fill(false);
    reached[1] = true;
    const stack: number[] = [1];
    while (stack.length > 0) {
        const city = stack.pop()!;
        for (const other of adjacency[city]) {
            if (!reached[other]) {
                reached[other] = true;
                stack.push(other);
            }
        }
    }

    let best = 1000000000;
    for (const [a, b, d] of roads) {
        if (reached[a] && d < best) best = d;
    }
    return best;
}
