/**
 * @param {number[][]} pairs
 * @return {number}
 */
var checkWays = function (pairs) {
    // The pair set of any valid tree is exactly its ancestor pairs, so
    // a node's adjacency names all of its ancestors and all of its
    // descendants at once. The root pairs with every other value, so
    // the largest degree must be V-1, where V is the number of
    // distinct values. Walk the values in decreasing degree order,
    // placing each one: every neighbor of v that is already placed
    // has degree at least v's, hence is an ancestor of v in every
    // valid tree, and the smallest-degree such neighbor is the
    // deepest one — v's parent. An ancestor's adjacency must then
    // swallow v's whole adjacency minus the parent itself; a
    // neighbor of v outside the parent's adjacency means no tree
    // realizes the pairs (0). A parent whose degree equals v's
    // differs from v exactly by the pair between them — the two can
    // be swapped, so more than one tree exists (2). Otherwise every
    // parent is forced and exactly one tree exists (1). Values are
    // bounded by 500, so the adjacency rides as a flat 501x501 byte
    // matrix indexed by the values themselves.
    const W = 501;
    const adj = new Uint8Array(W * W);
    const deg = new Uint16Array(W);
    for (const [x, y] of pairs) {
        adj[x * W + y] = 1;
        adj[y * W + x] = 1;
        deg[x]++;
        deg[y]++;
    }
    const order = [];
    for (let v = 1; v <= 500; v++) {
        if (deg[v] > 0) {
            order.push(v);
        }
    }
    order.sort((a, b) => deg[b] - deg[a]);
    const placed = new Uint8Array(W);
    placed[order[0]] = 1;
    if (deg[order[0]] !== order.length - 1) {
        return 0;
    }
    let multiple = false;
    for (let i = 1; i < order.length; i++) {
        const v = order[i];
        let parent = 0;
        for (let u = 1; u <= 500; u++) {
            if (adj[v * W + u] === 1 && placed[u] === 1 && (parent === 0 || deg[u] < deg[parent])) {
                parent = u;
            }
        }
        if (parent === 0) {
            return 0;
        }
        let contained = true;
        for (let w = 1; w <= 500; w++) {
            if (adj[v * W + w] === 1 && w !== parent && adj[parent * W + w] === 0) {
                contained = false;
                break;
            }
        }
        if (!contained) {
            return 0;
        }
        if (deg[parent] === deg[v]) {
            multiple = true;
        }
        placed[v] = 1;
    }
    return multiple ? 2 : 1;
};
