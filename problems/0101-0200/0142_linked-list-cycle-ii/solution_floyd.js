/**
 * @param {number[]} values
 * @param {number} pos
 * @return {number}
 */
var detectCycle = function (values, pos) {
    if (values.length === 0) {
        return -1;
    }
    // Materialize the wire form: one node per value, tail back to pos.
    const nodes = values.map((v) => ({ val: v, next: null }));
    for (let i = 0; i < nodes.length - 1; i++) {
        nodes[i].next = nodes[i + 1];
    }
    if (pos !== -1) {
        nodes[nodes.length - 1].next = nodes[pos];
    }
    // Phase 1: tortoise-and-hare scan; fast falling off the end means no cycle.
    let slow = nodes[0];
    let fast = nodes[0];
    while (fast !== null && fast.next !== null) {
        slow = slow.next;
        fast = fast.next.next;
        if (slow === fast) {
            // Phase 2: with a = head-to-entry, b = entry-to-meeting and
            // c = the rest of the loop, a + 2b + c = 2(a + b) gives c = a,
            // so a finder restarted at the head and slow continuing from
            // the meeting point converge after exactly a steps — on the
            // entry node.
            let finder = nodes[0];
            while (finder !== slow) {
                finder = finder.next;
                slow = slow.next;
            }
            // The judge wants an index: count steps from head to entry.
            let index = 0;
            let entry = nodes[0];
            while (entry !== finder) {
                entry = entry.next;
                index++;
            }
            return index;
        }
    }
    return -1;
};
