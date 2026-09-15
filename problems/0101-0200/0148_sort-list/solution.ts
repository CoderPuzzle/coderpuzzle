function sortList(head: ListNode | null): ListNode | null {
    const merge = function (a: ListNode | null, b: ListNode | null): ListNode | null {
        const dummy = new ListNode(0);
        let tail = dummy;
        while (a !== null && b !== null) {
            // <= takes from the first half on ties, keeping the sort stable.
            if (a.val <= b.val) {
                tail.next = a;
                a = a.next;
            } else {
                tail.next = b;
                b = b.next;
            }
            tail = tail.next;
        }
        // Splice on whichever half still has nodes.
        tail.next = a !== null ? a : b;
        return dummy.next;
    };

    // Base case: an empty or single-node list is already sorted.
    if (head === null || head.next === null) {
        return head;
    }
    // Halve with slow/fast pointers; fast starts one node ahead so slow
    // finishes on the last node of the left half — both halves are then
    // strictly shorter, which makes the recursion terminate.
    let slow = head;
    let fast = head.next;
    while (fast !== null && fast.next !== null) {
        slow = slow.next;
        fast = fast.next.next;
    }
    const mid = slow.next;
    slow.next = null;
    const left = sortList(head);
    const right = sortList(mid);
    return merge(left, right);
}
