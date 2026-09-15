function deleteNodes(head: ListNode | null, m: number, n: number): ListNode | null {
    // Sweep 1: record the values that survive each keep-m, drop-n cycle.
    // A keep run cut short by the tail simply ends the walk; a drop run
    // steps past the nodes it loses.
    const kept: number[] = [];
    let node = head;
    while (node !== null) {
        for (let i = 0; i < m && node !== null; ++i) {
            kept.push(node.val);
            node = node.next;
        }
        for (let i = 0; i < n && node !== null; ++i) {
            node = node.next;
        }
    }
    // Sweep 2: rebuild a fresh list threaded from the surviving values.
    const dummy = new ListNode(0);
    let tail = dummy;
    for (const value of kept) {
        tail.next = new ListNode(value);
        tail = tail.next;
    }
    return dummy.next;
}
