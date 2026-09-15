/**
 * @param {number} n
 * @param {number[][]} edges
 * @param {number[]} baseTime
 * @return {number}
 */
var finishTime = function (n, edges, baseTime) {
    const children = Array.from({ length: n }, () => []);
    for (const [parent, child] of edges) children[parent].push(child);
    const finish = new Array(n).fill(0);
    for (let node = n - 1; node >= 0; node--) {
        if (children[node].length === 0) {
            finish[node] = baseTime[node];
            continue;
        }
        let earliest = Infinity;
        let latest = -Infinity;
        for (const child of children[node]) {
            earliest = Math.min(earliest, finish[child]);
            latest = Math.max(latest, finish[child]);
        }
        const ownDuration = latest - earliest + baseTime[node];
        finish[node] = latest + ownDuration;
    }
    return finish[0];
};
