// Max segment tree over basket indices: each node holds the largest capacity
// still free in its range, so "any basket here fits?" is one comparison and
// the leftmost such basket is a root-to-leaf walk that keeps left whenever
// the left subtree can still fit the fruit.
function numOfUnplacedFruits(fruits: number[], baskets: number[]): number {
    const n = baskets.length;
    let size = 1;
    while (size < n) {
        size *= 2;
    }
    const tree: number[] = new Array(2 * size).fill(0);
    for (let j = 0; j < n; ++j) {
        tree[size + j] = baskets[j];
    }
    for (let i = size - 1; i > 0; --i) {
        tree[i] = Math.max(tree[2 * i], tree[2 * i + 1]);
    }
    let unplaced = 0;
    for (const quantity of fruits) {
        if (tree[1] < quantity) {
            // even the global maximum is too small: nothing fits anywhere
            unplaced++;
            continue;
        }
        let node = 1;
        while (node < size) {
            node *= 2;
            if (tree[node] < quantity) {
                node += 1;
            }
        }
        // retire the basket: 0 sits below every legal capacity
        tree[node] = 0;
        node = node >> 1;
        while (node > 0) {
            tree[node] = Math.max(tree[2 * node], tree[2 * node + 1]);
            node = node >> 1;
        }
    }
    return unplaced;
}
