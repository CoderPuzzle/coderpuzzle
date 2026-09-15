/**
 * @param {string[][]} equations
 * @param {number[]} values
 * @param {string[][]} queries
 * @return {number[]}
 */
var calcEquation = function (equations, values, queries) {
    // Weighted union-find over the variable names: parent maps each node to
    // its current parent and weight holds node / parent, so the product along
    // a parent chain is the member's ratio to its root.
    const parent = new Map();
    const weight = new Map();
    const size = new Map();
    const add = (node) => {
        if (!parent.has(node)) {
            parent.set(node, node);
            weight.set(node, 1.0);
            size.set(node, 1);
        }
    };
    const find = (node) => {
        // Walk up to the root folding the chain into one node / root product,
        // then re-hang every visited node directly on the root (path
        // compression), each stored weight becoming that product.
        let root = node;
        let product = 1.0;
        while (parent.get(root) !== root) {
            product *= weight.get(root);
            root = parent.get(root);
        }
        while (parent.get(node) !== root) {
            const next = parent.get(node);
            const step = weight.get(node);
            parent.set(node, root);
            weight.set(node, product);
            node = next;
            product /= step;
        }
        return [root, product];
    };
    const unite = (a, b, value) => {
        // Fold one stated ratio a / b = value into the forest.
        let [rootA, ratioA] = find(a);
        let [rootB, ratioB] = find(b);
        if (rootA === rootB) {
            // The batch never contradicts itself, so a ratio restating an
            // existing link agrees with the folded product.
            return;
        }
        // Union by size: hang the smaller tree under the larger.
        if (size.get(rootA) < size.get(rootB)) {
            [rootA, rootB] = [rootB, rootA];
            [ratioA, ratioB] = [ratioB, ratioA];
            value = 1.0 / value;
        }
        // a = value * b written in root terms, ratioA * rootA =
        // value * ratioB * rootB, solves the new weight rootB / rootA.
        parent.set(rootB, rootA);
        weight.set(rootB, ratioA / (value * ratioB));
        size.set(rootA, size.get(rootA) + size.get(rootB));
    };
    // Each stated ratio a / b = v becomes one merge of the two variables.
    for (let i = 0; i < equations.length; i++) {
        add(equations[i][0]);
        add(equations[i][1]);
        unite(equations[i][0], equations[i][1], values[i]);
    }

    const query = (start, end) => {
        // An unknown variable is unanswerable (this also covers x / x for
        // an undefined x); a known variable over itself is 1.0.
        if (!parent.has(start) || !parent.has(end)) return -1.0;
        const [rootStart, ratioStart] = find(start);
        const [rootEnd, ratioEnd] = find(end);
        // Different roots mean no stated ratio links the two groups.
        if (rootStart !== rootEnd) return -1.0;
        return ratioStart / ratioEnd;
    };

    return queries.map(([c, d]) => query(c, d));
};
