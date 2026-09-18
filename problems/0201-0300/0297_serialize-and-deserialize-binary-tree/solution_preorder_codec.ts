class Codec {
    constructor() {}

    // Preorder codec with explicit null markers. The format is this
    // solution's own choice — the judge only requires that
    // deserialize(serialize(root)) rebuilds the same tree. Both directions
    // are iterative, so deep trees are safe.
    serialize(root: TreeNode | null): string {
        const tokens: string[] = [];
        const stack: (TreeNode | null)[] = [root];
        // Preorder with an explicit stack: pop a node, emit its value, then
        // push right before left so the left subtree is written first.
        while (stack.length > 0) {
            const node = stack.pop();
            if (node === null) {
                tokens.push("#");
                continue;
            }
            tokens.push(String(node.val));
            stack.push(node.right, node.left);
        }
        // Closing markers tell the replay when a subtree ends, so unlike the
        // breadth-first form nothing here can be trimmed.
        return tokens.join(",");
    }

    deserialize(data: string): TreeNode | null {
        const tokens = data.split(",");
        if (tokens[0] === "#") {
            return null;
        }
        const root = new TreeNode(Number(tokens[0]));
        type Slot = { node: TreeNode; side: "left" | "right" };
        // Open child slots replay preorder: the top slot takes the next
        // token, a marker fills it with nothing, a value makes a node that
        // fills it and opens two slots of its own (right before left).
        const pending: Slot[] = [
            { node: root, side: "right" },
            { node: root, side: "left" },
        ];
        let index = 1;
        while (pending.length > 0) {
            const slot = pending.pop()!;
            const token = tokens[index];
            index++;
            if (token !== "#") {
                const child = new TreeNode(Number(token));
                slot.node[slot.side] = child;
                pending.push({ node: child, side: "right" }, { node: child, side: "left" });
            }
        }
        return root;
    }
}
