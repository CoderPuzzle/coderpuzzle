// Preorder with null markers: the root's value, then its left subtree, then
// its right, `x` for every absent child, joined by commas.
class Codec {
    constructor() {}

    serialize(root) {
        const out = [];
        const stack = [root];
        while (stack.length > 0) {
            const node = stack.pop();
            if (node === null) {
                out.push("x");
                continue;
            }
            out.push(String(node.val));
            stack.push(node.right);
            stack.push(node.left);
        }
        return out.join(",");
    }

    // The mirror build: each stack entry is a node with one open child slot
    // (left before right); a value fills the slot and opens two more, an
    // `x` just closes it.
    deserialize(data) {
        const tokens = data.split(",");
        if (tokens[0] === "x") {
            return null;
        }
        const root = new TreeNode(parseInt(tokens[0], 10));
        const stack = [[root, 0]];
        for (let index = 1; index < tokens.length; index++) {
            const [node, side] = stack.pop();
            const child = tokens[index] === "x" ? null : new TreeNode(parseInt(tokens[index], 10));
            if (side === 0) {
                node.left = child;
                stack.push([node, 1]);
            } else {
                node.right = child;
            }
            if (child !== null) {
                stack.push([child, 0]);
            }
        }
        return root;
    }
}
