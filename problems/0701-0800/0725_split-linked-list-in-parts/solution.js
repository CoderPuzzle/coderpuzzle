/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode[]}
 */
var splitListToParts = function (head, k) {
    // First pass, count only: how many nodes are to spread over k parts.
    let n = 0;
    for (let node = head; node !== null; node = node.next) {
        n += 1;
    }
    // Every part takes width = n / k nodes and the first extra = n % k
    // parts one more — the unique split whose sizes differ by at most
    // one with no earlier part smaller than a later one.
    const width = Math.floor(n / k);
    const extra = n % k;
    const parts = [];
    let current = head;
    for (let index = 0; index < k; ++index) {
        // This part starts where the previous one was cut loose.
        parts.push(current);
        const size = width + (index < extra ? 1 : 0);
        // Hop to the part's last node. A zero-size part never enters
        // the loop (it arises only after every node was handed out, so
        // current is already null), and a positive-size part always
        // finds its size - 1 successors because the sizes sum to n.
        for (let step = 1; step < size; ++step) {
            current = current.next;
        }
        if (current !== null) {
            // Cut the part loose and let the next one start at its
            // successor.
            const following = current.next;
            current.next = null;
            current = following;
        }
    }
    return parts;
};
