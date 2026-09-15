/**
 * @param {Node} root
 * @return {number}
 */
var maxDepth = function (root) {
    if (root === null) return 0;
    let depth = 0;
    let level = [root];
    while (level.length > 0) {
        depth += 1;
        const next = [];
        for (const node of level) {
            next.push(...node.children);
        }
        level = next;
    }
    return depth;
};
