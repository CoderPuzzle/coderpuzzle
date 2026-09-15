function getIntersectionNode(first: ListNode | null, second: ListNode | null): ListNode | null {
    // Set members compare by reference: nodes are keyed by identity, never
    // by their val.
    const inFirst = new Set<ListNode>();
    for (let node = first; node !== null; node = node.next) inFirst.add(node);
    for (let node = second; node !== null; node = node.next) {
        if (inFirst.has(node)) return node;
    }
    return null;
}
