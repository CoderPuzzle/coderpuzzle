class Codec {
    constructor() {}

    // Level-order codec with explicit null markers. The format is this
    // solution's own choice — the judge only requires that
    // deserialize(serialize(root)) rebuilds the same tree. Both directions
    // are iterative, so deep trees are safe.
    serialize(root) {
        const tokens = [];
        const queue = [root];
        // The queue holds nulls too: a null emits a marker and enqueues
        // nothing, so every child slot gets exactly one token.
        for (let head = 0; head < queue.length; head++) {
            const node = queue[head];
            if (node === null) {
                tokens.push("#");
                continue;
            }
            tokens.push(String(node.val));
            queue.push(node.left, node.right);
        }
        // Trailing markers only mark absent slots, so trimming them keeps
        // the sequence uniquely recoverable.
        while (tokens.length > 0 && tokens[tokens.length - 1] === "#") {
            tokens.pop();
        }
        return tokens.join(",");
    }

    deserialize(data) {
        if (data === "") {
            return null;
        }
        const tokens = data.split(",");
        const root = new TreeNode(Number(tokens[0]));
        const queue = [root];
        let index = 1;
        // Consume tokens as child slots in queue order; a marker fills the
        // slot without adding a node to the queue.
        for (let head = 0; head < queue.length && index < tokens.length; head++) {
            const node = queue[head];
            if (index < tokens.length) {
                const token = tokens[index++];
                if (token !== "#") {
                    node.left = new TreeNode(Number(token));
                    queue.push(node.left);
                }
            }
            if (index < tokens.length) {
                const token = tokens[index++];
                if (token !== "#") {
                    node.right = new TreeNode(Number(token));
                    queue.push(node.right);
                }
            }
        }
        return root;
    }
}
