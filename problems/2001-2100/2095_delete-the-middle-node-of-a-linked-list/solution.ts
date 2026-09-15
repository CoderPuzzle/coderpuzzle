function deleteMiddle(head: ListNode | null): ListNode | null {
    const dummy = new ListNode(0, head);
    let slow: ListNode = dummy;
    let fast: ListNode | null = head;
    while (fast !== null && fast.next !== null) {
        slow = slow.next!;
        fast = fast.next.next;
    }
    slow.next = slow.next!.next;
    return dummy.next;
}
