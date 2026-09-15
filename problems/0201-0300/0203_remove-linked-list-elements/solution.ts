function removeElements(head: ListNode | null, val: number): ListNode | null {
    // A dummy head stands in front of the real list, so deleting the
    // original head is an ordinary unlink of somebody's successor.
    const dummy = new ListNode(0);
    dummy.next = head;
    let current = dummy;
    while (current.next !== null) {
        if (current.next.val === val) {
            // Skip the matching node. The cursor stays put — the node
            // behind it may match too, and that node is now current.next.
            current.next = current.next.next;
        } else {
            // A keeper: step onto it and look at what follows.
            current = current.next;
        }
    }
    return dummy.next;
}
