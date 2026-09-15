function toArray(head: ListNode | null): DoublyListNode | null {
    // Sweep one reads: the values ride out the walk in a buffer.
    const values: number[] = [];
    for (let node = head; node !== null; node = node.next) {
        values.push(node.val);
    }
    // Sweep two chains: every buffered value becomes a node appended to the
    // growing tail, pointing back at the node before it.
    let first: DoublyListNode | null = null;
    let tail: DoublyListNode | null = null;
    for (const value of values) {
        const fresh = new DoublyListNode(value);
        if (tail !== null) {
            tail.next = fresh;
            fresh.prev = tail;
        } else {
            first = fresh;
        }
        tail = fresh;
    }
    return first;
}
