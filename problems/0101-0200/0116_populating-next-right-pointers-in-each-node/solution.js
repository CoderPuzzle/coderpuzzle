/**
 * @param {NodeWithNext} root
 * @return {NodeWithNext}
 */
var connect = function (root) {
    if (root === null) return null;
    let level = root;
    while (level.left !== null) {
        let head = level;
        while (head !== null) {
            head.left.next = head.right;
            if (head.next !== null) {
                head.right.next = head.next.left;
            }
            head = head.next;
        }
        level = level.left;
    }
    return root;
};
