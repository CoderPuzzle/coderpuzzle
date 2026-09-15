function swapNodes(head: ListNode | null, k: number): ListNode | null {
    // Pin the kth node from the front first: k - 1 steps from the head,
    // never past the tail since k <= n.
    let first: ListNode | null = head;
    for (let i = 0; i < k - 1; ++i) {
        first = first!.next;
    }
    // A scout runs from that node to the tail while a second cursor,
    // started at the head, moves alongside it; the pair stays k - 1
    // nodes apart, so the second cursor stops on the kth node from the
    // end exactly when the scout stops on the tail.
    let second: ListNode | null = head;
    let scout: ListNode | null = first;
    while (scout!.next !== null) {
        scout = scout!.next;
        second = second!.next;
    }
    // Only the two values change hands; every link, and the head itself,
    // is untouched.
    const tmp: number = first!.val;
    first!.val = second!.val;
    second!.val = tmp;
    return head;
}
