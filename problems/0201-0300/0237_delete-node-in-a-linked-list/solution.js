/**
 * @param {ListNode} head
 * @param {number} node
 * @return {ListNode}
 */
var deleteNode = function (head, node) {
    // The wire names the node by its value; values are unique, so one walk
    // from the head finds exactly the node to delete.
    let current = head;
    while (current.val !== node) {
        current = current.next;
    }
    // Delete without ever touching a predecessor: the named node absorbs
    // its successor's value, then bypasses the successor — the successor
    // is the node that actually dies.
    current.val = current.next.val;
    current.next = current.next.next;
    return head;
};
