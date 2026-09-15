function reorderList(head: ListNode | null): ListNode | null {
    // Lists of length 0 or 1 are already in the target order.
    if (head === null || head.next === null) {
        return head;
    }
    // Slow steps one node, fast two, so fast falls off the end while slow
    // stands on the last node of the front half.
    let slow = head;
    let fast = head;
    while (fast.next !== null && fast.next.next !== null) {
        slow = slow.next;
        fast = fast.next.next;
    }
    // Unhook the back half and reverse it in place: `prev` ends up as its
    // head, reading the original back half backwards.
    let back = slow.next;
    slow.next = null;
    let prev: ListNode | null = null;
    while (back !== null) {
        const next = back.next;
        back.next = prev;
        prev = back;
        back = next;
    }
    // Weave: each front node hands its successor to the current back node
    // and takes that node in its place; the back chain, never longer than
    // the front, runs out first.
    let front = head;
    while (prev !== null) {
        const nextFront = front.next;
        const nextBack = prev.next;
        front.next = prev;
        prev.next = nextFront;
        front = nextFront;
        prev = nextBack;
    }
    return head;
}
