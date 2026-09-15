function specialNodes(n: number, edges: number[][], x: number, y: number, z: number): number {
    const adjacency: number[][] = Array.from({ length: n }, () => []);
    for (const [u, v] of edges) {
        adjacency[u].push(v);
        adjacency[v].push(u);
    }

    // Every tree edge has unit weight, so a breadth-first search from a
    // target reaches nodes in increasing distance order. The explicit
    // frontier array keeps a 10^5-node path off the call stack.
    const distances = (source: number): number[] => {
        const dist: number[] = new Array(n).fill(-1);
        dist[source] = 0;
        const frontier: number[] = [source];
        for (let index = 0; index < frontier.length; index++) {
            const node = frontier[index];
            for (const neighbor of adjacency[node]) {
                if (dist[neighbor] < 0) {
                    dist[neighbor] = dist[node] + 1;
                    frontier.push(neighbor);
                }
            }
        }
        return dist;
    };

    const dx = distances(x);
    const dy = distances(y);
    const dz = distances(z);

    let answer = 0;
    for (let node = 0; node < n; node++) {
        const [a, b, c] = [dx[node], dy[node], dz[node]].sort((p, q) => p - q);
        // Squares reach 2 * 10^10, far below 2^53: exact as numbers.
        if (a * a + b * b === c * c) {
            answer += 1;
        }
    }
    return answer;
}
