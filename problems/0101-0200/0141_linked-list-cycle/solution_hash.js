/**
 * @param {number[]} values
 * @param {number} pos
 * @return {boolean}
 */
var hasCycle = function (values, pos) {
    if (values.length === 0) {
        // Empty input is acyclic by convention.
        return false;
    }
    // Materialize the wire form: one node per value, then link in order.
    const nodes = values.map((v) => ({ val: v, next: null }));
    for (let i = 0; i < nodes.length - 1; i++) {
        nodes[i].next = nodes[i + 1];
    }
    // Point the tail back at index pos to close the cycle.
    if (pos !== -1) {
        nodes[nodes.length - 1].next = nodes[pos];
    }
    // Walk from the head remembering every node by identity; a cycle traps
    // the walk, so the first node to come around a second time proves it.
    const seen = new Set();
    let node = nodes[0];
    while (node !== null) {
        if (seen.has(node)) {
            return true;
        }
        seen.add(node);
        node = node.next;
    }
    // The walk ran off the end of the list: no cycle.
    return false;
};
