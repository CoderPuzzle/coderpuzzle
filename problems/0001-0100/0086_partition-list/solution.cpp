class Solution {
  public:
    ListNode *partition(ListNode *head, int x) {
        // Two dummy heads anchor the chains of nodes below x and of all the
        // rest; each tail remembers where that chain's next node will attach.
        ListNode before_head(0);
        ListNode after_head(0);
        ListNode *before_tail = &before_head;
        ListNode *after_tail = &after_head;
        // Append to whichever chain claims the value: the walk order is
        // the append order, so each partition keeps its original order.
        for (ListNode *node = head; node != nullptr; node = node->next) {
            if (node->val < x) {
                before_tail->next = node;
                before_tail = node;
            } else {
                after_tail->next = node;
                after_tail = node;
            }
        }
        // Splice the high chain onto the low one. The high tail's old link
        // still points into the low chain, so cutting it to nullptr is what
        // keeps the spliced list from looping back on itself.
        before_tail->next = after_head.next;
        after_tail->next = nullptr;
        return before_head.next;
    }
};
