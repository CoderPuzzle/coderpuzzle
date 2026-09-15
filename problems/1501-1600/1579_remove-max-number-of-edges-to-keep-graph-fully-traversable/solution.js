/**
 * @param {number} n
 * @param {number[][]} edges
 * @return {number}
 */
var maxNumEdgesToRemove = function (n, edges) {
    // Disjoint-set union with path compression and union-by-merge: two
    // independent copies track what Alice and Bob can each reach, but
    // every Type 3 edge is unioned into both copies at once, since it
    // serves both of them for free.
    function makeSet(size) {
        const parent = new Array(size + 1);
        for (let i = 0; i <= size; i++) parent[i] = i;
        return { parent, components: size };
    }
    function find(set, node) {
        while (set.parent[node] !== node) {
            set.parent[node] = set.parent[set.parent[node]];
            node = set.parent[node];
        }
        return node;
    }
    function union(set, a, b) {
        const rootA = find(set, a);
        const rootB = find(set, b);
        if (rootA === rootB) return false;
        set.parent[rootA] = rootB;
        set.components--;
        return true;
    }

    const alice = makeSet(n);
    const bob = makeSet(n);
    let used = 0;

    // Type 3 edges go first: whichever ones actually merge two components
    // help both Alice and Bob simultaneously, so they are never worse than
    // spending a Type 1 and a Type 2 edge instead.
    for (const [type, u, v] of edges) {
        if (type === 3) {
            const mergedAlice = union(alice, u, v);
            const mergedBob = union(bob, u, v);
            if (mergedAlice || mergedBob) used++;
        }
    }

    // Type 1 (Alice-only) and Type 2 (Bob-only) edges fill in whatever the
    // shared edges left disconnected, each within its own copy.
    for (const [type, u, v] of edges) {
        if (type === 1) {
            if (union(alice, u, v)) used++;
        } else if (type === 2) {
            if (union(bob, u, v)) used++;
        }
    }

    if (alice.components !== 1 || bob.components !== 1) return -1;
    return edges.length - used;
};
