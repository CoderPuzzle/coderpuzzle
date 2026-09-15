// Problem-provided doubly linked node (LC 3294 contract). The judge's
// decoder builds nodes with new DoublyListNode(val) and wires prev and
// next itself.
class DoublyListNode {
    val: number;
    prev: DoublyListNode | null;
    next: DoublyListNode | null;
    constructor(val?: number, prev?: DoublyListNode | null, next?: DoublyListNode | null) {
        this.val = val ?? 0;
        this.prev = prev ?? null;
        this.next = next ?? null;
    }
}
