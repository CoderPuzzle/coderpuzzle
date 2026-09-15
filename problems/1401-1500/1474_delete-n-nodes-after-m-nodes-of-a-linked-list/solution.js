/**
 * @param {ListNode} head
 * @param {number} m
 * @param {number} n
 * @return {ListNode}
 */
var deleteNodes = function (head, m, n) {
    // A dummy node in front of the head gives every cycle the same starting
    // position: standing on the keep run's last node.
    const dummy = new ListNode(0, head);
    let node = dummy;
    while (node.next !== null) {
        // Keep the next m nodes; a run cut short by the tail simply leaves
        // `node` on the final node of the list.
        for (let i = 0; i < m && node.next !== null; ++i) {
            node = node.next;
        }
        // Drop the next n nodes: send skipper ahead up to n steps, then
        // splice whatever survives onto the keep run.
        let skipper = node;
        for (let i = 0; i < n && skipper.next !== null; ++i) {
            skipper = skipper.next;
        }
        node.next = skipper.next;
    }
    return dummy.next;
};
