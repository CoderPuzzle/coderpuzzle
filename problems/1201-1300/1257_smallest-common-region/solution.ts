function findSmallestRegion(regions: string[][], region1: string, region2: string): string {
    const parent = new Map<string, string>();
    for (const group of regions) {
        for (let i = 1; i < group.length; ++i) {
            parent.set(group[i], group[0]);
        }
    }
    // Ancestor chain of region1, itself included.
    const chain = new Set<string>();
    let node = region1;
    while (true) {
        chain.add(node);
        if (!parent.has(node)) break;
        node = parent.get(node)!;
    }
    // First ancestor of region2 inside that chain is the LCA.
    node = region2;
    while (!chain.has(node)) {
        node = parent.get(node)!;
    }
    return node;
}
