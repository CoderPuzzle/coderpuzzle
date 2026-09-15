class Solution {
  public:
    ListNode *plusOne(ListNode *head) {
        // A 0 sentinel absorbs the all-9 carry, so the list growing past
        // its head needs no special case.
        ListNode sentinel(0);
        sentinel.next = head;
        // One walk parks `last` on the final non-9 digit — the only one a
        // +1 carry can ever reach; every 9 behind it rolls over to 0.
        ListNode *last = &sentinel;
        for (ListNode *current = head; current; current = current->next) {
            if (current->val != 9) {
                last = current;
            }
        }
        ++last->val;
        for (ListNode *current = last->next; current; current = current->next) {
            current->val = 0;
        }
        if (last != &sentinel) {
            return head;
        }
        // Every digit was a 9: the answer is one node longer, and its new
        // leading 1 must outlive this frame.
        ListNode *lead = new ListNode(1);
        lead->next = head;
        return lead;
    }
};
