function partition(head: ListNode | null, x: number): ListNode | null {
    // Two dummy heads anchor the chains of nodes below x and of all the
    // rest; each tail remembers where that chain's next node will attach.
    const beforeHead = new ListNode(0);
    let beforeTail = beforeHead;
    const afterHead = new ListNode(0);
    let afterTail = afterHead;
    for (let node = head; node !== null; node = node.next) {
        // Append to whichever chain claims the value: the walk order is
        // the append order, so each partition keeps its original order.
        if (node.val < x) {
            beforeTail.next = node;
            beforeTail = node;
        } else {
            afterTail.next = node;
            afterTail = node;
        }
    }
    // Splice the high chain onto the low one. The high tail's old link
    // still points into the low chain, so cutting it to null is what
    // keeps the spliced list from looping back on itself.
    beforeTail.next = afterHead.next;
    afterTail.next = null;
    return beforeHead.next;
}
