/**
 * Definition for a binary tree node.
 * class TreeNode { val: number; left: TreeNode | null; right: TreeNode | null; constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) { this.val = (val===undefined ? 0 : val); this.left = (left===undefined ? null : left); this.right = (right===undefined ? null : right); } }
 */
function longestZigZag(root: TreeNode | null): number {
    if (root === null) return 0;

    // Iterative post-order: state 0 expands children, state 1 combines. The
    // Map stores each node's [left-arrival, right-arrival] run lengths.
    let best = 0;
    const runs = new Map<TreeNode, [number, number]>();
    const stack: Array<[TreeNode, number]> = [[root, 0]];
    while (stack.length > 0) {
        const [node, state] = stack.pop()!;
        if (state === 1) {
            const leftRun = node.left !== null ? 1 + runs.get(node.left)![1] : 0;
            const rightRun = node.right !== null ? 1 + runs.get(node.right)![0] : 0;
            runs.set(node, [leftRun, rightRun]);
            best = Math.max(best, leftRun, rightRun);
            continue;
        }
        stack.push([node, 1]);
        if (node.left !== null) stack.push([node.left, 0]);
        if (node.right !== null) stack.push([node.right, 0]);
    }
    return best;
}
