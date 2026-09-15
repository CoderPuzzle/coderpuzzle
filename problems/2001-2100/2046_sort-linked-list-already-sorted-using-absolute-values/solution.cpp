class Solution {
  public:
    ListNode *sortLinkedList(ListNode *head) {
        if (head == nullptr)
            return nullptr;

        ListNode *current = head;
        while (current->next != nullptr) {
            ListNode *node = current->next;
            if (node->val < 0) {
                current->next = node->next;
                node->next = head;
                head = node;
            } else {
                current = node;
            }
        }
        return head;
    }
};
