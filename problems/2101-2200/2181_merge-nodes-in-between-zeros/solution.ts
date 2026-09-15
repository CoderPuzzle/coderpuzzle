function mergeNodes(head: ListNode | null): ListNode | null {
    // One pass: skip the leading 0 sentinel, accumulate values until the
    // next 0, then that sum becomes a result node. The dummy head keeps
    // the first segment ordinary.
    const dummy = new ListNode(0);
    let tail = dummy;
    let total = 0;
    let node = head!.next;
    while (node !== null) {
        if (node.val === 0) {
            tail.next = new ListNode(total);
            tail = tail.next;
            total = 0;
        } else {
            total += node.val;
        }
        node = node.next;
    }
    return dummy.next;
}
