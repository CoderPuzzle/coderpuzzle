/**
 * @param {MultiListNode} head
 * @return {MultiListNode}
 */
var flatten = function (head) {
    for (let node = head; node !== null; node = node.next) {
        if (node.child === null) continue;
        const child = node.child;
        node.child = null;
        let tail = child;
        while (tail.next !== null) tail = tail.next;
        tail.next = node.next;
        if (node.next !== null) node.next.prev = tail;
        node.next = child;
        child.prev = node;
    }
    return head;
};
