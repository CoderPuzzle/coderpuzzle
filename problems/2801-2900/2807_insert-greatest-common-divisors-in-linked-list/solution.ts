function insertGreatestCommonDivisors(head: ListNode | null): ListNode | null {
    // Original nodes only ever gain a successor, so one cursor splices each
    // gcd in place: rethread cur.next to a fresh node carrying the pair's
    // gcd, then hop to that untouched successor so the next original pair
    // is examined next and the walk stops on the final original node.
    let cur: ListNode | null = head;
    while (cur !== null && cur.next !== null) {
        const next: ListNode = cur.next;
        cur.next = new ListNode(gcd(cur.val, next.val), next);
        cur = next;
    }
    return head;
}

function gcd(a: number, b: number): number {
    while (b !== 0) {
        [a, b] = [b, a % b];
    }
    return a;
}
