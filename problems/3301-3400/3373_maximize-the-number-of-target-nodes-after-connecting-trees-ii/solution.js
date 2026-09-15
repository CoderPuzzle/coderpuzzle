/**
 * @param {number[][]} edges1
 * @param {number[][]} edges2
 * @return {number[]}
 */
var maxTargetNodes = function (edges1, edges2) {
    // In a tree, distance parity is the difference of depth parities, so
    // the nodes target to u are exactly u's own bipartition class and a
    // second-tree node v contributes its opposite class. One iterative
    // BFS per tree (a 1e5-node path would overflow the judged JS stack)
    // labels each node's parity and sizes both classes: answer[i] is
    // tree 1's class size at i's parity, plus tree 2's larger class —
    // the maximum opposite-class count over every connection node,
    // identical for every i.
    const classify = (edges) => {
        const n = edges.length + 1;
        const adj = Array.from({ length: n }, () => []);
        for (const [a, b] of edges) {
            adj[a].push(b);
            adj[b].push(a);
        }
        const parity = new Array(n).fill(-1);
        parity[0] = 0;
        const counts = [1, 0];
        const queue = [0];
        for (let head = 0; head < queue.length; head++) {
            const u = queue[head];
            for (const w of adj[u]) {
                if (parity[w] < 0) {
                    parity[w] = parity[u] ^ 1;
                    counts[parity[w]] += 1;
                    queue.push(w);
                }
            }
        }
        return { parity, counts };
    };
    const counts2 = classify(edges2).counts;
    const best2 = Math.max(counts2[0], counts2[1]);
    const { parity, counts } = classify(edges1);
    const answer = [];
    for (let u = 0; u < parity.length; u++) {
        answer.push(counts[parity[u]] + best2);
    }
    return answer;
};
