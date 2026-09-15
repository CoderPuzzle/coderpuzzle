/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var removeNodes = function (head) {
    // Reverse the list, keep every node whose value is >= the max of the
    // remaining suffix (original order), rebuilding in original order.
    let prev = null;
    let cur = head;
    while (cur) {
        const nxt = cur.next;
        cur.next = prev;
        prev = cur;
        cur = nxt;
    }

    let newHead = null;
    let maxSeen = -Infinity;
    cur = prev;
    while (cur) {
        const nxt = cur.next;
        if (cur.val >= maxSeen) {
            maxSeen = cur.val;
            cur.next = newHead;
            newHead = cur;
        }
        cur = nxt;
    }
    return newHead;
};
