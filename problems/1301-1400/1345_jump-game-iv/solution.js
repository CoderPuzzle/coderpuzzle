/**
 * @param {number[]} arr
 * @return {number}
 */
var minJumps = function (arr) {
    const n = arr.length;
    // Start is already the target.
    if (n === 1) return 0;
    // One pass groups indices by value so a node's same-value neighbors
    // cost their group size instead of rescanning the array.
    const indices = new Map();
    for (let i = 0; i < n; i++) {
        const list = indices.get(arr[i]);
        if (list) list.push(i);
        else indices.set(arr[i], [i]);
    }
    // BFS over the implicit graph (edges i-1, i+1, same-value) gives the
    // minimum step count; -1 doubles as the visited marker.
    const dist = new Array(n).fill(-1);
    dist[0] = 0;
    const queue = [0];
    let head = 0;
    while (head < queue.length) {
        const i = queue[head++];
        const d = dist[i] + 1;
        const nexts = indices.get(arr[i]) || [];
        // Empty the group after use: every index in it just became visited
        // at the same distance, so it can never again produce an unvisited
        // neighbor — without this, all-equal arrays go quadratic.
        indices.set(arr[i], []);
        nexts.push(i - 1, i + 1);
        for (const j of nexts) {
            // Bounds check filters i-1 < 0 and i+1 >= n.
            if (j >= 0 && j < n && dist[j] === -1) {
                dist[j] = d;
                // The search ends the moment the last index is labeled.
                if (j === n - 1) return d;
                queue.push(j);
            }
        }
    }
    return dist[n - 1];
};
