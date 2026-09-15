/**
 * @param {number[][]} edges
 * @param {number[]} patience
 * @return {number}
 */
var networkBecomesIdle = function (edges, patience) {
    const graph = Array.from({ length: patience.length }, () => []);
    for (const [u, v] of edges) {
        graph[u].push(v);
        graph[v].push(u);
    }

    const distance = new Array(patience.length).fill(-1);
    distance[0] = 0;
    const queue = [0];
    for (let head = 0; head < queue.length; ++head) {
        const node = queue[head];
        for (const neighbor of graph[node]) {
            if (distance[neighbor] === -1) {
                distance[neighbor] = distance[node] + 1;
                queue.push(neighbor);
            }
        }
    }

    let lastArrival = 0;
    for (let server = 1; server < patience.length; ++server) {
        const roundTrip = 2 * distance[server];
        const lastSend = Math.floor((roundTrip - 1) / patience[server]) * patience[server];
        lastArrival = Math.max(lastArrival, lastSend + roundTrip);
    }
    return lastArrival + 1;
};
