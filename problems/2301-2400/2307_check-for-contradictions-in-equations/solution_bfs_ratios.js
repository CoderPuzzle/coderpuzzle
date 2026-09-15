/**
 * @param {string[][]} equations
 * @param {number[]} values
 * @return {boolean}
 */
var checkContradictions = function (equations, values) {
    const EPS = 1e-5;
    const id = new Map();
    const adj = [];

    function getId(s) {
        if (!id.has(s)) {
            id.set(s, adj.length);
            adj.push([]);
        }
        return id.get(s);
    }

    for (let i = 0; i < equations.length; i++) {
        const a = getId(equations[i][0]);
        const b = getId(equations[i][1]);
        const w = values[i];
        adj[b].push([a, w]);
        adj[a].push([b, 1 / w]);
    }

    const ratio = new Array(adj.length).fill(0); // 0 marks unvisited; labels are positive
    for (let root = 0; root < adj.length; root++) {
        if (ratio[root] !== 0) continue;
        ratio[root] = 1.0;
        const queue = [root];
        for (let head = 0; head < queue.length; head++) {
            const x = queue[head];
            for (const [y, factor] of adj[x]) {
                if (ratio[y] === 0) {
                    ratio[y] = ratio[x] * factor;
                    queue.push(y);
                }
            }
        }
    }

    for (let i = 0; i < equations.length; i++) {
        const a = getId(equations[i][0]);
        const b = getId(equations[i][1]);
        const w = values[i];
        if (Math.abs(ratio[a] / ratio[b] - w) > EPS) return true;
    }
    return false;
};
