/**
 * @param {ListNode} head
 * @return {DoublyListNode}
 */
var toArray = function (head) {
    // `first` remembers the head to return; `tail` is the node every fresh
    // append points its `prev` back at. The first node is the one append
    // with no predecessor, so its `prev` stays null.
    let first = null;
    let tail = null;
    for (let node = head; node !== null; node = node.next) {
        const fresh = new DoublyListNode(node.val);
        if (tail !== null) {
            tail.next = fresh;
            fresh.prev = tail;
        } else {
            first = fresh;
        }
        tail = fresh;
    }
    return first;
};
