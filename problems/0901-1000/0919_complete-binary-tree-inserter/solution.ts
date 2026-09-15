class CBTInserter {
    private root: TreeNode | null;
    // Level-order queue of nodes that still have a free child slot; head
    // indexes its front, so entries leave without shifting.
    private pending: TreeNode[];
    private head: number;

    // One level-order pass queues every node that still has a free child
    // slot. BFS visits parents left-to-right, so the queue front is always
    // the parent of the next complete position.
    constructor(root: TreeNode | null) {
        this.root = root;
        this.pending = [];
        this.head = 0;
        const queue: TreeNode[] = root === null ? [] : [root];
        while (queue.length > 0) {
            const node = queue.shift()!;
            if (node.left === null || node.right === null) {
                this.pending.push(node);
            }
            if (node.left !== null) {
                queue.push(node.left);
            }
            if (node.right !== null) {
                queue.push(node.right);
            }
        }
    }

    insert(v: number): number {
        const parent = this.pending[this.head];
        const node = new TreeNode(v);
        if (parent.left === null) {
            parent.left = node;
        } else {
            parent.right = node;
            this.head++;
        }
        this.pending.push(node);
        return parent.val;
    }

    get_root(): TreeNode | null {
        return this.root;
    }
}
