function maxDepth(root: Node | null): number {
    if (root === null) return 0;
    let depth = 0;
    let level: Node[] = [root];
    while (level.length > 0) {
        depth += 1;
        const next: Node[] = [];
        for (const node of level) {
            next.push(...node.children);
        }
        level = next;
    }
    return depth;
}
