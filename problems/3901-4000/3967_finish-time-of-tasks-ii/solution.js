/**
 * @param {number} n
 * @param {number[][]} edges
 * @param {number[]} baseTime
 * @return {number}
 */
var finishTime = function (n, edges, baseTime) {
    // Rerooting DP: down[] finishes each side with the parent direction
    // excluded, up[] mirrors the value flowing back from the parent side.
    // Every answer is <= n * max(baseTime) <= 10^10, well under 2^53, so all
    // Number arithmetic here stays exact.
    const adjacency = Array.from({ length: n }, () => []);
    for (const [u, v] of edges) {
        adjacency[u].push(v);
        adjacency[v].push(u);
    }
    const parent = new Array(n).fill(-1);
    parent[0] = -2;
    const order = [0];
    for (let head = 0; head < order.length; ++head) {
        for (const next of adjacency[order[head]]) {
            if (parent[next] === -1) {
                parent[next] = order[head];
                order.push(next);
            }
        }
    }
    const down = new Array(n).fill(0);
    for (let i = n - 1; i >= 0; --i) {
        const v = order[i];
        let low = Infinity;
        let high = -Infinity; // smallest / largest finish among the children
        for (const w of adjacency[v]) {
            if (w !== parent[v]) {
                low = Math.min(low, down[w]);
                high = Math.max(high, down[w]);
            }
        }
        // A leaf role stops at the task's own duration.
        down[v] = low === Infinity ? baseTime[v] : high + (high - low) + baseTime[v];
    }
    const up = new Array(n).fill(0);
    let best = Infinity;
    for (const v of order) {
        const incoming = []; // values flowing into v from every incident direction
        const slots = new Map(); // child -> slot of its down[] entry in incoming
        for (const w of adjacency[v]) {
            if (w !== parent[v]) {
                slots.set(w, incoming.length);
                incoming.push(down[w]);
            }
        }
        if (v !== 0) incoming.push(up[v]);
        if (incoming.length === 0) return baseTime[v]; // n == 1: lone task as root
        // Two smallest / two largest entries, positions kept apart so one
        // branch can be excluded without losing a duplicated extreme.
        let low1 = Infinity,
            low2 = Infinity,
            high1 = -Infinity,
            high2 = -Infinity;
        let lowSlot = -1;
        let highSlot = -1;
        for (let i = 0; i < incoming.length; ++i) {
            const value = incoming[i];
            if (value < low1) {
                low2 = low1;
                low1 = value;
                lowSlot = i;
            } else if (value < low2) {
                low2 = value;
            }
            if (value > high1) {
                high2 = high1;
                high1 = value;
                highSlot = i;
            } else if (value > high2) {
                high2 = value;
            }
        }
        best = Math.min(best, high1 + (high1 - low1) + baseTime[v]);
        for (const [child, slot] of slots) {
            const restLow = slot === lowSlot ? low2 : low1;
            const restHigh = slot === highSlot ? high2 : high1;
            if (incoming.length === 1) {
                // Without this branch the neighbour plays a leaf role.
                up[child] = baseTime[v];
            } else {
                up[child] = restHigh + (restHigh - restLow) + baseTime[v];
            }
        }
    }
    return best;
};
