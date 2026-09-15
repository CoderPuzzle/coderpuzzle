function serialize(root: Node | null): string {
    if (root === null) return "[]";
    const tokens: string[] = [String(root.val), "null"];
    const queue: Node[] = [root];
    for (let qi = 0; qi < queue.length; qi++) {
        const node = queue[qi];
        for (const child of node.children) {
            tokens.push(String(child.val));
            queue.push(child);
        }
        tokens.push("null");
    }
    while (tokens.length > 0 && tokens[tokens.length - 1] === "null") {
        tokens.pop();
    }
    return "[" + tokens.join(",") + "]";
}
