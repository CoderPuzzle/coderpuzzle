function moveSubTree(root: Node | null, p: Node | null, q: Node | null): Node | null {
    // The judge hands over real nodes of the tree, so the case is never
    // hit in practice -- the signature keeps the optionals anyway.
    if (root === null || p === null || q === null) return root;
    // Pass one records every node's parent in a registry keyed by value
    // (the values are unique; the root has no entry); pass two probes p's
    // subtree for q. The surgery is the same three edits either way --
    // the registry is what answers the lookups.
    const parent = new Map<number, Node>();
    const stack: Node[] = [root];
    while (stack.length) {
        const node = stack.pop()!;
        for (const child of node.children) {
            parent.set(child.val, node);
            stack.push(child);
        }
    }
    let below = false;
    const probe: Node[] = [p];
    while (probe.length) {
        const node = probe.pop()!;
        if (node === q) {
            below = true;
            break;
        }
        probe.push(...node.children);
    }
    // p already hangs exactly where the move wants it: nothing to do.
    if (q.children.some((child) => child === p)) return root;
    if (below) {
        const qParent = parent.get(q.val)!;
        qParent.children.splice(qParent.children.indexOf(q), 1);
        if (!parent.has(p.val)) {
            // p is the root: q takes over.
            q.children.push(p);
            return q;
        }
        const holder = parent.get(p.val)!;
        holder.children[holder.children.indexOf(p)] = q;
        q.children.push(p);
        return root;
    }
    const pParent = parent.get(p.val)!;
    pParent.children.splice(pParent.children.indexOf(p), 1);
    q.children.push(p);
    return root;
}
