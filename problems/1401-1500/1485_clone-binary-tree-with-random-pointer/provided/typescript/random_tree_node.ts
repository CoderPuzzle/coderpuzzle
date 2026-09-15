// Problem-provided tree node with a random pointer (LC 1485 contract).
// The judge's decoder wires left/right in level order and then sets
// random by present-node index.
class RandomTreeNode {
    val: number;
    left: RandomTreeNode | null;
    right: RandomTreeNode | null;
    random: RandomTreeNode | null;
    constructor(
        val?: number,
        left?: RandomTreeNode | null,
        right?: RandomTreeNode | null,
        random?: RandomTreeNode | null,
    ) {
        this.val = val ?? 0;
        this.left = left ?? null;
        this.right = right ?? null;
        this.random = random ?? null;
    }
}
