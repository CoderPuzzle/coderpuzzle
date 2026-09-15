function getDecimalValue(head: ListNode | null): number {
    // Horner's rule along the list: each new bit shifts everything seen so
    // far left by one and appends itself.
    let value = 0;
    for (let node = head; node !== null; node = node.next) {
        value = (value << 1) | node.val;
    }
    return value;
}
