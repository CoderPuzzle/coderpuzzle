function deleteNode(head: ListNode | null, node: number): ListNode | null {
    // The wire names the node by its value; values are unique, so one walk
    // from the head finds exactly the node to delete.
    let current = head;
    while (current !== null && current.val !== node) {
        current = current.next;
    }
    // current is the named node: it is in the list and is not the tail, so
    // the copy-in and the bypass are both safe.
    current!.val = current!.next!.val;
    current!.next = current!.next!.next;
    return head;
}
