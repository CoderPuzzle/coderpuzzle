interface CycleNode {
    val: number;
    next: CycleNode | null;
}

function detectCycle(values: number[], pos: number): number {
    if (values.length === 0) {
        return -1;
    }
    // Materialize the wire form: one node per value, tail back to pos.
    const nodes: CycleNode[] = values.map((v) => ({ val: v, next: null }));
    for (let i = 0; i < nodes.length - 1; i++) {
        nodes[i].next = nodes[i + 1];
    }
    if (pos !== -1) {
        nodes[nodes.length - 1].next = nodes[pos];
    }
    // Walk from the head remembering every node by identity. The first node
    // to come around a second time is the cycle's entry; running off the
    // end instead means no cycle.
    const seen = new Set<CycleNode>();
    let node: CycleNode | null = nodes[0];
    while (node !== null && !seen.has(node)) {
        seen.add(node);
        node = node.next;
    }
    if (node === null) {
        return -1;
    }
    // The judge wants an index: count steps from the head to the entry.
    let index = 0;
    let entry: CycleNode | null = nodes[0];
    while (entry !== node) {
        entry = entry!.next;
        index++;
    }
    return index;
}
