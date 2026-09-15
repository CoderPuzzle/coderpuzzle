function removeNthFromEnd(head: ListNode | null, n: number): ListNode | null {
    // First pass: count the nodes, so the target's position from the head
    // is known before anything is unlinked.
    let sz = 0;
    for (let node = head; node !== null; node = node.next) {
        sz++;
    }
    // The target is the (sz - n + 1)-th node from the head, so its
    // predecessor sits sz - n steps past the dummy; walking that far and
    // relinking drops the target without a special head case.
    const dummy = new ListNode(0, head);
    let pred = dummy;
    for (let i = 0; i < sz - n; ++i) {
        pred = pred.next;
    }
    pred.next = pred.next.next;
    return dummy.next;
}
