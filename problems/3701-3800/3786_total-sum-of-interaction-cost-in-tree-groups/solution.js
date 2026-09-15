/**
 * @param {number} n
 * @param {number[][]} edges
 * @param {number[]} group
 * @return {number}
 */
var interactionCosts = function (n, edges, group) {
    // One slot per group label; labels are 1..20.
    const labels = 21;

    const adjacency = Array.from({ length: n }, () => []);
    for (const [u, v] of edges) {
        adjacency[u].push(v);
        adjacency[v].push(u);
    }

    const total = new Array(labels).fill(0);
    for (const label of group) {
        total[label] += 1;
    }

    // Breadth-first discovery from node 0 records each node's parent;
    // an explicit queue keeps deep trees off the call stack.
    const parent = new Array(n).fill(-1);
    const order = [0];
    for (let index = 0; index < order.length; index++) {
        const node = order[index];
        for (const neighbor of adjacency[node]) {
            if (neighbor !== parent[node]) {
                parent[neighbor] = node;
                order.push(neighbor);
            }
        }
    }

    // counts[node * labels + label] = same-label nodes inside node's
    // subtree. Reverse discovery order visits children before parents,
    // so each node's block is complete when its turn comes.
    const counts = new Array(n * labels).fill(0);
    let answer = 0;
    for (let index = order.length - 1; index >= 1; index--) {
        const node = order[index];
        const base = node * labels;
        counts[base + group[node]] += 1;
        const parentBase = parent[node] * labels;
        for (let label = 1; label < labels; label++) {
            const inside = counts[base + label];
            if (inside > 0) {
                // Every same-group pair split by the parent edge pays
                // exactly one unit on this edge.
                answer += inside * (total[label] - inside);
                counts[parentBase + label] += inside;
            }
        }
    }
    return answer;
};
