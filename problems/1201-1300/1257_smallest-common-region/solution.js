/**
 * @param {string[][]} regions
 * @param {string} region1
 * @param {string} region2
 * @return {string}
 */
var findSmallestRegion = function (regions, region1, region2) {
    const parent = new Map();
    for (const group of regions) {
        for (let i = 1; i < group.length; ++i) {
            parent.set(group[i], group[0]);
        }
    }
    // Ancestor chain of region1, itself included.
    const chain = new Set();
    let node = region1;
    while (true) {
        chain.add(node);
        if (!parent.has(node)) break;
        node = parent.get(node);
    }
    // First ancestor of region2 inside that chain is the LCA.
    node = region2;
    while (!chain.has(node)) {
        node = parent.get(node);
    }
    return node;
};
