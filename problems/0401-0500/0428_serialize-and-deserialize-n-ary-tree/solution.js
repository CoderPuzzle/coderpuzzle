/**
 * @param {Node} root
 * @return {string}
 */
var serialize = function (root) {
    if (root === null) return "[]";
    const tokens = [String(root.val), "null"];
    const queue = [root];
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
};
