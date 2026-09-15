/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
var reverseKGroup = function (head, k) {
    // The dummy head anchors the node before the group being reversed, so
    // rewiring the first group is no special case.
    let dummy = new ListNode(0);
    dummy.next = head;
    let groupPrev = dummy;
    while (true) {
        // Probe k nodes ahead; a short group means the leftover tail stays
        // as it is and the list is finished.
        let kth = groupPrev;
        for (let i = 0; i < k; i++) {
            kth = kth.next;
            if (kth === null) {
                return dummy.next;
            }
        }
        // Flip exactly k links; `prev` starts at the node after the group so
        // the group's new tail joins the rest of the list naturally.
        const after = kth.next;
        let prev = after;
        let curr = groupPrev.next;
        while (curr !== null && curr !== after) {
            const next = curr.next;
            curr.next = prev;
            prev = curr;
            curr = next;
        }
        // `prev` is the group's new head; the old first node is now its last
        // node and anchors the next group.
        const tail = groupPrev.next;
        groupPrev.next = prev;
        groupPrev = tail;
    }
};
