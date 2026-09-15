function insert(head: ListNode | null, insertVal: number): ListNode | null {
    const node = new ListNode(insertVal);
    if (head === null) {
        node.next = node;
        return node;
    }
    let previous = head;
    let current = head.next!;
    while (current !== head) {
        const fits = previous.val <= insertVal && insertVal <= current.val;
        const wraps = previous.val > current.val && (insertVal >= previous.val || insertVal <= current.val);
        if (fits || wraps) break;
        previous = current;
        current = current.next!;
    }
    previous.next = node;
    node.next = current;
    return head;
}
