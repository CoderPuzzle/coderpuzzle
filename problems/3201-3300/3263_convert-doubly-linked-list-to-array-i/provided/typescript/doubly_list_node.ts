// Problem-provided doubly linked node (LC 3263 contract).
// The judge's decoder chains next and then wires prev backwards.
class DoublyListNode {
    val: number;
    next: DoublyListNode | null;
    prev: DoublyListNode | null;
    constructor(val?: number, next?: DoublyListNode | null, prev?: DoublyListNode | null) {
        this.val = val ?? 0;
        this.next = next ?? null;
        this.prev = prev ?? null;
    }
}
