/**
 * @param {number} n
 * @param {number[][]} queries
 * @return {number[]}
 */
var shortestDistanceAfterQueries = function (n, queries) {
    // Every added road can only shorten paths, so nothing computed for
    // an earlier query stays reusable except the road set itself. Keep
    // an adjacency list, append each new road, then run one unweighted
    // BFS from city 0 that stops as soon as city n - 1 is settled.
    // With n, q <= 500 this recomputation per query is cheap and exact.
    const roads = Array.from({ length: n }, () => []);
    for (let i = 0; i + 1 < n; i++) roads[i].push(i + 1);
    const answer = [];
    for (const [u, v] of queries) {
        roads[u].push(v);
        const dist = new Array(n).fill(-1);
        const queue = [0];
        dist[0] = 0;
        for (let head = 0; head < queue.length; head++) {
            const node = queue[head];
            if (node === n - 1) break;
            for (const nxt of roads[node]) {
                if (dist[nxt] === -1) {
                    dist[nxt] = dist[node] + 1;
                    queue.push(nxt);
                }
            }
        }
        answer.push(dist[n - 1]);
    }
    return answer;
};
