/**
 * Definition for singly-linked list.
 * class ListNode { val: number; next: ListNode | null; constructor(val?: number, next?: ListNode | null) { this.val = (val===undefined ? 0 : val); this.next = (next===undefined ? null : next); } }
 * Definition for a binary tree node.
 * class TreeNode { val: number; left: TreeNode | null; right: TreeNode | null; constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) { this.val = (val===undefined ? 0 : val); this.left = (left===undefined ? null : left); this.right = (right===undefined ? null : right); } }
 */
function isSubPath(head: ListNode | null, root: TreeNode | null): boolean {
    // Flatten the list once so matching works with plain indices.
    const values: number[] = [];
    for (let node = head; node !== null; node = node.next) values.push(node.val);

    if (root === null) return false;

    // Walk the whole tree; from every node that starts a match, follow it
    // downward with an explicit (node, index) stack.
    const stack: TreeNode[] = [root];
    while (stack.length > 0) {
        const treeNode = stack.pop()!;
        if (matchFrom(treeNode, values)) return true;
        if (treeNode.left !== null) stack.push(treeNode.left);
        if (treeNode.right !== null) stack.push(treeNode.right);
    }
    return false;
}

function matchFrom(start: TreeNode, values: number[]): boolean {
    if (values.length === 0 || start.val !== values[0]) return false;
    const stack: Array<[TreeNode, number]> = [[start, 0]];
    while (stack.length > 0) {
        const [node, index] = stack.pop()!;
        if (index + 1 === values.length) return true;
        const nxt = values[index + 1];
        if (node.left !== null && node.left.val === nxt) stack.push([node.left, index + 1]);
        if (node.right !== null && node.right.val === nxt) stack.push([node.right, index + 1]);
    }
    return false;
}
