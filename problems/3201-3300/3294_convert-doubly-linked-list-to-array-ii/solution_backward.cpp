class Solution {
  public:
    vector<int> toArray(DoublyListNode *node) {
        // Walk `next` to the tail without collecting anything; the backward
        // sweep over `prev` then gathers the whole list, tail first. One
        // in-place reverse turns that tail-to-head buffer into the answer.
        while (node != nullptr && node->next != nullptr) {
            node = node->next;
        }
        vector<int> values;
        for (; node != nullptr; node = node->prev) {
            values.push_back(node->val);
        }
        for (int left = 0, right = (int)values.size() - 1; left < right; ++left, --right) {
            std::swap(values[left], values[right]);
        }
        return values;
    }
};
