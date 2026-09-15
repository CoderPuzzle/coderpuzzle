function cloneGraph(node: GraphNode | null): GraphNode | null {
    const clones = new Map<number, GraphNode>();
    const build = (node: GraphNode | null): GraphNode | null => {
        if (node === null) return null;
        if (clones.has(node.val)) return clones.get(node.val)!;
        const clone = new GraphNode(node.val);
        clones.set(node.val, clone);
        for (const neighbor of node.neighbors) clone.neighbors.push(build(neighbor)!);
        return clone;
    };
    return build(node);
}
