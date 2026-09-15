/**
 * @param {NodeWithNext} root
 * @return {NodeWithNext}
 */
var connect = function (root) {
    let level = root;
    while (level !== null) {
        let head = null;
        let tail = null;
        for (let node = level; node !== null; node = node.next) {
            for (const child of [node.left, node.right]) {
                if (child === null) continue;
                if (head === null) {
                    head = child;
                } else {
                    tail.next = child;
                }
                tail = child;
            }
        }
        level = head;
    }
    return root;
};
