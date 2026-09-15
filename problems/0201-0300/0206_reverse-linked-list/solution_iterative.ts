function reverseList(head: ListNode | null): ListNode | null {
    // prev heads the already-reversed chain; current is the node being
    // processed. Invariant: behind prev everything is reversed, ahead of
    // current nothing has been touched.
    let prev: ListNode | null = null;
    let current: ListNode | null = head;
    while (current !== null) {
        // Save the forward link before the flip destroys it.
        const next: ListNode | null = current.next;
        current.next = prev;
        prev = current;
        current = next;
    }
    // current is exhausted: prev points at the original tail, the new head.
    return prev;
}
