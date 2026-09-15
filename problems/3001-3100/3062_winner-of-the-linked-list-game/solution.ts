function gameResult(head: ListNode | null): string {
    // The two values of a pair can never be equal: every even-indexed
    // value is even and every odd-indexed value is odd. One strict
    // comparison therefore always awards exactly one point per pair.
    let evenWins = 0;
    let oddWins = 0;
    let node: ListNode | null = head;
    while (node !== null && node.next !== null) {
        if (node.val > node.next.val) {
            evenWins++;
        } else {
            oddWins++;
        }
        node = node.next.next;
    }
    if (evenWins > oddWins) {
        return "Even";
    }
    if (oddWins > evenWins) {
        return "Odd";
    }
    return "Tie";
}
