function copyRandomList(head: RandomListNode | null): RandomListNode | null {
    const clones = new Map<RandomListNode, RandomListNode>();
    const find = (node: RandomListNode | null): RandomListNode | null => {
        if (node === null) return null;
        if (clones.has(node)) return clones.get(node)!;
        const clone = new RandomListNode(node.val);
        clones.set(node, clone);
        clone.next = find(node.next);
        clone.random = find(node.random);
        return clone;
    };
    return find(head);
}
