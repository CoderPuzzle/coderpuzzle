class Solution {
  public:
    DoublyListNode *toArray(ListNode *head) {
        // `first` remembers the head to return; `tail` is the node every
        // fresh append points its `prev` back at. The first node is the one
        // append with no predecessor, so its `prev` stays null.
        DoublyListNode *first = nullptr;
        DoublyListNode *tail = nullptr;
        for (ListNode *node = head; node != nullptr; node = node->next) {
            auto *fresh = new DoublyListNode(node->val);
            if (tail != nullptr) {
                tail->next = fresh;
                fresh->prev = tail;
            } else {
                first = fresh;
            }
            tail = fresh;
        }
        return first;
    }
};
