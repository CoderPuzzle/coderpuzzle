/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var middleNode = function (head) {
    // fast takes two links for slow's one, so slow's offset stays half
    // of fast's; when fast cannot complete another stride, slow stands
    // on the second middle.
    let slow = head;
    let fast = head;
    while (fast !== null && fast.next !== null) {
        slow = slow.next;
        fast = fast.next.next;
    }
    return slow;
};
