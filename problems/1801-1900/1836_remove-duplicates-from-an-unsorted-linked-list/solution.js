/**
 * Definition for singly-linked list. function ListNode(val, next) {
 * this.val = val === undefined ? 0 : val; this.next = next === undefined ?
 * null : next; }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var deleteDuplicatesUnsorted = function (head) {
    // Two passes: count every value, then keep only the values whose
    // count is exactly one. A dummy node makes deleting the head a
    // non-case.
    const count = new Map();
    for (let node = head; node !== null; node = node.next) {
        count.set(node.val, (count.get(node.val) ?? 0) + 1);
    }
    const dummy = new ListNode(0);
    let tail = dummy;
    for (let node = head; node !== null; node = node.next) {
        if (count.get(node.val) === 1) {
            tail.next = node;
            tail = tail.next;
        }
    }
    tail.next = null;
    return dummy.next;
};
