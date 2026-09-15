/**
 * @param {number[][]} workers
 * @param {number[][]} bikes
 * @return {number[]}
 */
var assignBikes = function (workers, bikes) {
    // Build one (distance, worker index, bike index) triple per pair and
    // sort ascending by distance, then worker index, then bike index —
    // exactly the tie-break the statement specifies. Walking the sorted
    // triples and assigning the first time both sides are still free
    // reproduces the statement's own greedy process.
    const n = workers.length;
    const m = bikes.length;
    const triples = [];
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
            const distance = Math.abs(workers[i][0] - bikes[j][0]) + Math.abs(workers[i][1] - bikes[j][1]);
            triples.push([distance, i, j]);
        }
    }
    triples.sort((a, b) => a[0] - b[0] || a[1] - b[1] || a[2] - b[2]);

    const result = new Array(n).fill(-1);
    const usedBike = new Array(m).fill(false);
    let assigned = 0;
    for (const [, i, j] of triples) {
        if (result[i] !== -1 || usedBike[j]) continue;
        result[i] = j;
        usedBike[j] = true;
        assigned++;
        if (assigned === n) break;
    }
    return result;
};
