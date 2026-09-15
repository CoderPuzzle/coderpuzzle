function levelOrder(root: Node | null): number[][] {
    if (root === null) return [];
    const levels: number[][] = [];
    let level: Node[] = [root];
    while (level.length > 0) {
        const values: number[] = [];
        const next: Node[] = [];
        for (const node of level) {
            values.push(node.val);
            next.push(...node.children);
        }
        levels.push(values);
        level = next;
    }
    return levels;
}
