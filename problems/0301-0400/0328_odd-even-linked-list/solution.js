/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var oddEvenList = function (head) {
    if (head === null) return head;
    // Two tail pointers step a pair at a time: the odd tail absorbs
    // the node after the even tail, the even tail the node after that.
    let odd = head;
    const evenHead = head.next;
    let even = evenHead;
    while (even !== null && even.next !== null) {
        odd.next = even.next;
        odd = odd.next;
        even.next = odd.next;
        even = even.next;
    }
    // Splice the remembered even chain after the odd tail.
    odd.next = evenHead;
    return head;
};
