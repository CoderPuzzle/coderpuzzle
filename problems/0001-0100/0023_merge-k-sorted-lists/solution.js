/**
 * @param {ListNode[]} lists
 * @return {ListNode}
 */
var mergeKLists = function (lists) {
    // Drop empty entries up front so [] and [[]] both collapse to an empty
    // candidate list and return null immediately.
    let cur = lists.filter((x) => x !== null && x !== undefined);
    if (cur.length === 0) return null;
    const merge2 = (a, b) => {
        // Dummy head: every attachment happens the same way and the real
        // head falls out as dummy.next.
        const dummy = new ListNode(0);
        let tail = dummy;
        // Both lists sorted, so the merged list's next node is always the
        // smaller of the two current heads.
        while (a !== null && b !== null) {
            if (a.val <= b.val) {
                tail.next = a;
                a = a.next;
            } else {
                tail.next = b;
                b = b.next;
            }
            tail = tail.next;
        }
        // Splice whichever list still has nodes -- it is already the sorted
        // continuation.
        tail.next = a !== null ? a : b;
        return dummy.next;
    };
    // Tournament rounds: merge adjacent pairs, halving the field each round.
    // Every surviving node is walked once per round across ceil(log2 k)
    // rounds, unlike sequential folding which can re-walk one long list k
    // times.
    while (cur.length > 1) {
        const next = [];
        for (let i = 0; i < cur.length; i += 2) {
            if (i + 1 < cur.length) {
                next.push(merge2(cur[i], cur[i + 1]));
            } else {
                // Odd count: the last list gets a bye, passing to the next
                // round untouched.
                next.push(cur[i]);
            }
        }
        cur = next;
    }
    return cur[0];
};
