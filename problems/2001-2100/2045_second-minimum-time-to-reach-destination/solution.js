/**
 * @param {number} n
 * @param {number[][]} edges
 * @param {number} time
 * @param {number} change
 * @return {number}
 */
var secondMinimum = function (n, edges, time, change) {
    const graph = Array.from({ length: n + 1 }, () => []);
    for (const [left, right] of edges) {
        graph[left].push(right);
        graph[right].push(left);
    }

    const infinity = 2147483647;
    const first = new Int32Array(n + 1);
    const second = new Int32Array(n + 1);
    first.fill(infinity);
    second.fill(infinity);
    first[1] = 0;
    const queue = [[1, 0]];

    for (let head = 0; head < queue.length; ++head) {
        const [vertex, distance] = queue[head];
        const nextDistance = distance + 1;
        for (const neighbor of graph[vertex]) {
            if (nextDistance < first[neighbor]) {
                second[neighbor] = first[neighbor];
                first[neighbor] = nextDistance;
                queue.push([neighbor, nextDistance]);
            } else if (first[neighbor] < nextDistance && nextDistance < second[neighbor]) {
                second[neighbor] = nextDistance;
                queue.push([neighbor, nextDistance]);
            }
        }
    }

    let elapsed = 0;
    for (let step = 0; step < second[n]; ++step) {
        if (Math.floor(elapsed / change) % 2 === 1) {
            elapsed = (Math.floor(elapsed / change) + 1) * change;
        }
        elapsed += time;
    }
    return elapsed;
};
