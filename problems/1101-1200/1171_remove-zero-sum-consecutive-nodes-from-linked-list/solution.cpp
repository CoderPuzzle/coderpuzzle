class Solution {
  public:
    ListNode *removeZeroSumSublists(ListNode *head) {
        vector<int> values;
        for (ListNode *node = head; node != nullptr; node = node->next) {
            values.push_back(node->val);
        }

        // Prefix-sum scan: when a prefix repeats, drop every node between the
        // earlier occurrence and the current node (inclusive), then restart.
        bool restart = true;
        while (restart) {
            restart = false;
            unordered_map<int, int> prefixToIndex;
            prefixToIndex[0] = -1;
            int prefix = 0;
            for (int i = 0; i < (int)values.size(); i++) {
                prefix += values[i];
                if (prefixToIndex.count(prefix)) {
                    int j = prefixToIndex[prefix];
                    values.erase(values.begin() + j + 1, values.begin() + i + 1);
                    restart = true;
                    break;
                }
                prefixToIndex[prefix] = i;
            }
        }

        ListNode *dummy = new ListNode(0);
        ListNode *current = dummy;
        for (int value : values) {
            current->next = new ListNode(value);
            current = current->next;
        }
        return dummy->next;
    }
};
