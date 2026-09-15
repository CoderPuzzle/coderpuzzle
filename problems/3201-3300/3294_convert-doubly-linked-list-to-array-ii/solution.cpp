class Solution {
  public:
    vector<int> toArray(DoublyListNode *node) {
        // The `prev` chain walks back to the head; the loop exits standing
        // on it, however deep in the list the handed node was. One forward
        // sweep then reads the values out already in order.
        while (node != nullptr && node->prev != nullptr) {
            node = node->prev;
        }
        vector<int> values;
        for (; node != nullptr; node = node->next) {
            values.push_back(node->val);
        }
        return values;
    }
};
