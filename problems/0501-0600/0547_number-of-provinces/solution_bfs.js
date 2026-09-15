/**
 * @param {number[][]} isConnected
 * @return {number}
 */
var findCircleNum = function (isConnected) {
    const n = isConnected.length;
    const visited = new Array(n).fill(false);
    let provinces = 0;
    for (let start = 0; start < n; start++) {
        if (visited[start]) {
            continue;
        }
        // An unvisited city during the sweep starts a new component;
        // this one traversal absorbs exactly one province.
        provinces++;
        visited[start] = true;
        const queue = [start];
        // The FIFO queue spreads through the province in waves, expanding
        // every city at hop distance d before any at d + 1, yet only
        // visitation, not the order, decides the count.
        for (let head = 0; head < queue.length; head++) {
            const city = queue[head];
            for (let other = 0; other < n; other++) {
                if (isConnected[city][other] === 1 && !visited[other]) {
                    // Mark at enqueue time so no city enters the queue twice;
                    // each city is dequeued once and its adjacency row scanned
                    // once.
                    visited[other] = true;
                    queue.push(other);
                }
            }
        }
    }
    return provinces;
};
