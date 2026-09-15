/**
 * @param {number[]} windows
 * @param {number[]} queries
 * @return {number[]}
 */
var simulationResult = function (windows, queries) {
    // The final stack lists windows by their most recent last touch,
    // with never-queried windows keeping their original order below.
    // Reading the queries backwards and appending each window not yet
    // appended emits exactly that: last touches newest-first, earlier
    // presses skipped because only the final press sets a window's
    // height. The second pass over windows appends the untouched rest
    // in its original order. Ids stay far below 2^53.
    const seen = new Array(windows.length + 1).fill(false);
    const result = [];
    for (let i = queries.length - 1; i >= 0; --i) {
        const query = queries[i];
        if (!seen[query]) {
            seen[query] = true;
            result.push(query);
        }
    }
    for (const window of windows) {
        if (!seen[window]) {
            seen[window] = true;
            result.push(window);
        }
    }
    return result;
};
