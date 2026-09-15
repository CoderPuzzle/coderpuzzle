/**
 * @param {RandomListNode} head
 * @return {RandomListNode}
 */
var copyRandomList = function (head) {
    const clones = new Map();
    const find = (node) => {
        if (node === null) return null;
        if (clones.has(node)) return clones.get(node);
        const clone = new RandomListNode(node.val);
        clones.set(node, clone);
        clone.next = find(node.next);
        clone.random = find(node.random);
        return clone;
    };
    return find(head);
};
