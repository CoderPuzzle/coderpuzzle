/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var sortLinkedList = function (head) {
    if (head === null) return null;

    let current = head;
    while (current.next !== null) {
        const node = current.next;
        if (node.val < 0) {
            current.next = node.next;
            node.next = head;
            head = node;
        } else {
            current = node;
        }
    }
    return head;
};
