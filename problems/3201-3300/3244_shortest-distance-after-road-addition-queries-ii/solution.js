/**
 * @param {number} n
 * @param {number[][]} queries
 * @return {number[]}
 */
var shortestDistanceAfterQueries = function (n, queries) {
    // nxt[i] is the next hop from city i on the maintained route. A road
    // (u, v) helps only when u is still on the route and it jumps past
    // nxt[u]; splicing it in retires each leapfrogged city. Retired
    // cities never return, so total work stays linear.
    const nxt = Array.from({ length: n - 1 }, (_, i) => i + 1);
    let count = n - 1;
    const answer = [];
    for (const [u, v] of queries) {
        let j = nxt[u];
        if (j > 0 && j < v) {
            while (j < v) {
                count--;
                const t = nxt[j];
                nxt[j] = 0;
                j = t;
            }
            nxt[u] = v;
        }
        answer.push(count);
    }
    return answer;
};
