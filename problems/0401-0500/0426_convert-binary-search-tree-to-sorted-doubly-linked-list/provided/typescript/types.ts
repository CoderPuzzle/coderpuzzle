class NodeWithNext {
    val: number;
    left: NodeWithNext | null;
    right: NodeWithNext | null;
    next: NodeWithNext | null;
    parent: NodeWithNext | null;
    constructor(val?: number) {
        this.val = val ?? 0;
        this.left = null;
        this.right = null;
        this.next = null;
        this.parent = null;
    }
}
class TreeNode {
    val: number;
    left: TreeNode | null;
    right: TreeNode | null;
    constructor(val?: number) {
        this.val = val ?? 0;
        this.left = null;
        this.right = null;
    }
}
