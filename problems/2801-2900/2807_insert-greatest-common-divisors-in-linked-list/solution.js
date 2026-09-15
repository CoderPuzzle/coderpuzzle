/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var insertGreatestCommonDivisors = function (head) {
    // Original nodes only ever gain a successor, so one cursor splices each
    // gcd in place: rethread cur.next to a fresh node carrying the pair's
    // gcd, then hop to that untouched successor so the next original pair
    // is examined next and the walk stops on the final original node.
    const gcd = (a, b) => {
        while (b !== 0) {
            [a, b] = [b, a % b];
        }
        return a;
    };
    let cur = head;
    while (cur.next !== null) {
        const next = cur.next;
        cur.next = new ListNode(gcd(cur.val, next.val), next);
        cur = next;
    }
    return head;
};
