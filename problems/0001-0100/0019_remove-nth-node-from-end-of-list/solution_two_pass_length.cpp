class Solution {
  public:
    ListNode *removeNthFromEnd(ListNode *head, int n) {
        // First pass: count the nodes, so the target's position from the head
        // is known before anything is unlinked.
        int sz = 0;
        for (ListNode *node = head; node != nullptr; node = node->next) {
            ++sz;
        }
        // The target is the (sz - n + 1)-th node from the head, so its
        // predecessor sits sz - n steps past the dummy; walking that far and
        // relinking drops the target without a special head case.
        ListNode dummy(0);
        dummy.next = head;
        ListNode *pred = &dummy;
        for (int i = 0; i < sz - n; ++i) {
            pred = pred->next;
        }
        pred->next = pred->next->next;
        return dummy.next;
    }
};
