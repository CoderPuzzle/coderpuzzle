function getIntersectionNode(first: ListNode | null, second: ListNode | null): ListNode | null {
    let a = first;
    let b = second;
    while (a !== b) {
        a = a === null ? second : a.next;
        b = b === null ? first : b.next;
    }
    return a;
}
