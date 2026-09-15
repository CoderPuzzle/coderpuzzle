function mergeInBetween(list1: ListNode | null, a: number, b: number, list2: ListNode | null): ListNode | null {
    // The splice needs two landmarks on list1 and one on list2. The
    // (a-1)th node — the last node that keeps its place in front of the
    // removed stretch — is found first, with the (b+1)th node — the
    // first survivor behind it — tracked alongside and then pushed on
    // b-a+2 further steps, all before any pointer moves.
    let pre: ListNode | null = list1;
    let after: ListNode | null = list1;
    for (let i = 0; i < a - 1; ++i) {
        pre = pre.next;
        after = after.next;
    }
    for (let i = 0; i < b - a + 2; ++i) {
        after = after.next;
    }
    // Hang list2 off the (a-1)th node, walk to its last node, and link
    // that node to the survivor. The removed stretch is left
    // unreferenced; nothing before or after the splice is touched.
    pre.next = list2;
    let tail: ListNode | null = list2;
    while (tail.next !== null) {
        tail = tail.next;
    }
    tail.next = after;
    return list1;
}
