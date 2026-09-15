/**
 * @param {ListNode} list
 * @return {ListNode[]}
 */
var splitCircularLinkedList = function (list) {
    let count = 1;
    let tail = list;
    while (tail.next !== list) {
        tail = tail.next;
        count++;
    }
    const half = Math.ceil(count / 2);
    let firstTail = list;
    for (let i = 0; i < half - 1; i++) firstTail = firstTail.next;
    const secondHead = firstTail.next;
    let secondTail = secondHead;
    while (secondTail.next !== list) secondTail = secondTail.next;
    firstTail.next = list;
    secondTail.next = secondHead;
    return [list, secondHead];
};
