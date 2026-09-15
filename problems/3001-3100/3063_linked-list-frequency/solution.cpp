class Solution {
  public:
    ListNode *frequenciesOfElements(ListNode *head) {
        unordered_map<int, int> counts;
        vector<int> order;
        for (ListNode *node = head; node != nullptr; node = node->next) {
            ++counts[node->val];
            if (counts[node->val] == 1) {
                order.push_back(node->val);
            }
        }
        ListNode dummy(0);
        ListNode *tail = &dummy;
        for (int value : order) {
            tail->next = new ListNode(counts[value]);
            tail = tail->next;
        }
        return dummy.next;
    }
};
