class Solution {
  public:
    ListNode *deleteNodes(ListNode *head, int m, int n) {
        // A dummy node in front of the head gives every cycle the same
        // starting position: standing on the keep run's last node.
        ListNode dummy(0);
        dummy.next = head;
        ListNode *node = &dummy;
        while (node->next != nullptr) {
            // Keep the next m nodes; a run cut short by the tail simply
            // leaves `node` on the final node of the list.
            for (int i = 0; i < m && node->next != nullptr; ++i) {
                node = node->next;
            }
            // Drop the next n nodes: send skipper ahead up to n steps, then
            // splice whatever survives onto the keep run.
            ListNode *skipper = node;
            for (int i = 0; i < n && skipper->next != nullptr; ++i) {
                skipper = skipper->next;
            }
            node->next = skipper->next;
        }
        return dummy.next;
    }
};
