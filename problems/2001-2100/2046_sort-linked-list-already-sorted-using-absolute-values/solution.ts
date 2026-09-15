function sortLinkedList(head: ListNode | null): ListNode | null {
    if (head === null) return null;

    let current: ListNode = head;
    while (current.next !== null) {
        const node: ListNode = current.next;
        if (node.val < 0) {
            current.next = node.next;
            node.next = head;
            head = node;
        } else {
            current = node;
        }
    }
    return head;
}
