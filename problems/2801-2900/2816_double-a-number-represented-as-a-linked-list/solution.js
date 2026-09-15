/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var doubleIt = function (head) {
    // A position carries into the one above it exactly when its original
    // digit is five or more: doubling produces that carry by itself, and
    // an incoming carry of one never flips the outcome (2 * 4 + 1 = 9
    // stays). So one forward pass rewrites each node from its successor
    // while the successor still holds its original digit, and the
    // original head digit, remembered before any write, tells whether a
    // new leading node must be prepended.
    const grows = head.val >= 5;
    let cur = head;
    while (cur !== null) {
        const next = cur.next;
        const inc = next !== null && next.val >= 5 ? 1 : 0;
        cur.val = (cur.val * 2 + inc) % 10;
        cur = next;
    }
    if (grows) {
        return new ListNode(1, head);
    }
    return head;
};
