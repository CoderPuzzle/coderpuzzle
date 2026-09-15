/**
 * @param {number[][]} edges
 * @return {number[]}
 */
var findRedundantConnection = function (edges) {
    const parent = new Map();

    const find = function (node) {
        let root = node;
        while (parent.get(root) !== root) {
            root = parent.get(root);
        }
        // Second walk repoints every visited node at the root (path
        // compression), flattening the structure for later finds.
        while (parent.get(node) !== root) {
            const next = parent.get(node);
            parent.set(node, root);
            node = next;
        }
        return root;
    };

    const union = function (a, b) {
        // Unseen nodes register lazily on first touch.
        if (!parent.has(a)) {
            parent.set(a, a);
        }
        if (!parent.has(b)) {
            parent.set(b, b);
        }
        const ra = find(a);
        const rb = find(b);
        // Equal roots mean this edge would reconnect one component: the cycle.
        if (ra === rb) {
            return false;
        }
        parent.set(ra, rb);
        return true;
    };

    // A tree plus one extra edge has exactly one cycle; the first edge
    // failing the union test is the one that closes it.
    for (const [a, b] of edges) {
        if (!union(a, b)) {
            return [a, b];
        }
    }
    return [];
};
