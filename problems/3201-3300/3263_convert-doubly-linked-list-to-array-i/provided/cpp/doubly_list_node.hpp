struct DoublyListNode {
  int val;
  DoublyListNode *next;
  DoublyListNode *prev;
  DoublyListNode() : val(0), next(nullptr), prev(nullptr) {}
  explicit DoublyListNode(int x) : val(x), next(nullptr), prev(nullptr) {}
  DoublyListNode(int x, DoublyListNode *n, DoublyListNode *p)
      : val(x), next(n), prev(p) {}
};
