/**
 * @param {Node} root
 * @return {number[][]}
 */
var levelOrder = function (root) {
    if (root === null) return [];
    const levels = [];
    let level = [root];
    while (level.length > 0) {
        const values = [];
        const next = [];
        for (const node of level) {
            values.push(node.val);
            next.push(...node.children);
        }
        levels.push(values);
        level = next;
    }
    return levels;
};
