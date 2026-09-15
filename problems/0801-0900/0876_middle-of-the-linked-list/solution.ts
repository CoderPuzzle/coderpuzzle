function middleNode(head: ListNode | null): ListNode | null {
    // fast takes two links for slow's one, so slow's offset stays half
    // of fast's; when fast cannot complete another stride, slow stands
    // on the second middle.
    let slow: ListNode | null = head;
    let fast: ListNode | null = head;
    while (fast !== null && fast.next !== null) {
        slow = slow!.next;
        fast = fast.next.next;
    }
    // Entering the loop proves head is non-null, so slow is never really
    // null here.
    return slow;
}
