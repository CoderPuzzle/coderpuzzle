/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
var removeNthFromEnd = function (head, n) {
    // A dummy node in front of the head makes removing the true head the
    // same unlink as any other node.
    const dummy = new ListNode(0, head);
    // fast runs n nodes ahead of slow; when fast falls off the end, slow
    // stands on the predecessor of the node being removed.
    let fast = dummy;
    let slow = dummy;
    for (let i = 0; i < n; ++i) {
        fast = fast.next;
    }
    while (fast.next !== null) {
        fast = fast.next;
        slow = slow.next;
    }
    slow.next = slow.next.next;
    return dummy.next;
};
