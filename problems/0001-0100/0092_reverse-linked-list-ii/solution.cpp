class Solution {
  public:
    ListNode *reverseBetween(ListNode *head, int left, int right) {
        // The dummy head anchors the node just before the segment, so a
        // segment that starts at the head is no special case.
        ListNode dummy(0);
        dummy.next = head;
        ListNode *before = &dummy;
        for (int i = 1; i < left; i++) {
            before = before->next;
        }
        // Flip exactly right - left + 1 links; `prev` climbs onto each new
        // segment head while `curr` keeps the unconsumed remainder.
        ListNode *prev = before;
        ListNode *curr = before->next;
        for (int i = left; i <= right; i++) {
            ListNode *next = curr->next;
            curr->next = prev;
            prev = curr;
            curr = next;
        }
        // `before.next` is still the segment's old first node, now its last:
        // it takes over the remainder, and the new head takes its place.
        before->next->next = curr;
        before->next = prev;
        return dummy.next;
    }
};
