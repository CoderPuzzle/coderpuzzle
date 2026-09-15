function friendRequests(n: number, restrictions: number[][], requests: number[][]): boolean[] {
    const parent: number[] = new Array(n);
    const size: number[] = new Array(n).fill(1);
    for (let i = 0; i < n; i++) {
        parent[i] = i;
    }
    const find = (start: number): number => {
        let node = start;
        while (parent[node] !== node) {
            parent[node] = parent[parent[node]];
            node = parent[node];
        }
        return node;
    };

    const answer: boolean[] = [];
    for (const [u, v] of requests) {
        let rootU = find(u);
        let rootV = find(v);
        let allowed = true;
        for (const [x, y] of restrictions) {
            const rootX = find(x);
            const rootY = find(y);
            if ((rootX === rootU && rootY === rootV) || (rootX === rootV && rootY === rootU)) {
                allowed = false;
                break;
            }
        }

        answer.push(allowed);
        if (allowed && rootU !== rootV) {
            if (size[rootU] < size[rootV]) {
                [rootU, rootV] = [rootV, rootU];
            }
            parent[rootV] = rootU;
            size[rootU] += size[rootV];
        }
    }
    return answer;
}
