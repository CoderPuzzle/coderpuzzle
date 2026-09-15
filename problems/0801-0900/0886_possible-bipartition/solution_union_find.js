/**
 * @param {number} n
 * @param {number[][]} dislikes
 * @return {boolean}
 */
var possibleBipartition = function (n, dislikes) {
    // Dislike is symmetric, so build an undirected adjacency list: the
    // unions below need, for every person, everyone that person avoids.
    const adjacency = Array.from({ length: n + 1 }, () => []);
    for (const [a, b] of dislikes) {
        adjacency[a].push(b);
        adjacency[b].push(a);
    }

    const parent = Array.from({ length: n + 1 }, (_, i) => i);

    // Path-halving: splice every other node directly under its
    // grandparent, flattening the tree while walking to the root.
    const find = (x) => {
        while (parent[x] !== x) {
            parent[x] = parent[parent[x]];
            x = parent[x];
        }
        return x;
    };

    // Everyone a person dislikes must land in one set (the opposite
    // group), so union them all onto that person's first enemy.
    for (let person = 1; person <= n; person++) {
        const avoided = adjacency[person];
        for (let i = 1; i < avoided.length; i++) {
            const ra = find(avoided[0]);
            const rb = find(avoided[i]);
            if (ra !== rb) {
                parent[ra] = rb;
            }
        }
    }

    // The split works exactly when no dislike pair ended up merged.
    for (const [a, b] of dislikes) {
        if (find(a) === find(b)) {
            return false;
        }
    }
    return true;
};
