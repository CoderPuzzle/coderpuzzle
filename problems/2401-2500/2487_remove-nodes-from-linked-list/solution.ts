function removeNodes(head: ListNode | null): ListNode | null {
    // Reverse the list, keep every node whose value is >= the max of the
    // remaining suffix (original order), rebuilding in original order.
    let prev: ListNode | null = null;
    let cur = head;
    while (cur) {
        const nxt = cur.next;
        cur.next = prev;
        prev = cur;
        cur = nxt;
    }

    let newHead: ListNode | null = null;
    let maxSeen = -Infinity;
    cur = prev;
    while (cur) {
        const nxt = cur.next;
        if (cur.val >= maxSeen) {
            maxSeen = cur.val;
            cur.next = newHead;
            newHead = cur;
        }
        cur = nxt;
    }
    return newHead;
}
