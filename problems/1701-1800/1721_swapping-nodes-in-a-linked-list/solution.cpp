class Solution {
  public:
    ListNode *swapNodes(ListNode *head, int k) {
        // Pin the kth node from the front first: k - 1 steps from the head,
        // never past the tail since k <= n.
        ListNode *first = head;
        for (int i = 0; i < k - 1; ++i) {
            first = first->next;
        }
        // A scout runs from that node to the tail while a second cursor,
        // started at the head, moves alongside it; the pair stays k - 1
        // nodes apart, so the second cursor stops on the kth node from the
        // end exactly when the scout stops on the tail.
        ListNode *second = head;
        ListNode *scout = first;
        while (scout->next != nullptr) {
            scout = scout->next;
            second = second->next;
        }
        // Only the two values change hands; every link, and the head itself,
        // is untouched.
        int tmp = first->val;
        first->val = second->val;
        second->val = tmp;
        return head;
    }
};
