class Solution {
  public:
    ListNode *deleteMiddle(ListNode *head) {
        ListNode dummy(0);
        dummy.next = head;
        ListNode *slow = &dummy;
        ListNode *fast = head;
        while (fast != nullptr && fast->next != nullptr) {
            slow = slow->next;
            fast = fast->next->next;
        }
        slow->next = slow->next->next;
        return dummy.next;
    }
};
