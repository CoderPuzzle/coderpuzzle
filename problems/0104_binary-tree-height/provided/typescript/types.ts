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
