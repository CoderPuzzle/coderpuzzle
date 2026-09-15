/**
 * @param {number[][]} logs
 * @param {number} n
 * @return {number}
 */
var earliestAcq = function (logs, n) {
    const parent = new Array(n).fill(0).map((_, i) => i);
    // Path-halving find keeps the trees shallow across replays.
    const find = (a) => {
        while (parent[a] !== a) {
            parent[a] = parent[parent[a]];
            a = parent[a];
        }
        return a;
    };
    // Replay events chronologically; the component counter tracks the group
    // count so no global scan is ever needed.
    const sorted = logs.slice().sort((a, b) => a[0] - b[0]);
    let components = n;
    for (const [timestamp, x, y] of sorted) {
        const rx = find(x),
            ry = find(y);
        // Redundant (already-friends) events merge nothing.
        if (rx !== ry) {
            parent[rx] = ry;
            components--;
            // This merge closed the last divide: everyone is acquainted.
            if (components === 1) {
                return timestamp;
            }
        }
    }
    return -1;
};
