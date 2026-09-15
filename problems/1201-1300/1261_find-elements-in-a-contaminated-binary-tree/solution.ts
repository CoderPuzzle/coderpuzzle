class FindElements {
    private root: TreeNode | null;

    // Constructor: iterative recovery pass. The root is 0; a child of x
    // is 2x + 1 (left) or 2x + 2 (right), so one BFS fixes every value.
    constructor(root: TreeNode | null) {
        this.root = root;
        root!.val = 0;
        const queue: TreeNode[] = [root!];
        while (queue.length > 0) {
            const node = queue.shift()!;
            if (node.left !== null) {
                node.left.val = 2 * node.val + 1;
                queue.push(node.left);
            }
            if (node.right !== null) {
                node.right.val = 2 * node.val + 2;
                queue.push(node.right);
            }
        }
    }

    // With w = target + 1, stepping left doubles w (append bit 0) and
    // stepping right doubles w and adds one (append bit 1), so the bits
    // after the leading one, read highest-first, give the moves.
    find(target: number): boolean {
        let path = target + 1;
        let top = 0;
        while (1 << (top + 1) <= path) ++top;
        let node = this.root;
        for (let bit = top - 1; bit >= 0 && node !== null; --bit) {
            node = ((path >> bit) & 1) === 1 ? node.right : node.left;
        }
        return node !== null;
    }
}
