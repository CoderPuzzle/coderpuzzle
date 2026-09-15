// Problem-provided tree node with a random pointer (LC 1485 contract).
// The judge's decoder wires left/right in level order and then sets
// random by present-node index.
class RandomTreeNode {
    constructor(val, left, right, random) {
        this.val = val ?? 0;
        this.left = left ?? null;
        this.right = right ?? null;
        this.random = random ?? null;
    }
}
