/**
 * @param {ListNode} first
 * @param {ListNode} second
 * @return {ListNode}
 */
var getIntersectionNode = function (first, second) {
    let a = first;
    let b = second;
    while (a !== b) {
        a = a === null ? second : a.next;
        b = b === null ? first : b.next;
    }
    return a;
};
