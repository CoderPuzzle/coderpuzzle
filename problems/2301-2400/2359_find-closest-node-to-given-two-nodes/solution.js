/**
 * @param {number[]} edges
 * @param {number} node1
 * @param {number} node2
 * @return {number}
 */
var closestMeetingNode = function (edges, node1, node2) {
    // One outgoing edge per node means the walk is forced; a node already
    // seen marks the cycle, so stop there. -1 doubles as the INF marker.
    const distances = (start) => {
        const distance = new Array(edges.length).fill(-1);
        let current = start;
        let steps = 0;
        while (current !== -1 && distance[current] === -1) {
            distance[current] = steps;
            current = edges[current];
            steps += 1;
        }
        return distance;
    };
    const from1 = distances(node1);
    const from2 = distances(node2);
    let bestNode = -1;
    let bestMax = -1; // only meaningful once bestNode != -1
    for (let node = 0; node < edges.length; node++) {
        // ascending: ties keep the smaller
        if (from1[node] === -1 || from2[node] === -1) {
            continue;
        }
        const reachMax = Math.max(from1[node], from2[node]);
        if (bestNode === -1 || reachMax < bestMax) {
            bestNode = node;
            bestMax = reachMax;
        }
    }
    return bestNode;
};
