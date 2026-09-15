/**
 * @param {number} n
 * @param {number[]} crystals
 * @param {number[]} flowFrom
 * @param {number[]} flowTo
 * @return {number}
 */
var minRunesToAdd = function (n, crystals, flowFrom, flowTo) {
    const graph = Array.from({ length: n }, () => []);
    const rgraph = Array.from({ length: n }, () => []);
    for (let e = 0; e < flowFrom.length; e++) {
        const u = flowFrom[e];
        const v = flowTo[e];
        graph[u].push(v);
        rgraph[v].push(u);
    }

    // Kosaraju SCC (iterative)
    const visited = new Uint8Array(n);
    const order = [];
    for (let start = 0; start < n; start++) {
        if (visited[start]) continue;
        const stack = [[start, 0]];
        visited[start] = 1;
        while (stack.length > 0) {
            const top = stack[stack.length - 1];
            const u = top[0];
            if (top[1] < graph[u].length) {
                const v = graph[u][top[1]];
                top[1]++;
                if (!visited[v]) {
                    visited[v] = 1;
                    stack.push([v, 0]);
                }
            } else {
                order.push(u);
                stack.pop();
            }
        }
    }

    const comp = new Int32Array(n).fill(-1);
    let cid = 0;
    for (let idx = order.length - 1; idx >= 0; idx--) {
        const start = order[idx];
        if (comp[start] !== -1) continue;
        const stack = [start];
        comp[start] = cid;
        while (stack.length > 0) {
            const u = stack.pop();
            for (const v of rgraph[u]) {
                if (comp[v] === -1) {
                    comp[v] = cid;
                    stack.push(v);
                }
            }
        }
        cid++;
    }

    const hasCrystal = new Uint8Array(cid);
    for (const c of crystals) hasCrystal[comp[c]] = 1;

    const cgraph = Array.from({ length: cid }, () => []);
    const inDeg = new Int32Array(cid);
    const seen = new Set();
    for (let u = 0; u < n; u++) {
        for (const v of graph[u]) {
            const cu = comp[u];
            const cv = comp[v];
            if (cu !== cv) {
                const key = cu * 1000000 + cv;
                if (!seen.has(key)) {
                    seen.add(key);
                    cgraph[cu].push(cv);
                    inDeg[cv]++;
                }
            }
        }
    }

    // BFS from crystal-containing components
    const good = new Uint8Array(cid);
    const q = [];
    for (let c = 0; c < cid; c++) {
        if (hasCrystal[c]) {
            good[c] = 1;
            q.push(c);
        }
    }
    for (let head = 0; head < q.length; head++) {
        const u = q[head];
        for (const v of cgraph[u]) {
            if (!good[v]) {
                good[v] = 1;
                q.push(v);
            }
        }
    }

    let ans = 0;
    for (let c = 0; c < cid; c++) {
        if (!good[c] && inDeg[c] === 0) ans++;
    }
    return ans;
};
