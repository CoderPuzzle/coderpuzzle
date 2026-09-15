/**
 * @param {number[]} favorite
 * @return {number}
 */
var maximumInvitations = function (favorite) {
    const n = favorite.length;
    // favorite defines a functional graph: disjoint cycles with in-trees
    // hanging off them.
    const indeg = new Array(n).fill(0);
    for (const f of favorite) {
        indeg[f]++;
    }

    // Kahn-style peel of the acyclic nodes: after it, depth[v] is the node
    // count of the longest chain of non-cycle employees leading directly
    // into v (at least 1 — itself), i.e. the arm length a 2-cycle can
    // absorb on that side.
    const depth = new Array(n).fill(1);
    const queue = [];
    for (let i = 0; i < n; i++) {
        if (indeg[i] === 0) {
            queue.push(i);
        }
    }
    for (let head = 0; head < queue.length; head++) {
        const u = queue[head];
        const v = favorite[u];
        if (depth[u] + 1 > depth[v]) {
            depth[v] = depth[u] + 1;
        }
        if (--indeg[v] === 0) {
            queue.push(v);
        }
    }

    // Whatever still has positive indegree is a cycle node. A seating is
    // either one whole cycle >= 3 (outsiders can't join: every neighbor seat
    // is taken) or 2-cycles with both chains — and several pairs can share
    // one table, so those add up.
    let maxCycle = 0;
    let pairSum = 0;
    const visited = new Array(n).fill(false);
    for (let i = 0; i < n; i++) {
        if (indeg[i] > 0 && !visited[i]) {
            let cycleLen = 0;
            let cur = i;
            while (!visited[cur]) {
                visited[cur] = true;
                cycleLen++;
                cur = favorite[cur];
            }
            if (cycleLen === 2) {
                // The pair sits together; each side takes one chain.
                pairSum += depth[i] + depth[favorite[i]];
            } else if (cycleLen > maxCycle) {
                maxCycle = cycleLen;
            }
        }
    }
    return Math.max(maxCycle, pairSum);
};
