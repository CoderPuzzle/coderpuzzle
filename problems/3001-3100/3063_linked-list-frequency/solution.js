/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var frequenciesOfElements = function (head) {
    const counts = new Map();
    const order = [];
    for (let node = head; node !== null; node = node.next) {
        const count = (counts.get(node.val) ?? 0) + 1;
        counts.set(node.val, count);
        if (count === 1) {
            order.push(node.val);
        }
    }
    const dummy = new ListNode();
    let tail = dummy;
    for (const value of order) {
        tail.next = new ListNode(counts.get(value));
        tail = tail.next;
    }
    return dummy.next;
};
