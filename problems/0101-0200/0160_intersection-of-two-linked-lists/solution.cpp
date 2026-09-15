class Solution {
  public:
    ListNode *getIntersectionNode(ListNode *headA, ListNode *headB) {
        int length_a = 0;
        int length_b = 0;
        for (ListNode *node = headA; node != nullptr; node = node->next)
            ++length_a;
        for (ListNode *node = headB; node != nullptr; node = node->next)
            ++length_b;
        ListNode *first = headA;
        ListNode *second = headB;
        while (length_a > length_b) {
            first = first->next;
            --length_a;
        }
        while (length_b > length_a) {
            second = second->next;
            --length_b;
        }
        while (first != second) {
            first = first->next;
            second = second->next;
        }
        return first;
    }
};
