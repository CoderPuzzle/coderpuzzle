// Problem-provided doubly linked node (LC 3294 contract). The judge's
// decoder builds nodes with new DoublyListNode(value) and wires prev
// and next itself.
struct DoublyListNode {
    int val;
    DoublyListNode *prev;
    DoublyListNode *next;
    explicit DoublyListNode(int x) : val(x), prev(nullptr), next(nullptr) {}
    DoublyListNode(int x, DoublyListNode *p, DoublyListNode *n) : val(x), prev(p), next(n) {}
};
