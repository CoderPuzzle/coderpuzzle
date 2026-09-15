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
