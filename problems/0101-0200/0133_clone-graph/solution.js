/**
 * @param {GraphNode} node
 * @return {GraphNode}
 */
var cloneGraph = function (node) {
    const clones = new Map();
    const build = (node) => {
        if (node === null) return null;
        if (clones.has(node.val)) return clones.get(node.val);
        const clone = new GraphNode(node.val);
        clones.set(node.val, clone);
        for (const neighbor of node.neighbors) clone.neighbors.push(build(neighbor));
        return clone;
    };
    return build(node);
};
