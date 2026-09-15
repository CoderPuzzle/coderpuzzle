// Problem-provided list node with a random pointer (LC 138 contract).
// The judge's decoder chains next and then sets random by row index.
class RandomListNode {
    constructor(val, next, random) {
        this.val = val ?? 0;
        this.next = next ?? null;
        this.random = random ?? null;
    }
}
