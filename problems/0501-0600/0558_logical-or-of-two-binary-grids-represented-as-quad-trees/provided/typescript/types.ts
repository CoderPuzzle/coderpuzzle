class QuadNode {
    val: boolean;
    isLeaf: boolean;
    topLeft: QuadNode | null;
    topRight: QuadNode | null;
    bottomLeft: QuadNode | null;
    bottomRight: QuadNode | null;
    constructor(val?: boolean, isLeaf?: boolean) {
        this.val = val ?? false;
        this.isLeaf = isLeaf ?? false;
        this.topLeft = null;
        this.topRight = null;
        this.bottomLeft = null;
        this.bottomRight = null;
    }
}
