var deleteMiddle = function (head) {
    const dummy = new ListNode(0, head);
    let slow = dummy;
    let fast = head;
    while (fast !== null && fast.next !== null) {
        slow = slow.next;
        fast = fast.next.next;
    }
    slow.next = slow.next.next;
    return dummy.next;
};
