/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var plusOne = function (head) {
    // A 0 sentinel absorbs the all-9 carry, so the list growing past
    // its head needs no special case.
    const sentinel = new ListNode(0, head);
    // One walk parks `last` on the final non-9 digit — the only one a
    // +1 carry can ever reach; every 9 behind it rolls over to 0.
    let last = sentinel;
    for (let current = sentinel.next; current; current = current.next) {
        if (current.val !== 9) {
            last = current;
        }
    }
    last.val += 1;
    for (let current = last.next; current; current = current.next) {
        current.val = 0;
    }
    // The sentinel still holds 0 unless every digit was a 9.
    return sentinel.val === 1 ? sentinel : head;
};
