function reverseBetween(head: ListNode | null, left: number, right: number): ListNode | null {
    // The dummy head anchors the node just before the segment, so a segment
    // that starts at the head is no special case.
    const dummy = new ListNode(0);
    dummy.next = head;
    let before = dummy;
    for (let i = 1; i < left; i++) {
        before = before.next;
    }
    // Flip exactly right - left + 1 links; `prev` climbs onto each new
    // segment head while `curr` keeps the unconsumed remainder.
    let prev = before;
    let curr = before.next;
    for (let i = left; i <= right; i++) {
        const next = curr.next;
        curr.next = prev;
        prev = curr;
        curr = next;
    }
    // `before.next` is still the segment's old first node, now its last:
    // it takes over the remainder, and the new head takes its place.
    before.next.next = curr;
    before.next = prev;
    return dummy.next;
}
