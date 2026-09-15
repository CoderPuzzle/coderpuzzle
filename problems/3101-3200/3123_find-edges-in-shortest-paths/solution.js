/**
 * @param {number} n
 * @param {number[][]} edges
 * @return {boolean[]}
 */
var findAnswer = function (n, edges) {
    const adj = Array.from({ length: n }, () => []);
    for (const [u, v, w] of edges) {
        adj[u].push([v, w]);
        adj[v].push([u, w]);
    }

    const INF = Infinity;

    function dijkstra(src) {
        const dist = new Array(n).fill(INF);
        dist[src] = 0;
        const pq = new MinHeap();
        pq.push([0, src]);
        while (pq.size() > 0) {
            const [d, u] = pq.pop();
            // stale entry: dist[u] was improved after this was pushed
            if (d !== dist[u]) {
                continue;
            }
            for (const [v, w] of adj[u]) {
                const nd = d + w;
                if (nd < dist[v]) {
                    dist[v] = nd;
                    pq.push([nd, v]);
                }
            }
        }
        return dist;
    }

    function MinHeap() {
        this.a = [];
    }
    MinHeap.prototype.size = function () {
        return this.a.length;
    };
    MinHeap.prototype.push = function (item) {
        const a = this.a;
        a.push(item);
        let i = a.length - 1;
        while (i > 0) {
            const par = (i - 1) >> 1;
            if (a[par][0] <= a[i][0]) break;
            [a[par], a[i]] = [a[i], a[par]];
            i = par;
        }
    };
    MinHeap.prototype.pop = function () {
        const a = this.a;
        const top = a[0];
        const last = a.pop();
        if (a.length > 0) {
            a[0] = last;
            let i = 0;
            for (;;) {
                const l = 2 * i + 1,
                    r = 2 * i + 2;
                let m = i;
                if (l < a.length && a[l][0] < a[m][0]) m = l;
                if (r < a.length && a[r][0] < a[m][0]) m = r;
                if (m === i) break;
                [a[m], a[i]] = [a[i], a[m]];
                i = m;
            }
        }
        return top;
    };

    const dist0 = dijkstra(0);
    const distN = dijkstra(n - 1);
    // reference length every shortest 0 -> n-1 path must match
    const total = dist0[n - 1];
    // unreachable: no edge lies on a shortest path
    if (total === INF) {
        return new Array(edges.length).fill(false);
    }

    const ans = [];
    for (const [u, v, w] of edges) {
        // on a shortest path iff d0(one end) + w + dN(other end) == total,
        // tested both ways since the undirected edge may be crossed either way
        if (dist0[u] + w + distN[v] === total || dist0[v] + w + distN[u] === total) {
            ans.push(true);
        } else {
            ans.push(false);
        }
    }
    return ans;
};
