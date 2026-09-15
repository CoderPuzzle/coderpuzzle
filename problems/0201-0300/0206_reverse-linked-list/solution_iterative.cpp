class Solution {
  public:
    ListNode *reverseList(ListNode *head) {
        // prev heads the already-reversed chain; current is the node being
        // processed. Invariant: behind prev everything is reversed, ahead of
        // current nothing has been touched.
        ListNode *prev = nullptr;
        ListNode *current = head;
        while (current != nullptr) {
            // Save the forward link before the flip destroys it.
            ListNode *next = current->next;
            current->next = prev;
            prev = current;
            current = next;
        }
        // current is exhausted: prev points at the original tail, the new head.
        return prev;
    }
};
