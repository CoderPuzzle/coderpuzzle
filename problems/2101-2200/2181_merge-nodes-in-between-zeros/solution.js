/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var mergeNodes = function (head) {
    // One pass: skip the leading 0 sentinel, accumulate values until the
    // next 0, then that sum becomes a result node. The dummy head keeps
    // the first segment ordinary.
    const dummy = new ListNode(0);
    let tail = dummy;
    let total = 0;
    for (let node = head.next; node !== null; node = node.next) {
        if (node.val === 0) {
            tail.next = new ListNode(total);
            tail = tail.next;
            total = 0;
        } else {
            total += node.val;
        }
    }
    return dummy.next;
};
