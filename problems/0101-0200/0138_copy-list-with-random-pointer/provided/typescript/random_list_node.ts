// Problem-provided list node with a random pointer (LC 138 contract).
// The judge's decoder chains next and then sets random by row index.
class RandomListNode {
    val: number;
    next: RandomListNode | null;
    random: RandomListNode | null;
    constructor(val?: number, next?: RandomListNode | null, random?: RandomListNode | null) {
        this.val = val ?? 0;
        this.next = next ?? null;
        this.random = random ?? null;
    }
}
