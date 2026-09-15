function findRoot(tree: Array<Node | null>): Node | null {
    // Indegree zero: every node except the root appears exactly once as
    // someone's child. Collect all the nodes, then discard every node seen
    // as a child — the one survivor is the root.
    const survivors = new Set(tree.filter((node): node is Node => node !== null));
    for (const node of tree) {
        for (const child of node!.children) {
            survivors.delete(child);
        }
    }
    for (const node of survivors) {
        return node;
    }
    return null;
}
