/**
 * @param {DoublyListNode} node
 * @return {number[]}
 */
var toArray = function (node) {
    // Walk `next` to the tail without collecting anything; the backward
    // sweep over `prev` then gathers the whole list, tail first. One
    // in-place reverse turns that tail-to-head buffer into the answer.
    let tail = node;
    while (tail !== null && tail.next !== null) {
        tail = tail.next;
    }
    const values = [];
    for (let walk = tail; walk !== null; walk = walk.prev) {
        values.push(walk.val);
    }
    for (let left = 0, right = values.length - 1; left < right; left++, right--) {
        const head = values[left];
        values[left] = values[right];
        values[right] = head;
    }
    return values;
};
