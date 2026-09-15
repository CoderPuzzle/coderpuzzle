class Solution {
  public:
    DoublyListNode *toArray(ListNode *head) {
        // Sweep one reads: the values ride out the walk in a buffer.
        vector<int> values;
        for (ListNode *node = head; node != nullptr; node = node->next) {
            values.push_back(node->val);
        }
        // Sweep two chains: every buffered value becomes a node appended to
        // the growing tail, pointing back at the node before it.
        DoublyListNode *first = nullptr;
        DoublyListNode *tail = nullptr;
        for (int value : values) {
            auto *fresh = new DoublyListNode(value);
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
