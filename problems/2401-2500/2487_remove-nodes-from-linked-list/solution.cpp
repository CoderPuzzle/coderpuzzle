class Solution {
  public:
    ListNode *removeNodes(ListNode *head) {
        // Reverse the list, keep every node whose value is >= the max of the
        // remaining suffix (original order), rebuilding in original order.
        ListNode *prev = nullptr;
        ListNode *cur = head;
        while (cur) {
            ListNode *nxt = cur->next;
            cur->next = prev;
            prev = cur;
            cur = nxt;
        }

        ListNode *newHead = nullptr;
        int maxSeen = INT_MIN;
        cur = prev;
        while (cur) {
            ListNode *nxt = cur->next;
            if (cur->val >= maxSeen) {
                maxSeen = cur->val;
                cur->next = newHead;
                newHead = cur;
            }
            cur = nxt;
        }
        return newHead;
    }
};
