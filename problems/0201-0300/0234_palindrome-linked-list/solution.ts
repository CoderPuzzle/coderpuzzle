function isPalindrome(head: ListNode | null): boolean {
    // Slow steps one node, fast two, so when fast runs off the end
    // slow stands at the front of the back half.
    let slow: ListNode | null = head;
    let fast: ListNode | null = head;
    while (fast !== null && fast.next !== null) {
        slow = slow.next;
        fast = fast.next.next;
    }
    // Reverse the back half in place: unlink each node and prepend it,
    // so the back half reads backward from `second`.
    let second: ListNode | null = null;
    while (slow !== null) {
        const follow: ListNode | null = slow.next;
        slow.next = second;
        second = slow;
        slow = follow;
    }
    // Compare the halves in lockstep; an odd length parks the middle
    // node at the tail of `second`, where it faces itself. `left` cannot
    // run out before `second` does, but the guard keeps the types honest.
    let left: ListNode | null = head;
    while (second !== null && left !== null) {
        if (left.val !== second.val) {
            return false;
        }
        left = left.next;
        second = second.next;
    }
    return true;
}
