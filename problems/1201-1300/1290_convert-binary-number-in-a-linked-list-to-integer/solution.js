/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {number}
 */
var getDecimalValue = function (head) {
    // Horner's rule along the list: each new bit shifts everything seen so
    // far left by one and appends itself.
    let value = 0;
    for (let node = head; node !== null; node = node.next) {
        value = (value << 1) | node.val;
    }
    return value;
};
