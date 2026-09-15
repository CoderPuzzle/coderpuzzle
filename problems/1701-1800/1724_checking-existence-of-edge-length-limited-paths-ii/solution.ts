// A Kruskal minimum spanning forest annotated for max-edge queries:
// uniting the edges cheapest first leaves, between every pair of nodes, a
// tree path whose largest edge is as small as the graph allows, so "some
// path uses only edges < limit" reduces to reading that one tree path's
// maximum off a binary-lifting table.
class DistanceLimitedPathsExist {
    private depth: number[];
    private rootOf: number[];
    private levels: number;
    private up: number[][];
    private maxEdge: number[][];

    constructor(n: number, edgeList: number[][]) {
        // Kruskal: sorting by distance and uniting components turns the
        // accepted edges into one minimum spanning tree per component.
        const edges = [...edgeList].sort((a, b) => a[2] - b[2]);
        const parent = Array.from({ length: n }, (_, node) => node);
        const adjacency: [number, number][][] = Array.from({ length: n }, () => []);
        for (const [u, v, dis] of edges) {
            const rootU = this.find(parent, u);
            const rootV = this.find(parent, v);
            if (rootU !== rootV) {
                parent[rootU] = rootV;
                adjacency[u].push([v, dis]);
                adjacency[v].push([u, dis]);
            }
        }

        // One BFS per component fixes each node's root, depth, and parent
        // edge. A root's own parent entry stays (itself, 0), so a lifting
        // hop never runs off the top of its tree.
        this.depth = new Array<number>(n).fill(0);
        this.rootOf = Array.from({ length: n }, (_, node) => node);
        const parent0 = Array.from({ length: n }, (_, node) => node);
        const weight0 = new Array<number>(n).fill(0);
        const visited = new Array<boolean>(n).fill(false);
        for (let start = 0; start < n; start++) {
            if (visited[start]) {
                continue;
            }
            visited[start] = true;
            const queue = [start];
            for (let head = 0; head < queue.length; head++) {
                const node = queue[head];
                for (const [neighbor, dis] of adjacency[node]) {
                    if (!visited[neighbor]) {
                        visited[neighbor] = true;
                        this.rootOf[neighbor] = start;
                        this.depth[neighbor] = this.depth[node] + 1;
                        parent0[neighbor] = node;
                        weight0[neighbor] = dis;
                        queue.push(neighbor);
                    }
                }
            }
        }

        // Lifting levels: up[j][node] is the 2^j-th ancestor and maxEdge
        // the largest weight on that hop — two half-hops glued together.
        let deepest = 0;
        for (const value of this.depth) {
            deepest = Math.max(deepest, value);
        }
        this.levels = Math.max(1, 32 - Math.clz32(deepest + 1));
        this.up = Array.from({ length: this.levels }, () => parent0.slice());
        this.maxEdge = Array.from({ length: this.levels }, () => weight0.slice());
        for (let j = 1; j < this.levels; j++) {
            for (let node = 0; node < n; node++) {
                const half = this.up[j - 1][node];
                this.up[j][node] = this.up[j - 1][half];
                this.maxEdge[j][node] = Math.max(this.maxEdge[j - 1][node], this.maxEdge[j - 1][half]);
            }
        }
    }

    query(p: number, q: number, limit: number): boolean {
        // Distinct spanning trees means no path exists at any limit.
        if (this.rootOf[p] !== this.rootOf[q]) {
            return false;
        }
        if (p === q) {
            return true;
        }
        let best = 0;
        let a = p;
        let b = q;
        if (this.depth[a] < this.depth[b]) {
            a = q;
            b = p;
        }
        // Lift the deeper node level by level until both depths match,
        // collecting every edge weight the hops pass over.
        let diff = this.depth[a] - this.depth[b];
        let level = 0;
        while (diff !== 0) {
            if (diff & 1) {
                best = Math.max(best, this.maxEdge[level][a]);
                a = this.up[level][a];
            }
            diff >>= 1;
            level++;
        }
        if (a === b) {
            return best < limit;
        }
        // Lift both together while their 2^level ancestors differ — that
        // stops just below the LCA — then take the final parent edges.
        for (let j = this.levels - 1; j >= 0; j--) {
            if (this.up[j][a] !== this.up[j][b]) {
                best = Math.max(best, this.maxEdge[j][a], this.maxEdge[j][b]);
                a = this.up[j][a];
                b = this.up[j][b];
            }
        }
        best = Math.max(best, this.maxEdge[0][a], this.maxEdge[0][b]);
        return best < limit;
    }

    private find(parent: number[], x: number): number {
        while (parent[x] !== x) {
            parent[x] = parent[parent[x]];
            x = parent[x];
        }
        return x;
    }
}
