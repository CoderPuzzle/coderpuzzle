class Solution {
  public:
    ListNode *deleteNodes(ListNode *head, int m, int n) {
        // Sweep 1: record the values that survive each keep-m, drop-n cycle.
        // A keep run cut short by the tail simply ends the walk; a drop run
        // steps past the nodes it loses.
        vector<int> kept;
        ListNode *node = head;
        while (node != nullptr) {
            for (int i = 0; i < m && node != nullptr; ++i) {
                kept.push_back(node->val);
                node = node->next;
            }
            for (int i = 0; i < n && node != nullptr; ++i) {
                node = node->next;
            }
        }
        // Sweep 2: rebuild a fresh list threaded from the surviving values.
        ListNode dummy(0);
        ListNode *tail = &dummy;
        for (int value : kept) {
            tail->next = new ListNode(value);
            tail = tail->next;
        }
        return dummy.next;
    }
};
