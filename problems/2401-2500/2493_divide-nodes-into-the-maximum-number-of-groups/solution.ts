function magnificentSets(n: number, edges: number[][]): number {
    const graph: number[][] = Array.from({ length: n + 1 }, () => []);
    for (const [a, b] of edges) {
        graph[a].push(b);
        graph[b].push(a);
    }

    const visited: boolean[] = new Array(n + 1).fill(false);
    let total = 0;

    for (let start = 1; start <= n; start++) {
        if (visited[start]) {
            continue;
        }
        // collect the connected component
        const component: number[] = [];
        const stack: number[] = [start];
        visited[start] = true;
        while (stack.length > 0) {
            const u = stack.pop()!;
            component.push(u);
            for (const v of graph[u]) {
                if (!visited[v]) {
                    visited[v] = true;
                    stack.push(v);
                }
            }
        }

        let best = 0;
        const dist: number[] = new Array(n + 1).fill(0);
        for (const source of component) {
            dist.fill(-1);
            dist[source] = 0;
            const queue: number[] = [source];
            let maxDepth = 0;
            let bipartite = true;
            for (let head = 0; head < queue.length; head++) {
                const u = queue[head];
                for (const v of graph[u]) {
                    if (dist[v] !== -1) {
                        if (dist[v] === dist[u]) {
                            bipartite = false;
                        }
                    } else {
                        dist[v] = dist[u] + 1;
                        if (dist[v] > maxDepth) {
                            maxDepth = dist[v];
                        }
                        queue.push(v);
                    }
                }
            }
            if (!bipartite) {
                return -1;
            }
            if (maxDepth > best) {
                best = maxDepth;
            }
        }
        total += best + 1;
    }

    return total;
}
