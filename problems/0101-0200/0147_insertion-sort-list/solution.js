/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var insertionSortList = function (head) {
    // Dummy node: every insertion, even the one before the first node, links
    // into a predecessor that already exists; the sorted list hangs off it
    // and dummy.next is returned at the end.
    const dummy = new ListNode(0, head);
    // sortedTail closes the already-sorted prefix; whatever follows it is
    // untouched input. An empty list or a lone node is sorted already.
    let sortedTail = head;
    while (sortedTail !== null && sortedTail.next !== null) {
        const node = sortedTail.next;
        // In order against the prefix's end: the node stays put and the
        // prefix just grows — the near-linear path sorted input takes.
        if (node.val >= sortedTail.val) {
            sortedTail = sortedTail.next;
            continue;
        }
        // Unlink the node, then walk the prefix for the first value greater
        // than it; prev stops on that value's predecessor.
        sortedTail.next = node.next;
        let prev = dummy;
        while (prev.next.val <= node.val) {
            prev = prev.next;
        }
        node.next = prev.next;
        prev.next = node;
    }
    return dummy.next;
};
