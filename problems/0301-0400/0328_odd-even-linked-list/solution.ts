function oddEvenList(head: ListNode | null): ListNode | null {
    if (head === null) return head;
    // Two tail pointers step a pair at a time: the odd tail absorbs
    // the node after the even tail, the even tail the node after that.
    let odd: ListNode | null = head;
    const evenHead: ListNode | null = head.next;
    let even: ListNode | null = evenHead;
    while (even !== null && even.next !== null) {
        odd!.next = even.next;
        odd = odd!.next;
        even.next = odd!.next;
        even = even.next;
    }
    // Splice the remembered even chain after the odd tail. The loop keeps
    // the odd chain non-empty, so `odd` is never really null here.
    odd!.next = evenHead;
    return head;
}
