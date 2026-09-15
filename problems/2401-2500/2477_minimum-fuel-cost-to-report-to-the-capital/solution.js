/**
 * @param {number[][]} roads
 * @param {number} seats
 * @return {number}
 */
var minimumFuelCost = function (roads, seats) {
    const n = roads.length + 1;
    if (n === 1) return 0;
    const adj = Array.from({ length: n }, () => []);
    for (const [a, b] of roads) {
        adj[a].push(b);
        adj[b].push(a);
    }

    const parent = new Array(n).fill(-1);
    const seen = new Array(n).fill(false);
    seen[0] = true;
    const order = [];
    const queue = [0];
    let head = 0;
    while (head < queue.length) {
        const u = queue[head++];
        order.push(u);
        for (const v of adj[u]) {
            if (!seen[v]) {
                seen[v] = true;
                parent[v] = u;
                queue.push(v);
            }
        }
    }

    const size = new Array(n).fill(1);
    let fuel = 0;
    for (let i = order.length - 1; i >= 0; i--) {
        // children before parents
        const u = order[i];
        if (u === 0) continue;
        size[parent[u]] += size[u];
        fuel += Math.floor((size[u] + seats - 1) / seats);
    }
    return fuel;
};
